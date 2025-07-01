import React from 'react'
import assets from '../assets/assets'
function Footer() {
    return (
        <div className="md:mx-10 cursor-pointer">
            <div className="flex flex-col sm:grid grid-cols-[3fr_1fr_1fr] gap-14 my-10 mt-20 tet-sm">
                <div>
                    <img className="mb-5 w-40" src={assets.logo} alt="" />
                    <p className="w-full md:w-[300px] text-gray-700 leading-6">Lorem ipsum, dolor sit amet consectetur adipisicing elit. Exercitationem facere at assumenda mollitia voluptatibus nihil, adipisicing elit. Facilis, praesentium</p>
                </div>

                <div className=" m-2 w-60 ">
                    <p className="text-xl font-medium">Company</p>
                    <ul className="mt-2 text-gray-700 text-sm">
                        <li className="my-1">Home</li>
                        <li className="my-1">About us</li>
                        <li className="my-1">Contact Us</li>
                        <li className="my-1">Privacy policy</li>
                    </ul>
                </div>

                <div className="mt-2">
                    <p className=" text-xl font-medium ">GET IN TOUCH</p>
                    <ul className="mt-2 text-gray-700 text-sm">
                        <li className="mt-2">+91 989898441</li>
                        <li  className="mt-1">Prescripto@gmail.com</li>
                    </ul>
                </div>
            </div>
            <div className="flex flex-col items-center justify-center text-gray-700 text-sm my-10">
                <hr />
                <p>Copyright 2025@ Prescripto -All Right Reserved</p>

            </div>
        </div>
    )
}

export default Footer