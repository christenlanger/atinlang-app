import { createContext } from "react";

import type { MessageQueue } from "./types";

export type NotificationContextValue = {
  messageQueue: MessageQueue;
  queueNotification: ({ message, isError }: { message: string; isError?: boolean }) => void;
};

export const NotificationContext = createContext<NotificationContextValue | null>(null);
