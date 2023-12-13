import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type PropsWithChildren,
} from "react";

type LayoutContextType = {
  readonly defineMessage: (message: string) => void;
  readonly message: string;
  readonly reset: () => void
};

const LayoutContext = createContext<
  LayoutContextType | undefined
>(undefined);

export function useLayoutContext() {
  const context = useContext(LayoutContext);

  if (context === undefined) {
    throw new Error(
      "The useLayoutContext hook must be used within a LayoutProvider"
    );
  }

  return context;
}

export function LayoutProvider({
  children,
}: PropsWithChildren): JSX.Element {
  const [message, setMessage] = useState("");

  const defineMessage = useCallback((message: string) => {
    setMessage(message);
  }, []);

  const reset = useCallback(() => {
    setMessage("");
  }, [setMessage]);

  const layoutState = useMemo(
    () => ({
      defineMessage,
      message,
      reset,
    }),
    [defineMessage, message, reset]
  );

  return (
    <LayoutContext.Provider value={layoutState}>
      {children}
    </LayoutContext.Provider>
  );
}
