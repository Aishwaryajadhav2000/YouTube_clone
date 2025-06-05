import React, { useState } from 'react'
import CreateChannel from './CreateChannel'

export default function UserDropdown({ onLogout, logo, user }) {

  const [isModalOpen, setIsModalOpen] = useState(false);


    const openModal = () =>{
        setIsModalOpen(true);
    }
    const closeModal = () => setIsModalOpen(false);


    return (
        <>
            {/* <div className="flex gap-2 justify-center items-center">
                <button
                    className="bg-white shadow border border-blue-500 rounded-full text-sm px-4 py-2 text-blue-500 cursor-pointer"
                    onClick={() => setDropdown((prev) => !prev)}
                >
                    {logo}
                </button>
            </div> */}

            <div
                className="absolute top-2 right-10 bg-white shadow-lg rounded-md w-60 sm:w-72 z-50">

                {/* HEader */}
                <div className="p-4 border-b border-gray-300 sticky top-0 bg-white z-10">
                    <div className="flex items-center space-x-3 mb-2">
                        <div>
                            <button
                                className="bg-white shadow border border-blue-500 rounded-full text-sm px-4 py-2 text-blue-500 ">
                                {logo}
                            </button>
                        </div>
                        <div>
                            <p className="font-semibold">{user?.firstname} {user?.lastname}</p>
                            <p>{user.email}</p>

                        </div>

                    </div>

                    <div className='flex justify-center text-blue-500 font-bold cursor-pointer' onClick={openModal}>
                        <p>create a channel</p>
                    </div>





                </div>


                <CreateChannel isOpen={isModalOpen}  onClose={closeModal} user={user}></CreateChannel>


            </div>

        </>
    )
}
