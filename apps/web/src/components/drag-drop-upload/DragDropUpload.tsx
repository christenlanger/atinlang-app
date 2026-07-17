import { useNavigate } from "react-router";

import { LoaderCircle } from "lucide-react";
import { useNotification } from "@/context/notifications";
import { useUpload } from "@/context/upload";
import { useFileDrag } from "@/hooks/useFileDrag";
import { uploadStatusMessage } from "@/utils/uploadStatus";

import UploadOverlay from "./UploadOverlay";

export default function DragDropUpload() {
  const navigate = useNavigate();
  const { loading, upload } = useUpload();
  const { queueNotification } = useNotification();

  const handleUpload = async (files: File[]) => {
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

  const { isDragging } = useFileDrag({ onFiles: handleUpload });
  return (
    <>
      {isDragging && <UploadOverlay />}
      {loading && (
        <div className="fixed w-full h-full top-0 left-0 flex justify-center items-center bg-gray-600/80 text-white">
          <LoaderCircle className="size-42 animate-spin" />
        </div>
      )}
    </>
  );
}
