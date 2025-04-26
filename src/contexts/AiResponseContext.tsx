import React, { createContext, useContext, useState } from "react";

interface AiResponseContextType {
  aiRes: string;
  setAiRes: React.Dispatch<React.SetStateAction<string>>;
}

const AiResponseContext = createContext<AiResponseContextType | undefined>(undefined);

export const AiResponseProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [aiRes, setAiRes] = useState<string>("Zdravo, kako mogu da ti pomognem?");

  return (
    <AiResponseContext.Provider value={{ aiRes, setAiRes }}>
      {children}
    </AiResponseContext.Provider>
  );
};

export const useAiResponse = (): AiResponseContextType => {
  const context = useContext(AiResponseContext);
  if (!context) throw new Error("useAiResponse must be used within AiResponseProvider");
  return context;
};
