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
export function GetStoreFill(userName,surveyID,submissionID){
    const url = `/questionnaireFill/${userName}/${surveyID}/${submissionID}`;
    return get(url);
}
//传回填写信息
export function PostFill(surveyID,status,question,duration,submissionID,username,score){
    let data = {};
    data.surveyID = surveyID;
    data.status = status;
    data.question = question;
    data.duration = duration;
    data.submissionID = submissionID;
    data.username = username;
    data.score = score;
    return post('/questionnaireFill',data);
}
//传回问卷信息
export function PostQuestion(surveyID,title,category,isOrder,people,timeLimit,questionList,description,userName,Is_released){
    let data = {};
    data.surveyID = surveyID;
    data.title = title;
    data.category = category;
    data.isOrder = isOrder;
    data.people = people;
    data.timeLimit = timeLimit;
    data.questionList = questionList;
    data.userName=userName;         //创建者用户名
    data.description=description;   //问卷描述
    data.Is_released = Is_released;
    console.log(questionList);
    return post('/questionnaireDesign',data);
}