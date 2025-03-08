import React from 'react'
import {motion} from "framer-motion"
function Instructions() {
    const instructions = [
        {
            title: (
                <span>
                    If you don't have a Zyphra account, create one using this link: 
                    <a 
                        className="text-orange-600 ml-2 hover:text-red-600 hover:underline duration-200" 
                        href="https://playground.zyphra.com/" 
                        target="_blank"
                    >
                        Zyphra Site
                    </a>
                </span>
            )
        },
        {
            title: (
                <span>
                    Go to the "API Keys" tab on the Zyphra playground and copy your API key: 
                    <a 
                        className="text-orange-600 ml-2 hover:text-red-600 hover:underline duration-200" 
                        href="https://playground.zyphra.com/settings/api-keys" 
                        target="_blank"
                    >
                        Zyphra API Key
                    </a>
                </span>
            )
        },
        {
            title: (
                <span>
                    Zyphra offers 100 free minutes on a new account, allowing you to generate up to 100 minutes of voice using JSF AI. You can track your usage in the "Billing" tab: 
                    <a 
                        className="text-orange-600 ml-2 hover:text-red-600 hover:underline duration-200" 
                        href="https://playground.zyphra.com/settings/billing" 
                        target="_blank"
                    >
                        Zyphra Billing
                    </a>
                </span>
            )
        },
        {
            title: (
                <span>
                    If you use up the 100 minutes, delete your Zyphra account here: 
                    <a 
                        className="text-orange-600 ml-2 hover:text-red-600 hover:underline duration-200" 
                        href="https://playground.zyphra.com/settings/data-management" 
                        target="_blank"
                    >
                        Delete Account
                    </a>
                </span>
            )
        },
        {
            title: (
                <span>
                    After deleting your account, create a new one to receive an additional 100 minutes: 
                    <a 
                        className="text-orange-600 ml-2 hover:text-red-600 hover:underline duration-200" 
                        href="https://playground.zyphra.com/" 
                        target="_blank"
                    >
                        New Account
                    </a>
                </span>
            )
        }
    ];
    
  return (
    <motion.div 
    initial={{ opacity: 0, y: 10 }}
    animate={{ opacity: 1, y: 0 }}
    className=' shadow-md text-gray-100 p-2 rounded-md '>
    <ul className='flex flex-col gap-2'>
        {
            instructions.map((instruct, index) => (
                <li className='border-b border-b-gray-700 py-2'>
                 {/* <b className='px-4'>{index + 1}.</b>   */}
                  {instruct.title}
                </li>
            ))
        }
    </ul>

    <div>
        <h1 className='text-center text-7xl my-4 mt-8'>Thank You!</h1>
    </div>
    </motion.div>
  )
}

export default Instructions
