import { post,get } from "./api"
//拿到问卷信息
export function GetQuestionnaire(surveyID,url,isDesign){
    let data = {};
    data.surveyID = surveyID;
    data.url = url;
    data.isDesign = isDesign;
    return get(url,data);
}
//拿到交叉分析数据
export function GetCrossData(QuestionID1,QuestionID2){
    let data = {};
    data.QuestionID1 = QuestionID1;
    data.QuestionID2 = QuestionID2;
    return get("/dataPre",data);
}
//拿到其他数据
export function GetOtherData(surveyID){
    let data = {};
    data.surveyID = surveyID;
    return get("/dataPre",data);
}
//拿到暂存信息
export function GetStoreFill(userName,surveyID){
    let data = {};
    data.userName = userName;
    data.surveyID = surveyID;
    return get('/questionnaireFill',data)
}
//传回填写信息
export function PostFill(surveyID,status,question){
    let data = {};
    data.surveyID = surveyID;
    data.status = status;
    data.question = question;
    return post('/questionnaireFill',data);
}
//传回问卷信息
export function PostQuestion(surveyID,title,category,isOrder,people,timeLimit,questionList){
    let data = {};
    data.surveyID = surveyID;
    data.title = title;
    data.category = category;
    data.isOrder = isOrder;
    data.peoples = people;
    data.timeLimit = timeLimit;
    data.questionList = questionList;
    return post('/questionnaireDesign',data);
}