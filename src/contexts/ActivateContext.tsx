import React, { createContext, useContext, useState } from "react";

interface AiResponseContextType {
  isRunning: boolean;
  setIsRunning: React.Dispatch<React.SetStateAction<boolean>>;
}

const ActivateContext = createContext<AiResponseContextType | undefined>(undefined);

export const ActivateContextProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isRunning, setIsRunning] = useState<boolean>(false)

  return (
    <ActivateContext.Provider value={{ isRunning, setIsRunning }}>
      {children}
    </ActivateContext.Provider>
  );
};

export const useActive = (): AiResponseContextType => {
  const context = useContext(ActivateContext);
  if (!context) throw new Error("useAiResponse must be used within AiResponseProvider");
  return context;
};
