export type tConversations = {
    id: string;
    dateTime: Date;
    message: string;
    unseen: number;
    user: string;
    image: string;
}

export type tCUser = {
    user: string;
    image: string;
    dateTime: Date;
}

export type tMessage = {
    dateTime: Date;
    id: string;
    owner: boolean;
    reply: string;
    isSeen: boolean;
}