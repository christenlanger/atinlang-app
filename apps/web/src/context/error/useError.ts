import { useContext } from "react";
import { ErrorContext } from "./ErrorContext";

export function useError() {
  const context = useContext(ErrorContext);

  if (!context) throw new Error("Unable to load ErrorContext without ErrorProvider.");

  return context;
}
