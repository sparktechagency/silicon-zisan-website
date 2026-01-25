export interface Participant {
  _id: string;
  name: string;
  image: string;
  isDeleted: boolean;
}

export interface LastMessage {
  _id: string;
  sender: string;
  text: string;
  image: string;
  createdAt: string;
}

export interface Chat {
  _id: string;
  participants: Participant[];
  updatedAt: string;
  unreadCount: number;
  lastMessage?: LastMessage;
  adminId: string;
}
