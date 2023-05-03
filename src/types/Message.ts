import { Types } from "mongoose";

export type TMessage = {
    _id: string;
    date: Date;
    body: string;
    from?: string;
    to?: string;
    conversationId?: string;
};
