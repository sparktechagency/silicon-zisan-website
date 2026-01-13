import { Participant } from "./chat";

export interface Message {
  _id: string;
  chat: string;
  sender: Participant;
  text: string;
  image: string;
  seenBy: string[];
  createdAt: string;
  updatedAt: string;
  __v: number;
  isMyMessage: boolean;
  isSeen: boolean;
}

export interface MessageResponse {
  success: boolean;
  message: string;
  pagination: {
    total: number;
    limit: number;
    page: number;
    totalPage: number;
  };
  data: Message[];
}
