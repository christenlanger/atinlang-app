import env from "@/config/env";

import MarkupEntry from "./MarkupEntry";

export default function ImageResultEntry({
  objectKey,
  width,
  height,
}: {
  objectKey: string;
  width: number;
  height: number;
}) {
  const imageSrc = `${env.IMG_DOMAIN}/${objectKey}`;

  return (
    <li className="grid lg:grid-cols-2 grid-cols-1 gap-2 bg-gray-800 border-2 border-cyan-900 rounded-2xl">
      <div className="max-h-120 h-120 min-w-140 overflow-hidden object-contain flex justify-center items-center bg-gray-900 lg:rounded-l-2xl rounded-t-2xl lg:rounded-tr-none">
        <img src={imageSrc} width={width} height={height} alt={objectKey} />
      </div>
      <div className="flex flex-col gap-2 justify-center p-4">
        <MarkupEntry label="Image URL" value={imageSrc} />
        <MarkupEntry
          label="HTML"
          value={`<img src="${imageSrc}" width="${width}" height="${height}" alt="your alt text" />`}
        />
      </div>
    </li>
  );
}
