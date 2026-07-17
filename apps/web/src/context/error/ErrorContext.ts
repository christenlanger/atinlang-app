import { createContext } from "react";

export type ErrorContextValue = {
  error: string | null;
  setError: React.Dispatch<React.SetStateAction<string | null>>;
};

export const ErrorContext = createContext<ErrorContextValue | null>(null);
