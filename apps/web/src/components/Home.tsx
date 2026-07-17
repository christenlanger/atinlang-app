import FileUpload from "./FileUpload";

export default function Home() {
  return (
    <section className="mt-0 mx-auto w-full max-w-200 h-full flex flex-col grow justify-center items-center text-gray-100 relative">
      <h1 className="text-4xl/12 font-bold font-roboto">atinlang</h1>
      <p className="text-lg">Drag your image here to upload.</p>
      <p className="text-lg">or</p>
      <FileUpload />
      <p className="text-sm">accepted formats: jpg, png, gif, webp</p>
    </section>
  );
}
