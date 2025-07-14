import { createContext, useContext, useState, useEffect } from "react";

//context to manage sidebar state
const SidebarContext = createContext();


export const SidebarProvider = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(() => {
    const stored = localStorage.getItem("sidebarOpen");
    return stored === null ? false : stored === "true";
  });

  const [sidebarCollapsed, setSidebarCollapsed] = useState(false); // For home route
  //sidebar
  const toggleSidebar = () => {
    setSidebarOpen((prev) => {
      const newState = !prev;
      localStorage.setItem("sidebarOpen", newState);
      return newState;
    });
  };

  //sidebar collapse/uncollapse state.
  const toggleCollapse = () => setSidebarCollapsed((prev) => !prev);

  return (
    <SidebarContext.Provider
      value={{ sidebarOpen, toggleSidebar, sidebarCollapsed, toggleCollapse }}
    >
      {children}
    </SidebarContext.Provider>
  );
};

//Custom hook

export const useSidebar = () => useContext(SidebarContext);
