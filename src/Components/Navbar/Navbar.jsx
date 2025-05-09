import React, { useContext, useEffect, useState } from 'react'
import { FaBookOpen } from "react-icons/fa6";
import { IoMdList } from "react-icons/io";
import { AiOutlineClose } from "react-icons/ai";
import { Link, NavLink } from 'react-router-dom';
import { FaCartShopping } from "react-icons/fa6";
import { FaHeart } from "react-icons/fa";
import { UserContext } from '../Context/UserContext';

export default function Navbar() {
    const [toggle , setToggle] = useState(false)
    const data =  useContext(UserContext)
    const [isSignIn , setIsSignIn] = useState(data.user)

    useEffect(()=>{
        setIsSignIn(data.user)
    },[data.user])

    const linksNav = [
        {path:"/" , content:"Home"},
        {path:"/books" , content:"Books"},
        {path:"/contact-us" , content:"Contact Us"},
        {path:"/about" , content:"About"},
    ]

    if(data?.user?.role === "admin"){
        linksNav.push({path:"/books-management" , content:"Books Management"})
    }

  return (
    <nav className='sticky top-0 bg-[#D5EDF2] w-full py-6'>
        <div className='container flex items-center justify-between flex-wrap'>
            <a href="/" className='flex gap-5 items-center text-4xl font-bold text-[#D95B96]'>
                <FaBookOpen />
                MY Book
            </a>
            <button onClick={()=>{setToggle(!toggle)}} className='static lg:hidden text-[#D95B96] text-3xl'>
               {
                toggle ? <AiOutlineClose /> :  <IoMdList />
               }
            </button>
            <div onClick={(e)=>{if(e.target.tagName == "A"){setToggle(false)}}} className={`fixed bg-[#D5EDF2]/95 lg:bg-transparent text-gray-700 top-[88px] bottom-0 ${toggle ? "end-0" : "end-full"} start-0 lg:static transition-all duration-300 overflow-hidden grow flex flex-col lg:flex-row items-center`}>
                <ul className='flex gap-5 items-center flex-col lg:flex-row py-1 lg:py-0 w-full lg:w-auto ms-auto text-xl font-medium'>
                    {
                        linksNav.map((link)=>(
                            <li key={link.path} className='hover:text-[#D95B96] transition-all duration-300'><NavLink className="capitalize" to={link.path}>{link.content}</NavLink></li>
                        ))
                    }
                </ul>
                <ul className='mx-auto lg:me-0 lg:ms-auto gap-5 mt-5 lg:mt-0 flex items-center flex-col lg:flex-row text-2xl font-medium'>
                    {
                        isSignIn ? 
                            (
                                <>
                                    <li>
                                        <NavLink onClick={()=>{setToggle(false)}} to={'/cart'}><FaCartShopping /></NavLink>
                                    </li>
                                    <li>
                                        <NavLink onClick={()=>{setToggle(false)}} to={'/favorites'}><FaHeart /></NavLink>
                                    </li>
                                    <li>
                                        <button onClick={()=>{
                                            localStorage.removeItem('user')
                                            data.UserUpdate()
                                        }}>Sign out</button>
                                    </li>
                                </>
                            ):(
                                <li className='border-2 border-black bg-black text-white px-2 py-1 rounded-3xl'>
                                    <Link to={'/sign-in'}>Getting Started</Link>
                                </li>
                            )
                    }
                </ul>
            </div>
        </div>
    </nav>
  )
}
