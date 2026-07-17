import { useEffect, useRef, useState } from "react";

export function useFileDrag({ onFiles }: { onFiles: (files: File[]) => void }) {
  const counter = useRef(0);
  const [isDragging, setIsDragging] = useState(false);

  useEffect(() => {
    const onDragEnter = (e: DragEvent) => {
      if ([...(e.dataTransfer?.types ?? [])].includes("Files")) {
        counter.current++;
        if (counter.current > 0) {
          setIsDragging(true);
        }
      }
    };

    const onDragOver = (e: DragEvent) => {
      e.preventDefault();
    };

    const onDrop = (e: DragEvent) => {
      e.preventDefault();

      const fileList = e.dataTransfer?.files ?? null;
      if (fileList) {
        onFiles?.(Array.from(fileList));
      }

      counter.current = 0;
      setIsDragging(false);
    };

    const onDragLeave = (e: DragEvent) => {
      e.preventDefault();
      counter.current--;
      if (counter.current <= 0) {
        setIsDragging(false);
      }
    };

    window.addEventListener("dragenter", onDragEnter);
    window.addEventListener("dragover", onDragOver);
    window.addEventListener("dragleave", onDragLeave);
    window.addEventListener("drop", onDrop);

    return () => {
      window.removeEventListener("dragenter", onDragEnter);
      window.removeEventListener("dragover", onDragOver);
      window.removeEventListener("dragleave", onDragLeave);
      window.removeEventListener("drop", onDrop);
    };
  }, [onFiles]);

  return { isDragging };
}
