import { IoIosMenu } from "react-icons/io";
import { Link, useLocation } from "react-router-dom";
import { BellIcon, BookOpenIcon, BrushIcon, ChevronRightIcon, DumbbellIcon, FilmIcon, FlameIcon, Gamepad2Icon, HomeIcon, MenuIcon, Mic2Icon, Music2Icon, NewspaperIcon, ShoppingBagIcon, User, VideoIcon, WifiIcon } from "lucide-react";
import { FaHistory } from "react-icons/fa";
import { MdPlaylistPlay } from "react-icons/md";
import { GoVideo } from "react-icons/go";
import { useSidebar } from "./MenuContext";



export default function Menu({ overlay }) {

  const { toggleSidebar, sidebarCollapsed, toggleCollapse } = useSidebar();

  const location = useLocation();
  const isHome = location.pathname === "/"
  const isCollapsed = !overlay && sidebarCollapsed;
   const sidebarClasses = overlay
    ? "fixed top-0 left-0 w-64 h-full bg-white shadow-lg z-50"
    : `fixed top-[4rem] left-0 h-[calc(100vh-4rem)] transition-all duration-300 z-30 ${isCollapsed ? "hidden sm:block sm:w-20" : "w-64"
    } bg-white`;



  return (
    <>
      <div className={sidebarClasses}>

        {/* Menu icon */}

       {(!isHome || overlay) && (
        <div className="p-3 flex items-center justify-between">
          <button onClick={overlay ? toggleSidebar : toggleCollapse}>
            <MenuIcon size={24} />
          </button>
        </div>
      )}


        <div className="overflow-y-auto h-[calc(100%-2.5rem)] px-3 pb-4">

          <MenuLink to="/" label="Home" icon={<HomeIcon size={25}></HomeIcon>}></MenuLink>

          <MenuLink to="/" label="Shorts" icon={<VideoIcon size={25}></VideoIcon>}></MenuLink>

          <MenuLink to="/" label="Subscriptions" icon={<BellIcon size={25}></BellIcon>}></MenuLink>

          <hr></hr>

          <MenuLink to="/" label="You" icon={<User size={25}></User>}></MenuLink>

          {/* <MenuLink to="/" label="History" icon={<FaHistory  size={25}></FaHistory >}></MenuLink>

          <MenuLink to="/" label="Playlists" icon={<MdPlaylistPlay size={25}></MdPlaylistPlay>}></MenuLink>

          <MenuLink to="/" label="Your videos" icon={<GoVideo size={25}></GoVideo>}></MenuLink>

          <MenuLink to="/" label="Watch later" icon={<User size={25}></User>}></MenuLink>

          <MenuLink to="/" label="Liked videos" icon={<User size={25}></User>}></MenuLink>

          <MenuLink to="/" label="Downloads" icon={<User size={25}></User>}></MenuLink> */}

          <div>
            <hr className="my-2" />
            <h3 className="text-sm font-semibold px-2 mb-1">Explore</h3>
            <MenuLink
              to="#"
              icon={<FlameIcon size={25} />}
              label="Trending"
            />
            <MenuLink
              to="#"
              icon={<ShoppingBagIcon size={25} />}
              label="Shopping"
            />
            <MenuLink
              to="#"
              icon={<Music2Icon size={25} />}
              label="Music"
            />
            <MenuLink
              to="#"
              icon={<FilmIcon size={25} />}
              label="Movies"
            />
            <MenuLink
              to="#"
              icon={<WifiIcon size={25} />}
              label="Live"
            />
            <MenuLink
              to="#"
              icon={<Gamepad2Icon size={25} />}
              label="Gaming"
            />
            <MenuLink
              to="#"
              icon={<NewspaperIcon size={25} />}
              label="News"
            />
            <MenuLink
              to="#"
              icon={<DumbbellIcon size={25} />}
              label="Sports"
            />
            <MenuLink
              to="#"
              icon={<BookOpenIcon size={25} />}
              label="Courses"
            />
            <MenuLink
              to="#"
              icon={<BrushIcon size={25} />}
              label="Fashion & Beauty"
            />
            <MenuLink
              to="#"
              icon={<Mic2Icon size={25} />}
              label="Podcasts"
            />


          </div>





        </div>











      </div>

    </>
  )

}
function MenuLink({ icon, to, label, collapsed }) {
  const location = useLocation();
  const isActive = location.pathname === to;

  return (
    <Link
      to={to}
      className={`flex items-center ${collapsed ? "justify-center" : "justify-start"
        } gap-3 px-2 py-2 rounded-lg font-medium ${isActive ? "" : "text-gray-700 hover:bg-gray-100"
        }`}
    >

      <p className="flex flex-col justify-center items-center">
        {label == "You" && !collapsed ? null : icon}
        {collapsed && <span className="text-[12px] ">{label}</span>}
      </p>

      {!collapsed && (
        <span className="truncate flex items-center gap-1">
          {label}
          {label === "You" && <ChevronRightIcon size={16} />}
        </span>
      )}

    </Link>
  )
}