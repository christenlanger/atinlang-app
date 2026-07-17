import { useNotification } from "@/context/notifications";
import { useState } from "react";

export default function MarkupEntry({ label, value }: { label: string; value: string }) {
  const [disableCopy, setDisableCopy] = useState(false);
  const { queueNotification } = useNotification();

  const handleClick = async (e: React.MouseEvent<HTMLInputElement>) => {
    try {
      if (!disableCopy) {
        await navigator.clipboard.writeText(e.currentTarget.value);
        queueNotification({ message: "Copied to clipboard!" });
        setDisableCopy(true);

        setTimeout(() => setDisableCopy(false), 2000);
      }
    } catch (error) {
      queueNotification({ message: "Error copying to clipboard.", isError: true });
      console.error("Failed to copy to clipboard:", error);
    }
  };

  return (
    <div className="flex flex-col">
      <label htmlFor="source-url" className="px-2 py-1 mb-1">
        {label}
      </label>
      <input
        type="text"
        id="source-url"
        value={value}
        readOnly
        className="border border-gray-600 bg-gray-900 px-4 py-2 cursor-pointer caret-transparent hover:border-gray-500"
        onClick={handleClick}
      />
    </div>
  );
}
