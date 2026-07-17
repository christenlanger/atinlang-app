import { useRef } from "react";
import { useNavigate } from "react-router";

import { useUpload } from "@/context/upload/useUpload";
import { useNotification } from "@/context/notifications";
import { uploadStatusMessage } from "@/utils/uploadStatus";

export default function FileUpload({ label }: { label?: string }) {
  const navigate = useNavigate();
  const { upload } = useUpload();
  const { queueNotification } = useNotification();
  const fileSelect = useRef<HTMLInputElement>(null);

  const buttonClickHandler = () => {
    fileSelect.current?.click();
  };

  const fileSelectHandler = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;

    const files = Array.from(e.target.files);

    try {
      const res = await upload(files);

      queueNotification(uploadStatusMessage(res));

      if (res?.status === "success") {
        navigate(`/results/${res.batchId}`);
      }
    } catch (error) {
      queueNotification({
        message: error instanceof Error ? error.message : "An unexpected error occurred.",
        isError: true,
      });
    }
  };

  return (
    <>
      <button
        type="button"
        className="text-white bg-blue-800 hover:bg-blue-700 px-5 py-2 my-3 rounded-2xl cursor-pointer"
        onClick={buttonClickHandler}
      >
        {label || "Select File"}
      </button>
      <input
        ref={fileSelect}
        type="file"
        id="images"
        name="images"
        className="hidden"
        accept="image/jpeg, image/png, image/gif, image/webp"
        multiple
        onChange={fileSelectHandler}
      />
    </>
  );
}
