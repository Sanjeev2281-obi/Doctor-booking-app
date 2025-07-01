import React from 'react'
import assets from '../assets/assets'

function Header() {
    return (
        <div className="flex flex-col md:flex-row bg-blue-600 rounded-lg px-6 md:px-10 lg:px-20 relative overflow-hidden">
            
            <div className="md:w-1/2 flex flex-col items-start justify-center gap-4 py-16 md:py-29 min-h-[350px]">
                <p className="text-3xl md:text-3xl lg:text-4xl text-white font-semibold leading-tight">
                    Book Appointment<br />
                    With Trusted Doctors,
                </p>
                <div className="flex flex-col md:flex-row items-center gap-3 text-white text-sm">
                    <img className="w-24 h-10" src={assets.group_profiles} alt="" />
                    <p>
                        Simple Browse through our extensive list <br />
                        trusted doctors schedule your appointment hassle-free.
                    </p>
                </div>
                <a
                    href="#speciality"
                    className="flex items-center md:ml-[-8px] gap-2 bg-white px-8 py-3 rounded-full text-gray-600 text-sm m-auto md:m-0 hover:scale-105 transition-all duration-300"
                >
                    Book appointment <img className="w-3" src={assets.arrow_icon} alt="" />
                </a>
            </div>

           
            <div className="w-full md:w-1/2 flex items-end justify-center min-h-[280px] relative">
                <img
                    className="w-[400px] max-w-xs md:w-full md:max-w-full h-auto rounded-lg mx-auto absolute bottom-0 left-1/2 -translate-x-1/2 md:static md:translate-x-0 mt-6 md:mt-0"
                    src={assets.header_img}
                    alt=""
                />
            </div>
        </div>
    )
}

export default Header