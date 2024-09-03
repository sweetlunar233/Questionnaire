from django.urls import path
from user import views
from .views import GetStoreFillView
from .views import GetQuestionnaireView 

urlpatterns = [
    path('login', views.send_registration_email, name="send-registration-email-url"),
    path('userManage/personal/<str:username>',views.get_user_info,name='get-user-info-url'),
    path('personal/message',views.modify_user_info,name='modify-user-info-url'),
    path('personal/shop',views.modify_photo_in_shop,name='modify-photo-in-shop-url'),

    #问卷管理界面：返回内容
    path('userManage/unreleased/<str:username>',views.get_drafted_qs,name='get-drafted-qs-url'),
    path('userManage/released/<str:username>',views.get_released_qs,name='get-released-qs-url'),
    path('userManage/filled/<str:username>',views.get_filled_qs,name='get-filled-qs-url'),
    path('userManage/square',views.get_all_released_qs,name='get-all-released-qs-url'),
    path('userManage/square/<str:username>/<int:questionnaireId>/<int:type>',views.check_qs,name='check-qs-url'),
    #path('userManage/filled/<int:surveyID>',views.check_qs_open_stautus,name='check-qs-open-stautus-url'),

    #问卷管理界面：删除
    path('userManage/unreleased',views.delete_unreleased_qs,name='delete-unreleased-qs-url'),
    path('userManage/released',views.update_or_delete_released_qs,name='delete-released-qs-url'),
    path('userManage/filled',views.delete_filled_qs,name='delete-filled-qs'),

    #问卷编辑界面：
    path('questionnaireDesign',views.save_qs_design,name='save-qs-design-url'),
    path('questionnaireDesign/<int:survey_id>/', GetQuestionnaireView.as_view(), name='get_questionnaire'),

    #问卷填写界面：
    path('questionnaireFill/<str:userName>/<str:surveyID>/<str:submissionID>', GetStoreFillView.as_view(), name='get-store-fill-url'),
    path('questionnaireFill',views.get_submission,name='post-submission-url'),
    #path('questionnaireFill/<str:userName>/<int:surveyID>/<int:submissionID>', GetStoreFillView.as_view(), name='get-store-fill-url'),

    #问卷展示界面：
    path('normalAnswer/<str:username>/<str:questionnaireId>/<str:submissionId>',views.display_answer_normal,name='display-answer-normal'),
    path('testAnswer/<str:username>/<str:questionnaireId>/<str:submissionId>',views.display_answer_test,name='display-answer-test'),

    #数据分析:
    path('dataPre/<int:QuestionID1>/<int:QuestionID2>',views.cross_analysis,name='cross-analysis-url'),
    path('dataPre/<int:surveyID>',views.survey_statistics,name='survey-statistics-url'),
    path('dataPre/download/<int:surveyID>',views.download_submissions,name='download_submissions-url')
]