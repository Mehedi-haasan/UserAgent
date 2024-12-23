"use client";

import {
  createContext,
  useContext,
  useMemo,
  useState,
  ReactNode,
  useEffect,
} from "react";

const CONTEXT_ERROR = "useUserAgentContext must be used within a UserAgentProvider";

type UserAgent = string;

type UserAgentContextType = {
  userAgent: UserAgent | undefined;
  setUserAgent: (userAgent: UserAgent | undefined) => void;
};

type UserAgentProviderProps = {
  children: ReactNode;
  userAgent?: UserAgent;
};

const UserAgentContext = createContext<UserAgentContextType | undefined>(undefined);

export const useUserAgentContext = (): UserAgentContextType => {
  const context = useContext(UserAgentContext);
  if (context === undefined) {
    throw new Error(CONTEXT_ERROR);
  }
  return context;
};

export const UserAgentProvider: React.FC<UserAgentProviderProps> = ({ children, userAgent: userAgentProp = "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36", }) => {

  const [userAgent, setUserAgent] = useState<UserAgent | undefined>(userAgentProp);

  useEffect(() => {
    if (typeof window !== "undefined") {
      setUserAgent(window.navigator.userAgent);
      
    }
  }, []);

  const value = useMemo<UserAgentContextType>(() => ({ userAgent, setUserAgent, }), [userAgent]);

  return (
    <UserAgentContext.Provider value={value}>
      {children}
    </UserAgentContext.Provider>
  );
};
