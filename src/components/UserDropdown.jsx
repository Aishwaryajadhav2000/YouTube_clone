import React, { useEffect, useState } from 'react'
import CreateChannel from './CreateChannel'
import { Link } from 'react-router-dom';
import { LogOut, UserCircle, Settings, HelpCircle, Sun, Languages, ShieldCheck, BadgeDollarSign, LayoutDashboard, Globe, KeySquare } from "lucide-react";
import { FcGoogle } from 'react-icons/fc';
import { MdOutlinePerson } from 'react-icons/md';
import { useNavigate } from 'react-router-dom';

export default function UserDropdown({ onLogout, logo, user, setDropdown }) {

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [channelCreated, setChannelCreated] = useState(false);
    const navigate = useNavigate();
    

    const openModal = () => {
        setIsModalOpen(true);
        // setDropdown(false)
    }
    const closeModal = () => setIsModalOpen(false);

    useEffect(() => {
        if (user.channels?.length >= 1) {
            setChannelCreated(true);
        } else {
            setChannelCreated(false);
        }
    }, [user.channels]);

    const handleViewChannel = () => {
        navigate("/channel");
        setDropdown(false)

    }



    return (
        <>
            <div
                className="absolute right-0 top-16 w-full sm:w-80 sm:rounded-md sm:border sm:shadow-xl bg-white z-50 sm:mr-4 sm:top-14"
            >

                {/* Sticky Header with User Info */}
                <div className="p-4 border-b border-gray-300 sticky top-0 bg-white z-10">
                    <div className="flex items-center space-x-3 mb-2">
                        {
                            user.avatar ? (
                                <img src={user.avatar} alt="" className="w-10 h-10 rounded-full" />
                            ) : (
                                <div className="bg-blue-500 text-white font-bold w-10 h-10 flex items-center justify-center rounded-full">
                                    {logo}
                                </div>
                            )
                        }
                        <div>
                            <p className="font-semibold">{user?.firstname} {user?.lastname}</p>
                            <p className="text-sm text-gray-600">{user.email}</p>
                        </div>
                    </div>

                    {
                        channelCreated === false ? (
                            <button
                                className="text-blue-500 font-bold text-center cursor-pointer"
                                onClick={() => openModal()} >
                                Create a channel
                            </button>
                        ) : (
                            <button className="text-blue-500 font-bold text-center cursor-pointer" onClick={() => handleViewChannel()}>
                                View your channel

                            </button>
                        )
                    }
                </div>

                {/* Scrollable content section */}
                <div className="max-h-[80vh] overflow-y-auto p-4 space-y-4 text-sm thin-scrollbar">
                    {/* Section 1 */}
                    <div className="space-y-2">
                        <MenuItem icon={<FcGoogle />} text="Google Account" />
                        <MenuItem icon={<MdOutlinePerson />} text="Switch Account" />
                        <button
                            onClick={onLogout}
                            className="flex items-center font-bold w-full hover:bg-gray-100 px-2 py-1 rounded gap-2"
                        >
                            <LogOut className="w-4 h-4" />
                            Sign Out
                        </button>
                    </div>

                    {/* Section 2 */}
                    <div className="border-t border-gray-300 pt-2 space-y-2">
                        <MenuItem icon={<LayoutDashboard />} text="YouTube Studio" />
                        <MenuItem icon={<BadgeDollarSign />} text="Purchases and Memberships" />
                    </div>

                    {/* Section 3 */}
                    <div className="border-t border-gray-300 pt-2 space-y-2">
                        <MenuItem icon={<ShieldCheck />} text="Your Data in YouTube" />
                        <MenuItem icon={<Sun />} text="Appearance: Device Theme" />
                        <MenuItem icon={<Languages />} text="Language: English" />
                        <MenuItem icon={<ShieldCheck />} text="Restricted Mode: Off" />
                        <MenuItem icon={<KeySquare />} text="Keyboard Shortcuts" />
                    </div>

                    {/* Section 4 */}
                    <div className="border-t border-gray-300 pt-2 space-y-2">
                        <MenuItem icon={<Settings />} text="Settings" />
                    </div>

                    {/* Section 5 */}
                    <div className="border-t border-gray-300 pt-2 space-y-2">
                        <MenuItem icon={<HelpCircle />} text="Help" />
                        <MenuItem icon={<HelpCircle />} text="Send Feedback" />
                    </div>
                </div>

                {/* Channel creation modal */}

                <CreateChannel isOpen={isModalOpen} onClose={closeModal} user={user} setDropdown={setDropdown}/>


            </div>


        </>
    )
}
const MenuItem = ({ icon, text }) => (
    <div className="flex items-center gap-3 hover:bg-gray-100 px-2 py-1 rounded cursor-pointer text-gray-700">
        <div className="w-5 h-5 flex items-center justify-center">{icon}</div>
        <span>{text}</span>
    </div>
);