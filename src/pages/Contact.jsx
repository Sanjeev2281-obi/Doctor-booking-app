import React from 'react'
import assets from '../assets/assets'

function Contact() {
  return (

    <div>
      <div className="text-center text-xl pt-10 text-gray-500 font-medium">
        <p>CONTACT<span className="text-gray-800 mx-3">US</span></p>
      </div>

      <div className="my-10 flex flex-col justify-center md:flex-row gap-10 mb-10 ">
        <img className="w-full  md:w-[370px] " src={assets.contact_image} alt="" />
        <div className="flex flex-col gap-6 text-gray-600 justify-center">
          <p className=" text-xl font-semibold text-gray-800">Our Office</p>
          <p>54709 Willms Station<br />Suite 350, washintonm, USA</p>
          <p>Tel:(321)444-6666<br />Email: prescripto@gmail.com</p>
          <p className=" text-xl font-semibold text-gray-800">Career at Prescripto</p>
          <p>Learn more about term and job openings.</p>
          <button className="border border-black px-2 py-3 text-sm hover:bg-black hover:text-white transition-all duration-500">Explore job</button>
        </div>
      </div>

    </div>

  )
}

export default Contact