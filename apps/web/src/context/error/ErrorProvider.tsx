import { useState } from "react";
import { ErrorContext, type ErrorContextValue } from "./ErrorContext";

export default function ErrorProvider({ children }: { children: React.ReactNode }) {
  const [error, setError] = useState<string | null>(null);

  const context: ErrorContextValue = { error, setError };

  return <ErrorContext.Provider value={context}>{children}</ErrorContext.Provider>;
}
