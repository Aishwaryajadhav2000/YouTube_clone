import { PersonStandingIcon } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import { IoPersonOutline } from "react-icons/io5";
import { BsPersonCircle } from "react-icons/bs";
import createChanneService from '../services/createChanneService.js';
import API_BASE_URL from '../services/Apicall.js';
import { useSelector } from 'react-redux';

export default function CreateChannel({ isOpen, onClose, user }) {

    const [noImage, setNoImage] = useState(true)
    // const [channelHandle, setChannelHandle] = useState(createChanneService(onclose));
    // const [channelName, setChannelName] = useState(`${user.firstname} ${user.lastname}` , createChanneService(onclose));
    // const [channelprofileimage, setchannelprofileimage] = useState(createChanneService(onclose));
    const [channelOwner, setChannelowner] = useState();

    const { channelName, setChannelName,  handle,
    setHandle,  channelImage,  isFormValid,
    setChannelImage, handleSubmit } = createChanneService(onClose)

    const token = localStorage.getItem("token");

    useEffect(() => {
        if (user && user._id) {
            setChannelowner(user._id);
        }
    }, [user]);



    if (!isOpen) {
        return null
    }


    // const handleSubmit = (e) => {
    //     e.preventDefault();
    //     //     console.log("token" , token)


    //     // try {
    //     //     const createChannelResponse = await fetch(`${API_BASE_URL}/createchannel`, {
    //     //         method: "POST",
    //     //         headers: {
    //     //             "Content-Type": "application/json",
    //     //              "Authorization": `JWT ${token}`
    //     //         },
    //     //         body: JSON.stringify({
    //     //             channelName: channelName,
    //     //             handle: channelHandle,

    //     //         })
    //     //     });

    //     //     console.log("response" ,createChannelResponse)


    //     // } catch (err) {
    //     //     alert(`Error : ${err.message}`)
    //     // }








    //     // const payload = {
    //     //     channelName,
    //     //     channelHandle,
    //     //     channelprofileimage,
    //     //     channelOwner
    //     // };

    //     // try {
    //     //     const response = await createChanneService(payload); // pass the data to the service
    //     //     console.log("Channel created:", response);
    //     //     // Optionally navigate to another page here using useNavigate()
    //     // } catch (error) {
    //     //     console.error("Error creating channel:", error);
    //     // }
    // }


    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/10">
            <div className="bg-white p-3 rounded-2xl w-[90%] sm:w-full sm:max-w-2xl relative mx-auto">
                <h2 className="text-md sm:text-2xl font-semibold mb-4">How you'll appear</h2>
                {/* <form onSubmit={handleSubmit}>

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








                </form> */}


                <form onSubmit={handleSubmit}>
                    <div className="sm:space-y-4 flex flex-col sm:px-[100px]">
                        {/*=========== Channel Image Upload Section ============*/}
                        <div className="flex flex-col items-center space-y-2">
                            <div
                                onClick={() => document.getElementById("channelImageInput").click()}
                                className="w-24 h-24 rounded-full bg-gray-200 flex items-center justify-center cursor-pointer overflow-hidden"
                            >
                                {channelImage ? (
                                    <img
                                        src={URL.createObjectURL(channelImage)}
                                        alt="Preview"
                                        className="w-full h-full object-cover"
                                    />
                                ) : (
                                    <span className="text-gray-500 text-sm">+</span>
                                )}
                            </div>
                            <span
                                onClick={() => document.getElementById("channelImageInput").click()}
                                className="cursor-pointer text-blue-600 font-semibold hover:underline text-sm"
                            >
                                Select Image
                            </span>
                            <input
                                type="file"
                                id="channelImageInput"
                                accept="image/*"
                                onChange={(e) => setChannelImage(e.target.files[0])}
                                className="hidden"
                            />
                        </div>

                        {/*========== Channel Name Input Section ===========*/}
                        <div>
                            <label className="block text-sm font-medium">Channel Name</label>
                            <input
                                type="text"
                                value={channelName}
                                onChange={(e) => setChannelName(e.target.value)}
                                required
                                className="w-full p-2 border border-gray-300 rounded outline-none focus:ring-1 focus:ring-blue-300"
                            />
                        </div>

                        {/*============ Channel Handle Input Section ==========*/}
                        <div>
                            <label className="block text-sm font-medium">Handle</label>
                            <input
                                type="text"
                                value={handle}
                                onChange={(e) => setHandle(e.target.value)}
                                required
                                placeholder="@example123"
                                className="w-full p-2 border border-gray-300 rounded outline-none focus:ring-1 focus:ring-blue-300"
                            />
                        </div>

                        {/*=========== Channel Banner Upload Section ===========*/}
                        {/* <div>
                            <label className="block text-sm font-medium">Channel Banner</label>
                            <input
                                type="file"
                                onChange={(e) => setChannelBanner(e.target.files[0])}
                                className="w-full p-2 border border-gray-300 rounded outline-none focus:ring-1 focus:ring-blue-300"
                            />
                        </div> */}
                        {/*========== Terms and Google Account Info ============*/}
                        <div>
                            <p className="text-xs text-gray-500 pt-6">
                                You can view and change your Google Account settings anytime at
                                . Your channel name will be linked to a Brand Account which is managed by
                                <span className="font-medium text-blue-400"> {user.email} </span>. Learn more about channels.
                                By selecting "Create", you agree to YouTube's Terms of Service.
                            </p>
                        </div>
                    </div>

                    {/*========== Submit and Cancel Buttons ==========*/}
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
                            disabled={!isFormValid}
                            className={`px-4 py-2 rounded text-sm ${isFormValid ? "cursor-pointer text-blue-400 font-semibold" : "text-gray-500 cursor-not-allowed"
                                }`}
                        >
                            create
                            {/* {isLoading ? "Creating..." : "Create Channel"} */}
                        </button>
                    </div>
                </form>

            </div>
        </div>
    )
}
