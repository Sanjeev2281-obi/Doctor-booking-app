import React, { useState, useEffect, useRef } from 'react'
import assets from '../assets/assets'
import { NavLink, useNavigate } from 'react-router-dom'
import '../index.css'

function Navbar() {
  const navi = useNavigate();
  const [token, setToken] = useState(true);
  const [show, setShow] = useState(false);
  const [dropdown, setDropdown] = useState(false);

  const dropdownRef = useRef(null);

  // Close dropdown when clicked outside
  useEffect(() => {
    const handler = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setDropdown(false);
      }
    };
    document.addEventListener('mousedown', handler);
    return () => {
      document.removeEventListener('mousedown', handler);
    };
  }, []);

  return (
    <div className="flex items-center justify-between text-sm py-4 mb-5 border-b border-b-gray-400 px-4">
      <img onClick={() => navi('/')} className="w-44 cursor-pointer" src={assets.logo} alt="Logo" />

      {/* Desktop Navigation */}
      <ul className="hidden md:flex items-center gap-6 font-semibold">
        <NavLink to="/"><li className="py-1">HOME</li></NavLink>
        <NavLink to="/doctors"><li className="py-1 text-primary">ALL DOCTOR</li></NavLink>
        <NavLink to="/about"><li className="py-1">ABOUT</li></NavLink>
        <NavLink to="/contact"><li className="py-1">CONTACT</li></NavLink>
      </ul>

      <div className="flex items-center gap-4 relative" ref={dropdownRef}>
        {
          token ? (
            <div className="flex items-center gap-2 cursor-pointer" onClick={() => setDropdown(!dropdown)}>
              <img className="w-8 rounded-full" src={assets.profile_pic} alt="Profile" />
              <img className="w-2.5" src={assets.dropdown_icon} alt="Dropdown" />
            </div>
          ) : (
            <button onClick={() => navi('/login')} className="bg-blue-700 cursor-pointer rounded-full py-3 px-6 text-white font-light hidden md:block">
              Create Account
            </button>
          )
        }

        {/* Dropdown (click-based, works on mobile + desktop) */}
        {dropdown && token && (
          <div className="absolute top-12 right-0 bg-white shadow-md rounded text-gray-700 font-medium z-50 min-w-48 p-4 flex flex-col gap-3">
            <p onClick={() => { setDropdown(false); navi('/my-profile') }} className="cursor-pointer hover:text-black">My Profile</p>
            <p onClick={() => { setDropdown(false); navi('/my-appointment') }} className="cursor-pointer hover:text-black">My Appointment</p>
            <p onClick={() => { setToken(false); setDropdown(false); navi('/') }} className="cursor-pointer hover:text-black">Logout</p>
          </div>
        )}

        {/* Mobile Hamburger Menu */}
        <img onClick={() => setShow(true)} className="w-5 md:hidden cursor-pointer" src={assets.menu_icon} alt="Menu" />

        {/* Mobile Menu */}
        <div className={`${show ? "fixed w-full" : "h-0 w-0"} md:hidden right-0 top-0 bottom-0 z-20 overflow-hidden bg-white transition-all`}>
          <div className="flex justify-between items-center px-4 py-3">
            <img className="w-36" src={assets.logo} alt="" />
            <img className="w-7 cursor-pointer" onClick={() => setShow(false)} src={assets.cross_icon} alt="" />
          </div>
          <ul className="flex flex-col items-center gap-4 px-5 mt-5 text-lg font-medium">
            <NavLink onClick={() => setShow(false)} to="/"><p className="px-4 py-2 rounded inline-block">HOME</p></NavLink>
            <NavLink onClick={() => setShow(false)} to="/doctors"><p className="px-4 py-2 rounded inline-block">ALL DOCTOR</p></NavLink>
            <NavLink onClick={() => setShow(false)} to="/about"><p className="px-4 py-2 rounded inline-block">ABOUT</p></NavLink>
            <NavLink onClick={() => setShow(false)} to="/contact"><p className="px-4 py-2 rounded inline-block">CONTACT</p></NavLink>
            {/* Mobile Dropdown Options */}
            {token && (
              <>
                <p onClick={() => { setShow(false); navi('/my-profile') }} className="px-4 py-2 cursor-pointer">My Profile</p>
                <p onClick={() => { setShow(false); navi('/my-appointment') }} className="px-4 py-2 cursor-pointer">My Appointment</p>
                <p onClick={() => { setToken(false); setShow(false); navi('/') }} className="px-4 py-2 cursor-pointer">Logout</p>
              </>
            )}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Navbar;
