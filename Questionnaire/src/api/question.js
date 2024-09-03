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
    const url = `/dataPre/${QuestionID1}/${QuestionID2}`;
    return get(url);
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
export function PostFill(surveyID,status,question,duration,submissionId,username,score){
    // 创建一个 Date 对象，表示当前日期和时间
    const now = new Date();

    // 获取年份
    const year = now.getFullYear();

    // 获取月份（注意月份从 0 开始，所以需要加 1）
    const month = now.getMonth() + 1;

    // 获取日期
    const day = now.getDate();

    // 格式化为 yyyy-mm-dd 格式
    const formattedDate = `${year}-${String(month).padStart(2, '0')}-${String(day).padStart(2, '0')}`;

    let data = {};
    data.surveyID = surveyID;
    data.status = status;
    data.question = question;
    data.duration = duration;
    data.submissionID = submissionId;
    data.username = username;
    data.score = score;
    data.date = formattedDate;
    return post('/questionnaireFill',data);
}
//传回问卷信息
export function PostQuestion(surveyID,title,category,isOrder,timeLimit,questionList,description,userName,Is_released){
    // 创建一个 Date 对象，表示当前日期和时间
    const now = new Date();

    // 获取年份
    const year = now.getFullYear();

    // 获取月份（注意月份从 0 开始，所以需要加 1）
    const month = now.getMonth() + 1;

    // 获取日期
    const day = now.getDate();

    // 格式化为 yyyy-mm-dd 格式
    const formattedDate = `${year}-${String(month).padStart(2, '0')}-${String(day).padStart(2, '0')}`;

    let data = {};
    data.surveyID = surveyID;
    data.title = title;
    data.category = category;
    data.isOrder = isOrder;
    data.timeLimit = timeLimit;
    data.questionList = questionList;
    data.userName=userName;         //创建者用户名
    data.description=description;   //问卷描述
    data.Is_released = Is_released;
    data.date = formattedDate;
    return post('/questionnaireDesign',data);
}
