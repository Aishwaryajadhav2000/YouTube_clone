import { PersonStandingIcon } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import { IoPersonOutline } from "react-icons/io5";
import { BsPersonCircle } from "react-icons/bs";
import API_BASE_URL from '../services/Apicall.js';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import useFetchCurrentUser from '../services/fetchUser.js';
import axios from 'axios';

export default function CreateChannel({ isOpen, onClose, user, setDropdown }) {

    const [noImage, setNoImage] = useState(true)
    const [channelHandle, setChannelHandle] = useState();
    const [channelName, setChannelName] = useState(`${user.firstname} ${user.lastname}`);
    const [channelprofileimage, setchannelprofileimage] = useState();
    const [channelOwner, setChannelowner] = useState();
    const navigate = useNavigate();
    const fetchCurrentUser = useFetchCurrentUser();

    const token = localStorage.getItem("token");

    useEffect(() => {

        if (user && user._id) {
            setChannelowner(user._id);

        }
    }, [user]);

    if (!isOpen) {
        return null
    }


    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log("token", token)
        try {
            const createChannelResponse = await fetch(`${API_BASE_URL}/createchanneldemo`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `JWT ${token}`
                },
                body: JSON.stringify({
                    channelName: channelName,
                    handle: channelHandle,

                })
            });

            const resdata = await createChannelResponse.json();
            console.log("response", resdata);
            if (resdata?.channelId) {
                await fetchCurrentUser();
                onClose();
                navigate(`/channel`)
                   setDropdown(false)
            }
        } catch (err) {
            alert(`Error : ${err.message}`)
        }

    }


    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/10">
            <div className="bg-white p-3 rounded-2xl w-[90%] sm:w-full sm:max-w-2xl relative mx-auto">
                <h2 className="text-md sm:text-2xl font-semibold mb-4">How you'll appear</h2>
                <form onSubmit={handleSubmit}>

                    <div className="sm:space-y-4 flex flex-col sm:px-[100px]">



                        <div className="flex flex-col items-center space-y-2">
                            <div
                                className="w-24 h-24 rounded-full bg-gray-200 flex items-center justify-center cursor-pointer overflow-hidden">

                                {
                                    noImage ? (
                                        <BsPersonCircle className="w-full h-full object-cover">

                                        </BsPersonCircle>
                                    ) :
                                        (
                                            <img

                                                alt="Preview"
                                                className="w-full h-full object-cover"
                                            />
                                        )
                                }

                            </div>

                            <input
                                type="file"
                                id="channelImageInput"
                                accept="image/*"
                                onChange={(e) => setchannelprofileimage(e.target.files[0])}
                                className="cursor-pointer text-blue-600 font-semibold hover:underline text-sm"
                                placeholder='select picture'
                            />

                        </div>

                        <div className="w-full p-2 border border-gray-300 rounded outline-none focus:ring-1 focus:ring-blue-300">
                            <label className="block text-sm font-medium">Name</label>
                            <input
                                type="text"
                                required
                                value={channelName}
                                className='w-full border-none outline-none'
                                onChange={(e) => setChannelName(e.target.value)}

                            />
                        </div>

                        <div>
                            <div
                                className="w-full p-2 border border-gray-300 rounded outline-none focus:ring-1 focus:ring-blue-300">
                                <label className="block text-sm font-medium">Handle</label>
                                <input
                                    type="text"
                                    className='w-full border-none outline-none'
                                    placeholder={user.email}
                                    onChange={(e) => setChannelHandle(e.target.value)}
                                />
                            </div>

                            <span>Create a channel username for your Youtube Clone</span>

                        </div>

                        <div>
                            <p className="text-xs text-gray-500 pt-6">
                                By clicking Create Channel you agree to YouTube's Terms of Service. Changes made to your name and profile picture are visible only on YouTube and not other Google services.
                            </p>
                        </div>

                    </div>


                    <div className="flex justify-end items-center gap-5 pt-4">
                        <button
                            type="button"
                            onClick={onClose}
                            className="text-black hover:text-gray-500 cursor-pointer text-sm"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"

                            className='px-4 py-2 rounded text-sm cursor-pointer text-blue-400 font-semibold'
                        >
                            Create Channel
                        </button>
                    </div>








                </form>




            </div>
        </div>
    )
}