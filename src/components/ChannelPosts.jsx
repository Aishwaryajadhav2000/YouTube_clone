import { Image, ListTree, Video } from 'lucide-react'
import React from 'react'
import { MdCheckBox } from 'react-icons/md'

export default function ChannelPosts() {
    return (
        <>
            <div className='border border-gray-700 w-full p-4'>
                <h1>Username</h1>
                <h2>What's on your mind?</h2>

                <ul className='flex'>
                    <li className='flex mr-7 p-2'> <Image></Image> Image</li>
                    <li className='flex mr-7 p-2'><ListTree></ListTree> Image poll</li>
                    <li className='flex mr-7 p-2'><ListTree></ListTree>Text poll</li>
                    <li className='flex mr-7 p-2'><MdCheckBox></MdCheckBox> Quiz</li>
                    <li className='flex mr-7 p-2'><Video></Video> Video</li>
                </ul>
            </div>
        </>
    )
}
