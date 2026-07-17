export type MessageEntry = {
  id: number;
  message: string;
  isError?: boolean;
};

export type MessageQueue = MessageEntry[];

export type MessageState = "enter" | "exit";
