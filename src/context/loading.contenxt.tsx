import { createContext } from "react";
import { useState } from "react";

interface LoadingContextProps {
  isLoading: boolean;
  startLoading: () => void;
  stopLoading: () => void;
}

const LoadingContext = createContext<LoadingContextProps>(
  {} as LoadingContextProps
);
export const LoadingProvider = ({ children }) => {
  const [isLoading, setIsLoading] = useState(false);
  const startLoading = () => {
    setIsLoading(true);
  };

  const stopLoading = () => {
    setIsLoading(false);
  };
  return (
    <LoadingContext.Provider value={{ isLoading, startLoading, stopLoading }}>
      {children}
    </LoadingContext.Provider>
  );
};
export default LoadingContext;
