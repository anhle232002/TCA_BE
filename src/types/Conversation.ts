import { TMessage } from "./Message";

export type TConversation = {
    _id: string;
    members: string[];
    createdAt: Date;
    updatedAt: Date;
    lastMessage?: {
        seen: any[];
        message?: TMessage;
        timestamp?: Date;
    };
};
