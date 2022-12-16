import { TopicGrade } from "@prisma/client";
import { dbConn } from "../../utils/db";
import { TopicInput } from "./topic.schema";

export async function createTopic(data: TopicInput) {
    const topic = await dbConn.topic.create({ data });

    return topic;
}

export async function updateTopic(data: TopicInput, topicId: number) {
    const updatedTopic = await dbConn.topic.update({
        where: { id: topicId },
        data,
    });

    return updatedTopic;
}

export async function getTopics() {
    const topics = await dbConn.topic.findMany();

    return topics;
}

export async function findTopic(grade: TopicGrade, keyword: string) {
    const topics = await dbConn.topic.findMany({
        where: { grade: grade, name: { search: keyword } },
    });

    return topics;
}
