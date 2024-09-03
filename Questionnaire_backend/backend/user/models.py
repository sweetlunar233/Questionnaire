from django.db import models
import json
from django.db.models.signals import post_save, pre_save, m2m_changed
from django.dispatch import receiver
from django.utils.timezone import now
from django.db.models import Sum, Q

# Create your models here.
class User(models.Model):
    UserID = models.AutoField(primary_key=True)
    username = models.CharField(unique=True, max_length=50)
    password = models.CharField(max_length=255)
    email = models.EmailField(unique=True, max_length=100)
    CreateDate = models.DateTimeField(auto_now_add=True)
    isActive=models.BooleanField(default=False)
    zhibi=models.IntegerField(default=0)
    own_photos=models.TextField(default=json.dumps([0] * 18))

    def set_array_element(self, index, value):
        # 确保索引在有效范围内  
        if 0 <= index < 18:  
            photos_data = json.loads(self.own_photos)  
            photos_data[index] = value  
            self.own_photos = json.dumps(photos_data)  
            self.save()  
    
    def get_array_element(self, index):  
        # 确保索引在有效范围内  
        if 0 <= index < 18:  
            photos_data = json.loads(self.own_photos)  
            return photos_data[index]  
        return -1
    
    #获取当前正在使用的头像编号(默认为0，1是已购买，2是正在使用)
    def get_used_element(self):
        photos_data = json.loads(self.own_photos)
        for i in range(0,18):
            if(photos_data[i]==2): return i
        return -1

class Survey(models.Model):
    SurveyID = models.AutoField(primary_key=True)
    Owner = models.ForeignKey(User, on_delete=models.CASCADE, related_name='surveys')
    Title = models.CharField(max_length=200)
    Description = models.TextField(max_length=500, blank=True)
    Is_released = models.BooleanField(blank=True)
    Is_open = models.BooleanField(default=True)
    Is_deleted=models.BooleanField(default=False)
    #新加的（把日期变为字符串）
    PublishDate = models.DateTimeField(null=True)
    #0 是普通问卷，1是投票问卷，2是报名问卷，3是考试问卷
    Category = models.IntegerField(default=0)   
    TotalScore = models.IntegerField(null=True, blank=True)
    TimeLimit = models.IntegerField(null=True, blank=True)
    IsOrder = models.BooleanField(default=True)
    #QuotaLimit = models.IntegerField(null=True, default=False)

class BaseQuestion(models.Model):
    QuestionID = models.AutoField(primary_key=True)
    Survey = models.ForeignKey(Survey, on_delete=models.CASCADE, related_name='%(class)s_questions')
    Text = models.TextField(max_length=500)
    IsRequired = models.BooleanField(default=True)
    QuestionNumber = models.IntegerField(default=0)
    Score = models.IntegerField(null=True, blank=True,default=0)
    Category=models.IntegerField()    #题目类型：单选为1；多选为2；填空题为3；评分题为4

    class Meta:
        abstract = True

class BlankQuestion(BaseQuestion):
    CorrectAnswer=models.TextField(max_length=100,null=True)

class ChoiceQuestion(BaseQuestion):
    MaxSelectable = models.IntegerField(default=1,null=True)    #多选题的最多可选项
    OptionCnt=models.IntegerField(default=0)

class ChoiceOption(models.Model):
    OptionID = models.AutoField(primary_key=True)
    Question = models.ForeignKey(ChoiceQuestion, on_delete=models.CASCADE, related_name='choice_options')
    Text = models.CharField(max_length=200)
    IsCorrect = models.BooleanField(default=False,null=True)
    OptionNumber=models.IntegerField(null=False,default=0)

    #报名问卷：每个选项的剩余人数(-1代表无人数限制)
    MaxSelectablePeople=models.IntegerField(null=False,default=-1)
    
class OtherOption(models.Model):
    IsRequired = models.BooleanField(default=True)
    Text = models.TextField(max_length=500)

class RatingQuestion(BaseQuestion):
    MinRating = models.IntegerField(default=1,null=True)
    MinText = models.TextField(max_length=500,null=True)
    MaxRating = models.IntegerField(default=5,null=True)
    MaxText = models.TextField(max_length=500,null=True)
    

class Answer(models.Model):
    AnswerID = models.AutoField(primary_key=True)
    Submission = models.ForeignKey('Submission', on_delete=models.CASCADE, related_name='%(class)s_answers')

    class Meta:
        abstract = True

class BlankAnswer(Answer):
    Question = models.ForeignKey(BlankQuestion, on_delete=models.CASCADE)
    Content = models.TextField(max_length=500)

class ChoiceAnswer(Answer):
    Question = models.ForeignKey(ChoiceQuestion, on_delete=models.CASCADE)
    ChoiceOptions = models.ForeignKey(ChoiceOption, on_delete=models.CASCADE)

class RatingAnswer(Answer):
    Question = models.ForeignKey(RatingQuestion, on_delete=models.CASCADE)
    Rate = models.IntegerField(null=True, blank=True)

class Submission(models.Model):
    SubmissionID = models.AutoField(primary_key=True)
    Survey = models.ForeignKey(Survey, on_delete=models.CASCADE, related_name='submissions')
    Respondent = models.ForeignKey(User, on_delete=models.CASCADE, related_name='submissions')
    SubmissionTime = models.DateTimeField(auto_now_add=True)
    Status = models.CharField(max_length=20, choices=[('Unsubmitted', 'Unsubmitted'), ('Submitted', 'Submitted'), ('Graded', 'Graded'),('Deleted','Deleted')])
    Score = models.IntegerField(null=True, blank=True)
    #Duration = models.IntegerField(null=True, blank=True)
    Interval=models.IntegerField(null=True, blank=True)

class SurveyStatistic(models.Model):
    StatisticID = models.AutoField(primary_key=True)    
    Survey = models.OneToOneField(Survey, on_delete=models.CASCADE, related_name='statistics')
    TotalResponses = models.IntegerField(default=0)     #已提交的数量
    AverageScore = models.FloatField(null=True, blank=True)     #考试问卷：平均分
    LastResponseDate = models.DateTimeField(null=True, blank=True)  #最后一个提交的时间

class Template(models.Model):
    TemplateID = models.AutoField(primary_key=True)
    Name = models.CharField(max_length=200)
    Type = models.CharField(max_length=50)
    DefaultQuestionsJSON = models.JSONField()
    Description = models.TextField(max_length=500, blank=True)

class RewardOffering(models.Model):
    RewardID = models.AutoField(primary_key=True)
    Survey = models.ForeignKey(Survey, on_delete=models.CASCADE, related_name='rewards')
    Description = models.TextField()
    Zhibi = models.IntegerField()
    AvailableQuota = models.IntegerField()

class UserRewardRecord(models.Model):
    RecordID = models.AutoField(primary_key=True)
    Respondent = models.ForeignKey(User, on_delete=models.CASCADE, related_name='reward_records')
    Survey = models.ForeignKey(Survey, on_delete=models.CASCADE, related_name='user_rewards')
    Zhibi = models.IntegerField()
    RedemptionDate = models.DateField()


# #Submission状态变化时更新SurveyStatistice和自动打分
# @receiver(pre_save, sender=Submission)
# def update_survey_statistic_on_submission_status_change(sender, instance, **kwargs):
#     try:
#         old_instance = Submission.objects.get(pk=instance.SubmissionID)
#     except Submission.DoesNotExist:
#         return  # New record, skip

#     if old_instance.Status == 'Unsubmitted' and instance.Status == 'Submitted':
#         survey_statistic = instance.Survey.statistics
#         survey_statistic.TotalResponses += 1
#         survey_statistic.LastResponseDate = now()
#         survey_statistic.save(update_fields=['TotalResponses', 'LastResponseDate'])
        
#         if old_instance.Survey.Category == 3: #考试问卷自动打分并创建平均分
#             total_score = 0
#             for blank_answer in instance.blank_answers.all():
#                 if blank_answer.Content.strip() == blank_answer.Question.CorrectAnswer.strip(): #可以移除头尾多余空格
#                     total_score += blank_answer.Question.Score
#             for choice_answer in instance.choice_answers.all():
#                 correct_options = choice_answer.Question.choice_options.filter(IsCorrect=True)
#                 selected_options = ChoiceAnswer.objects.filter(Question=choice_answer.Question, Submission=instance)
#                 if set(selected_options.values_list('ChoiceOptions', flat=True)) == set(correct_options.values_list('OptionID', flat=True)):
#                     total_score += choice_answer.Question.Score
            
#             instance.Score = total_score
#             instance.Status = 'Graded'
#             instance.save(update_fields=['Score', 'Status'])
            
#             new_average_score = (survey_statistic.AverageScore * (survey_statistic.TotalResponses - 1) + instance.Score) / survey_statistic.TotalResponses
#             survey_statistic.AverageScore = new_average_score
#             survey_statistic.save(update_fields=['AverageScore'])

# #UserRewardRecord创建时同步Zhibi字段
# @receiver(post_save, sender=UserRewardRecord)
# def synchronize_zhibi_on_user_reward_record_creation(sender, instance, created, **kwargs):
#     if created:
#         rewardOffering=instance.RewardOffering
#         rewardOffering.AvailableQuota=rewardOffering.AvailableQuota - 1
#         rewardOffering.save(update_fields=['AvailableQuota'])
#         instance.Zhibi = rewardOffering.Zhibi
#         instance.RedemptionDate = now()
#         instance.save(update_fields=['Zhibi', 'RedemptionDate'])
#         instance.Respondent.Zhibi += instance.Zhibi
#         instance.Respondent.save(update_fields=['Zhibi'])

# #Survey状态变化时更新PublishDate和计算总分
# @receiver(pre_save, sender=Survey)
# def handle_survey_release_and_calculate_totalscore(sender, instance, **kwargs):
#     try:
#         old_instance = Survey.objects.get(pk=instance.SurveyID)
#     except Survey.DoesNotExist:
#         return  # New record, skip

#     if old_instance.Is_released == False and instance.Is_released == True:
#         # Update PublishDate to current time
#         instance.PublishDate = now()
        
#         # Calculate TotalScore by summing up scores of related BlankQuestion and ChoiceQuestion
#         total_score = (
#             instance.blankquestion_questions.filter(Score__isnull=False).aggregate(score_sum=Sum('Score'))['score_sum'] or 0
#             + instance.choicequestion_questions.filter(Score__isnull=False).aggregate(score_sum=Sum('Score'))['score_sum'] or 0
#         )
#         instance.TotalScore = total_score
        
#         # Save with updated PublishDate and TotalScore
#         instance.save(update_fields=['PublishDate', 'TotalScore'])

# #创建Survey时自动创建对应Statistic表
# @receiver(post_save, sender=Survey)
# def create_survey_statistic(sender, instance, created, **kwargs):
#     if created:  # Only create SurveyStatistic when a new Survey is created
#         SurveyStatistic.objects.create(Survey=instance)
