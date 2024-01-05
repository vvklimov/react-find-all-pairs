import { createContext, useState, useContext } from "react";

const SidebarContext = createContext();

export const SidebarProvider = ({ children }) => {
  const [showSidebar, setShowSidebar] = useState(false);
  return (
    <SidebarContext.Provider value={{ showSidebar, setShowSidebar }}>
      {children}
    </SidebarContext.Provider>
  );
};

export const useSidebarContext = () => useContext(SidebarContext);
