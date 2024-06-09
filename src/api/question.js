import { post,get } from "./api"
//拿到问卷信息
export function GetQuestionnaire(surveyID,isDesign){    //isDesign=True,表示顺序展示
    const queryParams = new URLSearchParams({    
        design: isDesign ? 'true' : 'false',   
    });  
    const url = `/questionnaireDesign/${surveyID}/?${queryParams.toString()}`;
    return get(url);
}
//拿到交叉分析数据
export function GetCrossData(QuestionID1,QuestionID2){
    return get("/dataPre/"+QuestionID1+"/"+QuestionID2);
}
//拿到其他数据
export function GetOtherData(surveyID){
    return get("/dataPre/"+surveyID);
}
//拿到暂存的填写记录
export function GetStoreFill(userName,surveyID){
    const url = `/questionnaireFill?userName=${encodeURIComponent(userName)}&surveyID=${encodeURIComponent(surveyID)}`;
    return get(url);
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
export function PostQuestion(surveyID,title,category,isOrder,people,timeLimit,questionList,description,userName){
    let data = {};
    data.surveyID = surveyID;
    data.title = title;
    data.category = category;
    data.isOrder = isOrder;
    data.peoples = people;
    data.timeLimit = timeLimit;
    data.questionList = questionList;
    data.username=username;         //创建者用户名
    data.description=description;   //问卷描述
    return post('/questionnaireDesign',data);
}