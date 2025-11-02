"use client";
import { createContext, useState, useContext, ReactNode } from "react";

interface SidebarContextType {
  isSidebarActive: boolean;
  toggleSidebar: () => void;
}

const SidebarContext = createContext<SidebarContextType | undefined>(undefined);

export const SidebarProvider = ({ children }: { children: ReactNode }) => {
  const [isSidebarActive, setIsSidebarActive] = useState<boolean>(false);

  const toggleSidebar = () => {
    setIsSidebarActive((prev) => !prev);
  };

  return (
    <SidebarContext.Provider value={{ isSidebarActive, toggleSidebar }}>
      {children}
    </SidebarContext.Provider>
  );
};

export const useSidebar = (): SidebarContextType => {
  const context = useContext(SidebarContext);
  if (!context) {
    throw new Error("useSidebar must be used within a SidebarProvider");
  }
  return context;
};
