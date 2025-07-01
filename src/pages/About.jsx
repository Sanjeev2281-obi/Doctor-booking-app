import React from 'react'
import assets from '../assets/assets'

function About() {
  return (
    <div>
      <div className="text-center text-2xl pt-10 text-gray-500 font-medium">
        <p>About<span className="text-gray-700 font-medium mx-2">US</span></p>
      </div>

      <div className="my-10 flex flex-col md:flex-row gap-12">
        <img className="w-full md:max-w-[390px]"src={assets.about_image} alt="" />
        <div className="flex flex-col justify-center gap-6 md:w-2/4  text-gray-600">
          <p>At Prescripto, we believe that healthcare should be simple, accessible, and stress-free. Our platform bridges the gap between patients and doctors by offering a smooth and secure way to book appointments online. Whether you're seeking a general physician, specialist, or pediatrician — Prescripto helps you find the right doctor in just a few clicks.</p>
          <p> Prescripto allows patients to view doctor profiles, check availability, and schedule appointments from the comfort of their home. We focus on making the experience fast and reliable, so you spend less time waiting and more time getting care. Doctors also benefit from a better-managed calendar and increased visibility.</p>
          <b>Our Vision</b>
          <p>We're more than just a booking tool — we're a healthcare partner. Our mission is to use technology to simplify access to medical care for everyone. With Prescripto, your health is always a priority, and trusted care is always within reach.</p>
        </div>
      </div>
      <p className="text-gray-600 font-medium text-xl my-5">WHY<span className="text-gray-800 mx-2">CHOOSE US</span></p>
      <div className="flex flex-col md:flex-row">
        
        <div className="flex flex-col  p-5 rounded border border-gray-300">
          <b className="mb-1 text-xl">Efficiency:</b>
          <p>Instantly book appointments and avoid long wait times.</p>
        </div>
         <div className="flex flex-col  p-5 rounded border border-gray-300 ">
          <b className="mb-1 text-xl">Convenience:</b>
          <p>Access trusted doctors anytime, from anywhere.</p>
        </div>
         <div className="flex flex-col  p-5 rounded border border-gray-300">
          <b className="mb-1 text-xl">Personalization:</b>
          <p>Get tailored doctor suggestions based on your needs.</p>
        </div>
      </div>
    </div>
  )
}

export default About