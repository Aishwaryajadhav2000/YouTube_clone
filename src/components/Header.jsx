import React, { useState } from 'react'
import Menu from './Menu'
import SearchBar from './SearchBar'
import { BsThreeDotsVertical } from "react-icons/bs";
import { Link2Icon, MenuIcon } from 'lucide-react';
import { Link } from 'react-router-dom';
import Logo from "../assets/Youtube-Logo.png"
import { useSidebar } from './MenuContext';
import { useLocation } from "react-router-dom"
import { useDispatch, useSelector } from 'react-redux';
import UserDropdown from './UserDropdown';
import { logout } from '../redux/authSlice';

export default function Header() {

  const dispatch = useDispatch();

  const location = useLocation();
  const isHome = location.pathname === "/";
  const { toggleSidebar, toggleCollapse } = useSidebar();

  //login
  const user = useSelector((state) => state.auth.user)
  console.log("user", user)
  const firstInitial = user?.firstname?.trim().charAt(0).toUpperCase();

  //dropdown if login
  const [dropdown, setDropdown] = useState(false);

  const handleLogout =() =>{
    dispatch(logout());

  }




  const handleMenu = () => {
    if (isHome) toggleCollapse();
    else toggleSidebar();
  }



  return (
    <>
      <header className='flex justify-between relative p-2 px-4 z-50'>

        {/* MenuSection  */}
        <div className='flex items-center gap-2'>
          <button className="text-gray-700 hover:text-black md:block" onClick={handleMenu}>
            <MenuIcon size={20}></MenuIcon>
          </button>
          <Link to={"/"}>
            <img src={Logo} className='w-20' alt='logo'></img>
          </Link>
        </div>



        {/* SearchBar section */}
        <div className=' sm:w-[60%]'>
          <SearchBar></SearchBar>
        </div>



        {
          dropdown && (
            <UserDropdown onLogout={handleLogout} logo={firstInitial} user={user}></UserDropdown>
          )
        }

        {
          user && (
            <div className="flex justify-center items-center h-16">


              <div className="flex gap-2 justify-center items-center">


                <button
                  className="bg-white shadow border border-blue-500 rounded-full text-sm px-4 py-2 text-blue-500 cursor-pointer"
                  onClick={() => setDropdown((prev) => !prev)}
                >
                  {firstInitial}
                </button>
              </div>
            </div>
          )
        }




        {
          !user && (
            <div className="flex justify-center items-center h-16">
              <div className="flex gap-2 justify-center items-center">
                <BsThreeDotsVertical />
                <Link to={'/login'}
                  className="bg-white shadow border border-blue-500 rounded-full text-sm px-4 py-2 text-blue-500 cursor-pointer"
                >
                  Sign in
                </Link>
              </div>
            </div>
          )
        }



      </header>

    </>
  )
}
