import { Navigate, useLoaderData } from "react-router";
import { ImageResultEntry } from "@/components/results";
import type fetchBatch from "@/loaders/fetchBatch";

export function HydrateFallback() {
  return <></>;
}

export default function Results() {
  const { imageData } = useLoaderData() as {
    imageData: Awaited<ReturnType<typeof fetchBatch>>;
  };

  if (!imageData || imageData.length === 0) {
    <Navigate to="/" replace />;
  }

  return (
    <section className="text-gray-100 p-6 max-w-7xl flex grow justify-center items-center">
      <ul className="flex flex-col gap-6">
        {imageData?.map((image) => (
          <ImageResultEntry
            key={image.objectKey}
            objectKey={image.objectKey}
            width={image.width}
            height={image.height}
          />
        ))}
      </ul>
    </section>
  );
}
