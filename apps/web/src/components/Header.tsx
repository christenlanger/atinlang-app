import { Link } from "react-router";
import { FileUpload } from "@/components";

export default function Header() {
  return (
    <header className="w-full px-8 py-4 flex justify-between">
      <h1 className="text-white text-4xl font-bold">
        <Link to="/">atinlang</Link>
      </h1>
      <FileUpload label="Upload Image" />
    </header>
  );
}
