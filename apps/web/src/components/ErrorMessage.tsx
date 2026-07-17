export default function ErrorMessage({ error }: { error: string }) {
  return (
    <div className="text-gray-50 text-center text-md bg-orange-700 px-4 py-2 rounded fixed top-4 left-1/2 -translate-x-1/2 min-w-2xs max-w-3xl animate-toast-top">
      {error}
    </div>
  );
}
