import { useCallback, useRef, useState } from "react";
import { NotificationContext, type NotificationContextValue } from "./NotificationContext";
import Notification from "./components/Notification";

import type { MessageQueue } from "./types";

export default function ErrorProvider({ children }: { children: React.ReactNode }) {
  const [messageQueue, setMessageQueue] = useState<MessageQueue>([]);
  const nextId = useRef(0);

  const queueNotification = useCallback(
    ({ message, isError = false }: { message: string; isError?: boolean }) => {
      setMessageQueue((prev) => {
        const newVal = [...prev];
        const messageProps = { id: nextId.current++, message, isError: isError ?? false };
        newVal.push(messageProps);
        if (messageProps.isError) {
          console.error(messageProps);
        }

        return newVal;
      });
    },
    [],
  );

  const removeToast = useCallback((id: number) => {
    setMessageQueue((prev) => {
      const newVal = [...prev].filter((toast) => toast.id !== id);
      return newVal;
    });
  }, []);

  const context: NotificationContextValue = { messageQueue, queueNotification };

  return (
    <NotificationContext.Provider value={context}>
      <ul className="fixed top-4 left-1/2 -translate-x-1/2 flex flex-col-reverse gap-2">
        {messageQueue.map(({ id, message, isError }) => (
          <li key={`notif-${id}`}>
            <Notification id={id} message={message} isError={isError} onExpire={removeToast} />
          </li>
        ))}
      </ul>
      {children}
    </NotificationContext.Provider>
  );
}
