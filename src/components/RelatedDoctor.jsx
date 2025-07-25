import React, { useContext, useEffect, useState } from 'react'
import { AppContext } from '../context/AppContext'
import { useNavigate } from 'react-router-dom'

function RelatedDoctor({ speciality, docId }) {
    const { doctors } = useContext(AppContext); 
    const [relDoc, setRelDocs] = useState([]);
    const navi = useNavigate();

    useEffect(() => {
        if (doctors && speciality) {
            const doctorData = doctors.filter((doc) => doc.speciality === speciality && doc._id !== docId);
            setRelDocs(doctorData);
        }
    }, [doctors, speciality, docId]);

    return (
        <div className="flex flex-col items-center gap-4 my-16 text-gray-800 md:mx-6">
            <h1 className="text-3xl font-medium">Top Doctors to Book</h1>
            <p className="sm:w-1/3 text-center text-sm">Simply browse through our extensive list of trusted doctors.</p>
            <div className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 pt-5 gap-y-6 px-3 sm:px-0">
                {relDoc.slice(0, 5).map((item, index) => (
                    <div onClick={() => {navi(`/my-appointment/${item._id}`),scrollTo(0,0)}} className="border border-blue-200 rounded-xl overflow-hidden cursor-pointer hover:-translate-y-2 transition-all duration-500" key={index}>
                        <img className="bg-blue-100" src={item.image} alt="" />
                        <div className="p-4">
                            <div className="flex items-center gap-2 text-sm text-center text-green-500">
                                <p className="w-2 h-2 bg-green-500 rounded-full "></p>
                                <p>Available</p>
                            </div>
                            <p className="text-gray-900 text-lg font-medium">{item.name}</p>
                            <p className="text-gray-900 text-sm">{item.speciality}</p>
                        </div>
                    </div>
                ))}
            </div>
            <button onClick={() => { navi('/doctors') }} className="bg-blue-100 text-gray-900 px-10 py-3 rounded-full mt-10">more</button>
        </div>
    )
}

export default RelatedDoctor