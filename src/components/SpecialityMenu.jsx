import React from 'react'
import { specialityData } from '../assets/assets'
import { Link } from 'react-router-dom'

function SpecialityMenu() {
    return (
        <div className="flex flex-col  gap-4 py-16 text-gray-800 items-center" id='speciality'>
            <h1 className="font-medium text-3xl">Find by Speciality</h1>
            <p className="sd:w-1/3  text-center text-sm">Simple browse through our extensive list of trusted doctor , schedule your appointment hassle-free.</p>
            <div className="flex sm:justify-center gap-4 pt-5 w-full overflow-scroll">
                {specialityData.map((item,index)=>(
                    <Link onClick={()=>scroll(0,0)}className="flex flex-col items-center text-xs cursor-pointer flex-shrink-0 hover:translate-y-[-10px] transition-all duration-500"key={index}to={`/doctors/${item.speciality}`}>
                        <img className="w-16 sm-w-24 mb-2" src={item.image} alt="" />
                        <p className="">{item.speciality}</p>
                    </Link>
                    
                ))}
            </div>
        </div>
    )
}

export default SpecialityMenu