import React from 'react'
import assets from '../assets/assets'
import { NavLink, useNavigate } from 'react-router-dom'
import '../index.css'
import { useState } from 'react'

function Navbar() {

    const navi=useNavigate();

    const[token,setToken]=useState(true);
    const[show,setShow]=useState(false);
    return (
        <div className="flex items-center justify-between text-sm py-4 mb-5 border-b border-b-gray-400">
            <img onClick={()=>navi('/')}className="w-44 cursor-pointer"src={assets.logo} alt="" />
            <ul className="hidden md:flex items-center gap-6 font-semibold" >
                <NavLink to='/' >
                    <li className="py-1 ">HOME</li>
                    <hr className=" outline-none  bg-primary h-0.5  w-3/5 m-auto hidden"/>
                </NavLink>
                 <NavLink to='/doctors' >
                    <li className="py-1 text-primary">ALL DOCTOR</li>
                    <hr className=" outline-none  h-0.5  bg-primary w-3/5 m-auto hidden"/>
                </NavLink>
                 <NavLink to='/about'>
                    <li className="py-1">ABOUT</li>
                    <hr className=" outline-none  h-0.5 bg-primary w-3/5 m-auto hidden"/>
                </NavLink>
                 <NavLink to='/contact'>
                    <li className="py-1">CONTACT</li>
                    <hr className="outline-none  h-0.5 bg-primary w-3/5 m-auto hidden"/>
                </NavLink>
            </ul>
            <div className="flex items-center gap-4">
                {
                    token?<div className="flex items-center gap-2 cursor-pointer group relative">
                        <img className="w-8 rounded-full"src={assets.profile_pic} alt="" />
                        <img className="w-2.5" src={assets.dropdown_icon} alt="" />
                         <div className="absolute top-0 right-0 pt-14 text-base font-medium  z-20 hidden group-hover:block rounded text-gray-600">
                            <div className="min-w-48 bg-stone-100 rounded flex flex-col p-4 gap-4 ">
                                <p  onClick={()=>(navi('/my-profile'))}className="hover:text-black cursor-pointer">My Profile</p>
                                <p onClick={()=>(navi('/my-appointment'))}className="hover:text-black cursor-pointer">My Appointment</p>
                                <p onClick={() => { setToken(false); navi('/'); }} className="hover:text-black cursor-pointer">Logout</p>
                            </div>
                         </div>
                    </div>
                    : <button onClick={()=>navi('/login')} className="bg-blue-700 cursor-pointer rounded-full py-3 px-6 text-white font-light hidden md:block">Create Account</button>
                    
                }
                <img onClick={()=>setShow(true)}className="w-5 md:hidden cursor-pointer" src={assets.menu_icon} alt="" />
                <div className={`${show?"fixed w-full":"h-0 w-0"} md:hidden right-0 top-0 bottom-0 z-20 overflow-hidden bg-white transition-all`}>
                    <div className="flex justify-between items-center px-4 py-3">
                        <img className="w-36"src={assets.logo} alt="" />
                        <img className="w-7 cursor-pointer" onClick={()=>setShow(false)}src={assets.cross_icon} alt="" />
                    </div>
                    <ul className="flex flex-col items-center gap-4 px-5 mt-5 text-lg font-medium">
                        <NavLink onClick={()=>setShow(false)} to="/"><p className="px-4 py-2 rounded inline-block">HOME</p></NavLink>
                        <NavLink  onClick={()=>setShow(false)} to="/doctors"><p className="px-4 py-2 rounded inline-block">ALL DOCTOR</p></NavLink>
                        <NavLink  onClick={()=>setShow(false)} to="/about"><p className="px-4 py-2 rounded inline-block">ABOUT</p></NavLink>
                         <NavLink  onClick={()=>setShow(false)} to="/contact"><p className="px-4 py-2 rounded inline-block">CONTACT</p></NavLink>
                        
                    </ul>
                </div>
            </div>
        </div>
    )
}

export default Navbar