## **系统数据库设计**

### 实体定义

#### 1. 用户（User）

- **目的**: 存储用户基本信息，包括账户认证信息及创建日期。
- **属性**:
  - `UserID`: 唯一标识符，自动递增，主键。
  - `Username`: 用户名，唯一，长度限制50字符。
  - `PasswordHash`: 加密后的密码，长度255字符。
  - `Email`: 邮箱地址，唯一，长度100字符。
  - `CreateDate`: 账户创建日期。
- **索引**: 在`UserID`和`Username`上建立唯一索引。
- **约束**:
  - `Username`和`Email`需设置唯一性约束。
- **触发器**: 在`CreateDate`上设置默认值为当前时间的触发器。

#### 2. 问卷（Survey）

- **目的**: 记录问卷的基本信息，包括状态、拥有者等。
- **属性**:
  - `SurveyID`: 唯一标识符，自动递增，主键。
  - `OwnerID`: 创建用户的ID，外键关联至`User.UserID`。
  - `Title`: 问卷标题，长度200字符。
  - `Description`: 问卷描述，长度500字符。
  - `Status`: 问卷状态，长度20字符。如'Open', 'Closed', 'Draft','Deleted'，以适应问卷开启/关闭状态。
  - `PublishDate`: 发布日期。
  - ` Category`: 问卷类别：0 是普通问卷，1是投票问卷，2是报名问卷，3是考试问卷
  - ` TotalScore`: 整型，考试问卷的问卷总分，根据每题分数自动计算。
  - `TimeLimit`: 考试问卷限定的填写时间（单位：分钟），非考试问卷可设为NULL
  - `IsOrder` : 是否顺序展示，默认为True，为False时乱序展示
  -  `QuotaLimit` : 最大填写人数（用于控制报名问卷的报名人数）
- **索引**: 在`SurveyID`上建立索引。
- **关系**: 通过`OwnerID`与`User`表关联，实现一对多关系。

#### 3. 问题-填空题（Question-BlankQuestions）

- ##### 3.1. 填空题（BlankQuestions）

  - **目的**: 存储填空题信息及其配置。
  - **属性**:
    - `QuestionID`: 唯一标识符，自动递增，主键。
    - `SurveyID`: 问卷ID，外键关联至问卷表，表明该填空题属于哪个问卷。
    - `QuestionText`: 问题文本，长度限制500字符。
    - `IsRequired`: 是否必填，布尔类型。
    - `QuestionNumber`: 题号。
    - ` Score`: 整型，针对考试问卷设置分数。
    - `CorrectAnswer` : 正确答案。
    - `Category`: 填空题为3。
  - **索引**: 在`QuestionID`上建立唯一索引，`SurveyID`和`QuestionNumber`上建立组合索引以优化问卷内部问题排序查询。
  - **约束**: 确保`SurveyID`有效且存在对应问卷记录，` Score`非负。

- ##### 3.2. 填空题答案（BlankAnswers）

  - - **目的**: 记录用户对填空题的回答。
    - **属性**:
      - `AnswerID`: 唯一标识符，自动递增，主键。
      - `SubmissionID`: 提交记录ID，外键关联至提交记录表。
      - `QuestionID`: 问题ID，外键关联至填空题表。
      - `AnswerContent`: 用户填写的答案内容，长度限制500字符。
    - **索引**: 在`AnswerID`和`(SubmissionID, QuestionID)`上建立索引，以快速定位特定提交的特定问题答案。
    - **约束**：` GetScore`不能超过本题` Score`且非负。

#### 4. 问题-选择题（Question-ChoiceQuestions）

- ##### 4.1. 选择题（ChoiceQuestions）

  - - **目的**: 存储选择题信息及其配置。
    - **属性**:
      - `QuestionID`: 唯一标识符，自动递增，主键。
      - `SurveyID`: 问卷ID，外键关联至问卷表。
      - `QuestionText`: 问题文本，长度限制500字符。
      - `IsRequired`: 是否必填，布尔类型。
      - `QuestionNumber`: 题号。
      - `HasOtherOption`: 是否包含“其他”选项供填写。
      - `MaxSelectableOptions`: 最大可选选项数，非负整型，默认为1（单选），当大于1时为多选。
      - ` Score`: 整型，针对考试问卷设置分数，只有选项全部正确得分。
      - `OptionCnt` : 选项数量，整型。
      - `Category`: 单选为1；多选为2.
    - **索引**: 同填空题表。
    - **约束**: 确保`SurveyID`有效且存在对应问卷记录，`MaxSelectableOptions`非负，` Score`非负。

  ##### 4.2. 选择题选项（ChoiceOptions）

  - - **目的**: 存储选择题的选项。
    - **属性**:
      - `OptionID`: 唯一标识符，自动递增，主键。
      - `QuestionID`: 问题ID，外键关联至选择题表。
      - `OptionText`: 选项文本，长度限制200字符。
      - `IsCorrect`: 对于考试问卷，标记此选项是否正确，布尔类型。
      - `OptionNumber` : 在题目中的选项顺序，整型。
    - **索引**: 在`OptionID`和`QuestionID`上建立索引。

  ##### 4.3. 选择题答案（ChoiceAnswers）

  - - **目的**: 记录用户对选择题的选择。每个记录代表用户在某次提交中对某个多选题的一个选项选择。注意，如果用户选择了多个选项，那么会有多个记录，每个记录都关联同一个`SubmissionID`和`QuestionID`，但`OptionID`不同。
    - **属性**:
      - `AnswerID`: 唯一标识符，自动递增，主键。
      - `SubmissionID`: 提交记录ID，外键关联至提交记录表。
      - `QuestionID`: 问题ID，外键关联至选择题表。
      - `OptionID`: 选项ID，外键关联至选择题选项表。
    - **索引**: 在`AnswerID`上建立唯一索引，`(SubmissionID, QuestionID, OptionID)`上建立组合索引以支持查询特定提交的多选题答案。

#### 5. 问题-评分题（Question-RatingQuestions）

- ##### 5.1. 评分题（RatingQuestions）

  - **目的**: 存储评分题信息及其配置，适用于满意度调查或等级评价。
  - **属性**:
    - `QuestionID`: 唯一标识符，自动递增，主键。
    - `SurveyID`: 问卷ID，外键关联至问卷表，表明该评分题属于哪个问卷。
    - `QuestionText`: 问题文本，长度限制500字符。
    - `IsRequired`: 是否必填，布尔类型。
    - `QuestionNumber`: 题号。
    - `MinRating`: 最低评分，非负整型，默认为1。
    - `MaxRating`: 最高评分，非负整型，默认为5，应大于`MinRating`。
    - `MinText`：对最小分数的文字描述，字符串。
    - `MaxText`：对最大分数的文字描述，字符串。
    - `Category`: 评分题为4。
  - **索引**: 在`QuestionID`上建立唯一索引，`SurveyID`和`QuestionNumber`上建立组合索引。
  - **约束**: 确保`SurveyID`有效且存在对应问卷记录，`MaxRating`大于`MinRating`，两者均为非负。

- ##### 5.2. 评分题答案（RatingAnswers）

  - **目的**: 记录用户对评分题的评分。
  - **属性**:
    - `AnswerID`: 唯一标识符，自动递增，主键。
    - `SubmissionID`: 提交记录ID，外键关联至提交记录表。
    - `QuestionID`: 问题ID，外键关联至评分题表。
    - `RatingValue`: 用户给出的评分值，介于`MinRating`和`MaxRating`之间。
  - **索引**: 在`AnswerID`和`(SubmissionID, QuestionID)`上建立索引。
  - **约束**: `RatingValue`必须在`MinRating`和`MaxRating`的范围内，包括两端值。

#### 6.提交记录（Submission）

- **目的**: 记录每次问卷提交的具体情况，包括提交时间、填写者信息及状态，以便查询和分析提交详情。
- **关键属性**:
  - `SubmissionID`: 唯一标识符，自动递增，主键。
  - `SurveyID`: 关联问卷ID，外键关联至`Survey.SurveyID`。
  - `RespondentID`: 填写者ID，外键关联至`User.UserID`。
  - `SubmissionTime`: 提交时间，时间戳。
  - `Status`: 状态，20字符，未提交（暂存）、已提交、已批改、已关闭/删除(问卷被发布者删除)。
  - `Duration`: 填写耗时（仅针对完成的问卷，单位秒，考试问卷可能需要此字段）。
- **索引**:
  - 在`SurveyID`, `RespondentID`, 和`SubmissionTime`上分别建立索引，加速特定查询。
  - 考虑到频繁的查询模式，可以创建复合索引`(SurveyID, SubmissionTime)`以优化按问卷和时间的查询。
- **约束**：
  - 确保`Duration`非负，对于非考试问卷或未完成的提交，该值可设为NULL。
- **触发器**：每道题批改完毕后计算得分并将该记录状态改为已修改

#### 7. 问卷统计（SurveyStatistic）

- **目的**: 记录问卷的统计数据，如回收量、平均分等。
- **关键属性**:
  - `StatisticID`: 唯一标识符，自动递增，主键。
  - `SurveyID`: 关联问卷ID，外键关联至`Survey.SurveyID`。
  - `TotalResponses`: 回收量。
  - `AverageScore`: 平均得分（针对考试问卷）。
  - `LastResponseDate`: 最近回答日期。
- **索引**: 在`SurveyID`上建立索引。

#### 8. 问卷模板（Template）

- **目的**: 存储不同类型的问卷模板，便于用户快速创建问卷。
- **属性**:
  - `TemplateID`: 唯一标识符，自动递增，主键。
  - `TemplateName`: 模板名称，长度200字符。
  - `TemplateType`: 模板类型（如普通问卷、投票问卷、报名问卷、考试问卷），长度50字符。
  - `DefaultQuestions`: 默认包含的问题JSON字符串。
  - `Description`: 模板描述，长度500字符。
- **索引**: 在`TemplateID`和`TemplateName`上建立索引。

#### 9. *问卷奖励（RewardOffering）

- **目的**: 记录用户为问卷提供的奖励信息，便于吸引填写者。
- **关键属性**:
  - `RewardID`: 唯一标识符，自动递增，主键。
  - `SurveyID`: 关联问卷ID，外键关联至`Survey.SurveyID`。
  - `RewardDescription`: 奖励描述。
  - `RewardPoints`: 奖励积分或其他形式的奖励数量。
  - `AvailableQuota`: 奖励剩余名额。
- **索引**: 在`SurveyID`上建立索引。

#### 10. *用户奖励记录（UserRewardRecord）

- **目的**: 记录填写者因完成问卷而获得的奖励。
- **关键属性**:
  - `RecordID`: 唯一标识符，自动递增，主键。
  - `RespondentID`: 回答者ID，外键关联至`User.UserID`。
  - `SurveyID`: 完成的问卷ID，外键关联至`Survey.SurveyID`。
  - `RewardPoints`: 获得的奖励（例如积分）。
  - `RedemptionDate`: 奖励领取日期。
- **索引**: 在`RespondentID`和`SurveyID`上建立索引。

###  表间关系说明

1. **用户(User)与问卷(Survey)**: 
   * 通过`OwnerID`字段，`Survey`表与`User`表建立了关联，表明每个问卷都有一个创建它的用户，体现了用户与问卷的一对多关系。
2. **问卷(Survey)与问题(BlankQuestions, ChoiceQuestions, RatingQuestions)**: 
   * 每个问题表（填空题、选择题、评分题）都通过`SurveyID`字段与`Survey`表关联，表示一个问题属于一个问卷，问卷可以包含多种类型的问题，形成问卷与问题的多对多关系（通过问题类型细化为三个一对多关系）。
3. **问题(BlankQuestions, ChoiceQuestions, RatingQuestions)与提交记录(Submission)**: 
   * 问题表通过`QuestionID`与`BlankAnswers`, `ChoiceAnswers`, `RatingAnswers`间接关联至`Submission`表（因为提交记录中的具体答案表各自关联到问题表），体现了一个提交记录中包含了对问卷内多个问题的回答，即问题与提交记录的多对多关系。
4. **提交记录(Submission)与用户(User)**: 
   * 通过`RespondentID`字段，`Submission`表与`User`表关联，指明了每个提交记录是由哪个用户填写的，这是用户与提交记录的一对多关系。
5. **选择题(ChoiceQuestions)与选择题选项(ChoiceOptions)**: 
   * 通过`QuestionID`字段，`ChoiceOptions`表与`ChoiceQuestions`表关联，说明每个选项属于某个选择题，形成了问题选项与问题的一对多关系。
6. **提交记录(Submission)与问题答案(BlankAnswers, ChoiceAnswers, RatingAnswers)**: 
   * 提交记录通过`SubmissionID`与具体问题答案表关联，表示每个提交记录中包含对多个问题的回答，体现了提交记录与问题答案的多对多关系。
7. **问卷(Survey)与问卷统计(SurveyStatistic)**: 
   * 通过`SurveyID`字段，`SurveyStatistic`表与`Survey`表关联，用于跟踪每个问卷的统计数据，呈现问卷与其统计信息的一对一或一对多关系（取决于是否按时间分割统计）。
8. **问卷模板(Template)与问卷(Survey)**: 
   * 实际应用中，如果用户基于模板创建问卷，则`Survey`表与`Template`表会通过逻辑关系关联，反映模板使用情况，为一对多关系。
9. ***问卷奖励(RewardOffering)与问卷(Survey)**: 
   * 通过`SurveyID`字段，`RewardOffering`表与`Survey`表关联，展示了问卷提供的奖励信息，为一对一或一对多关系（一个问卷可以有多种奖励方案）。
10. ***用户奖励记录(UserRewardRecord)与用户(User), 问卷(Survey)**: 
    * 通过`RespondentID`和`SurveyID`字段，`UserRewardRecord`表分别与`User`和`Survey`表关联，记录了用户因完成问卷而获得的奖励，体现了用户、问卷与奖励记录的关联，为多对多关系（通过奖励领取情况）。
