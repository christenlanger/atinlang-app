import { useEffect, useState } from "react";

import type { MessageState } from "../types";

type Props = {
  id: number;
  message: string;
  isError?: boolean | undefined;
  timeoutMs?: number;
  onExpire?: (id: number) => void;
};

export default function Notification({ id, message, isError, timeoutMs = 3000, onExpire }: Props) {
  const [status, setStatus] = useState<MessageState>("enter");

  const messageClass = isError ? "bg-orange-700" : "bg-blue-600";
  const stateClass = `notif-state-${status}`;

  useEffect(() => {
    const timeout = setTimeout(() => {
      setStatus("exit");
    }, timeoutMs);

    return () => {
      clearTimeout(timeout);
    };
  }, [onExpire, timeoutMs]);

  return (
    <div
      className={`text-gray-50 text-center text-md px-4 py-2 rounded min-w-2xs max-w-3xl ${messageClass} ${stateClass}`}
      onAnimationEnd={() => {
        if (status === "exit") {
          onExpire?.(id);
        }
      }}
    >
      {message}
    </div>
  );
}
