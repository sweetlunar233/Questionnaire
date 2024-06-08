import { post,get } from "./api"

export function ConserveOrReleaseQuestionnaire(
    questionnaireId, // 问卷id
    type, //问卷类型（普通、投票、报名、考试）
    questionList, //所有问题
    people, //报名人数（报名问卷）
    isDisorder, //是否乱序（考试问卷）
    title, //问卷标题
    flag //0:保存  1：发布
){
    let data = {};
    data.questionnaireId = questionnaireId;
    data.type = type;
    data.questionList = questionList;
    data.people = people;
    data.isDisorder = isDisorder;
    data.title = title;
    data.flag = flag;
    return post("/questionnaireDesign", data);
}