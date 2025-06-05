import { useEffect, useState } from 'react'
import './App.css'
import Menu from './components/Menu'
import Login from './pages/Login'
import SearchBar from './components/SearchBar'
import Header from './components/Header'
import { Outlet } from 'react-router-dom'
import { useSidebar } from './components/MenuContext'
import { useLocation } from 'react-router-dom'


function App() {

  const { sidebarOpen, toggleSidebar, toggleCollapse, sidebarCollapsed } = useSidebar();
  const location = useLocation();

  const isHome = location.pathname === "/"

  useEffect(() => {
    if (!isHome && sidebarOpen) {
      // closes overlay sidebar if it's open
      toggleSidebar();
    }
  }, [location.pathname]);

  return (
    <>

      <div className="sticky top-0 z-50 bg-white">
        <Header />
      </div>

      <div className="relative block sm:flex">
        {(isHome || sidebarOpen) && (
          // <Menu overlay={!isHome} />
          <Menu overlay={!isHome} collapsed={sidebarCollapsed} />
        )}

        {/* <div
          className={`flex-1 h-[calc(100vh-56px)] overflow-x-auto transition-all ${isHome ? (sidebarCollapsed ? "pl-0 sm:pl-20" : "pl-64") : ""
            }`}
        > */}


          <div
            className={`flex-1 h-[calc(100vh-56px)] overflow-x-auto transition-all ${isHome
              ? sidebarCollapsed
                ? "pl-0 sm:pl-20"
                : "pl-64"
              : sidebarOpen
                ? "pl-64"
                : ""
              }`}
          >
            <Outlet />
          </div>
        </div>
        {/* <Header></Header>
     <Outlet></Outlet> */}

      </>
      )
}

      export default App
