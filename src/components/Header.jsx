import React, { useEffect, useRef, useState } from 'react'
import Menu from './Menu'
import SearchBar from './SearchBar'
import { BsThreeDotsVertical } from "react-icons/bs";
import { Link2Icon, MenuIcon, Radio } from 'lucide-react';
import { Link } from 'react-router-dom';
import Logo from "../assets/Youtube-Logo.png"
import { useSidebar } from './MenuContext';
import { useLocation } from "react-router-dom"
import { useDispatch, useSelector } from 'react-redux';
import UserDropdown from './UserDropdown';
import { logout } from '../redux/authSlice';
import { useNavigate } from "react-router-dom";
import { IoCreateOutline, IoNotificationsCircle, IoNotificationsOffCircleOutline } from 'react-icons/io5';
import { IoMdNotificationsOutline } from 'react-icons/io';
import { HiOutlinePlus } from 'react-icons/hi';
import { RxVideo } from 'react-icons/rx';


export default function Header() {

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const isHome = location.pathname === "/";
  const { toggleSidebar, toggleCollapse } = useSidebar();

  //login
  const user = useSelector((state) => state.auth.user)
  console.log("user", user)
  const firstInitial = user?.firstname?.trim().charAt(0).toUpperCase();
  //dropdown if login
  const [dropdown, setDropdown] = useState(false);
  const [createDropdown, setCreateDropdown] = useState(false)
  const createRef = useRef();
  const userMenuRef = useRef();
  const [channelCreated, setChannelCreated] = useState(false);


  useEffect(() => {

    if (user.channels?.length >= 1) {
      setChannelCreated(true);
    } else {
      setChannelCreated(false);
    }

    console.log("data", user);

    function handleClickOutside(event) {
      if (createRef.current && !createRef.current.contains(event.target)) {
        setCreateDropdown(false);

      }
    }

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleViewChannel = () => {
    navigate("/channel");
  }

  const handleLogout = () => {
    dispatch(logout());
    navigate("/login")
    window.location.reload();

  }

  const handleMenu = () => {
    if (isHome) toggleCollapse();
    else toggleSidebar();
  }



  return (
    <>
      <header >


        <section className='flex justify-between relative p-2 px-4 z-50 '>
          <article>
            {/* MenuSection  */}
            <div className='flex items-center  '>
              <button className="text-gray-700 hover:text-black md:block" onClick={handleMenu}>
                <MenuIcon size={20}></MenuIcon>
              </button>
              <Link to={"/"}>
                <img src={Logo} className='w-20' alt='logo'></img>
              </Link>
            </div>
          </article>


          {/* SearchBar section */}
          <article className=' sm:w-[60%] '>
            <SearchBar></SearchBar>

          </article>

          {/* If user login : showing dropdown */}
          {
            dropdown && (

              <UserDropdown onLogout={handleLogout} logo={firstInitial} user={user} setDropdown={setDropdown}></UserDropdown >

            )
          }

          {
            user && (
              <article className="flex justify-center items-center h-16 ">


                <div className="flex gap-2 justify-center items-center  ">
                  <div className="relative" ref={createRef}>
                     <span
                          className="flex items-center bg-gray-200 p-3 rounded-full cursor-pointer"
                          onClick={() => setCreateDropdown((prev) => !prev)}>
                          <HiOutlinePlus className="mr-1" />
                          Create
                        </span>
                    {/* {
                      channelCreated === false ? (
                        <span
                          className="flex items-center bg-gray-200 p-3 rounded-full cursor-pointer"
                          onClick={() => setCreateDropdown((prev) => !prev)}>
                          <HiOutlinePlus className="mr-1" />
                          Create
                        </span>
                      ) : (
                        <span
                          className="flex items-center bg-gray-200 p-3 rounded-full cursor-pointer" onClick={() => handleViewChannel()}>
                          ViewChannel
                        </span>
                      )
                    } */}
                    {createDropdown && (
                      <ul className="absolute right-0 mt-2 w-52 bg-white border border-gray-200 shadow-lg rounded-lg p-2 z-50">
                        <li className="flex items-center gap-2 p-2 hover:bg-gray-100 rounded cursor-pointer">
                          <RxVideo className="text-gray-600" />
                          Upload video
                        </li>
                        <li className="flex items-center gap-2 p-2 hover:bg-gray-100 rounded cursor-pointer">
                          <Radio className="text-gray-600" />
                          Go live
                        </li>
                        <li className="flex items-center gap-2 p-2 hover:bg-gray-100 rounded cursor-pointer">
                          <IoCreateOutline className="text-gray-600" />
                          Create post
                        </li>
                      </ul>
                    )}
                  </div>


                  <IoMdNotificationsOutline size={30} />

                  {/* Logo */}
                  <button
                    className="bg-white shadow border border-blue-500 rounded-full text-sm px-4 py-2 text-blue-500 cursor-pointer"
                    onClick={() => { setDropdown((prev) => !prev), setCreateDropdown(false) }}  >
                    {firstInitial}
                  </button>
                </div>
              </article>
            )
          }


          {/* Sign in button if user not loggedin */}
          {
            !user && (
              <article className="flex justify-center items-center h-16">
                <div className="flex gap-2 justify-center items-center">
                  <BsThreeDotsVertical />
                  <Link to={'/login'}
                    className="bg-white shadow border border-blue-500 rounded-full text-sm px-4 py-2 text-blue-500 cursor-pointer"
                  >
                    Sign in
                  </Link>
                </div>
              </article>
            )
          }



        </section>

      </header>

    </>
  )
}
