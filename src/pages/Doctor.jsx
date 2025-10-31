import React, { useState, useContext, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { AppContext } from '../context/AppContext'

function Doctor() {
  const { speciality } = useParams();
  const { doctors } = useContext(AppContext);
  const [filterDoc, setFilterDoc] = useState([]);
  const[filter,setFilter]=useState(false);
  const navi = useNavigate();

  const applyFilter=()=>{
    if(speciality)
    {
      setFilterDoc(doctors.filter(doc => doc.speciality === speciality));
    } else {
      setFilterDoc(doctors);
    }
  }
  useEffect(() => {
    applyFilter();

  },[doctors,speciality])
  return (
    <div>
      <p className="text-gray-600">Browse through the doctors specialist</p>
      <button className={`px-5 mt-2 py-2 border border-gray-600 rounded text-sm text-gray-600 transition-all sm:hidden ${filter?"bg-blue-600 text-white":""}`} onClick={()=>setFilter(prev=>!prev)}>Filter</button>
      <div className="flex flex-col sm:flex-row item-start mt-5">
        
        <div className={`flex flex-col gap-4 text-sm text-gray-600 ${filter ? "flex" : "hidden sm:flex"}`}>
          <p onClick={()=>speciality==='General physician'?navi('/doctors'):navi('/doctors/General physician')} className={`w-[94vw] sm:w-auto pl-3 py-1.5 pr-16 border border-gray-300 rounded transition-all cursor-pointer ${speciality==="General physician"?"bg-indigo-100 text-black":""}`}>General physician</p>
          <p onClick={()=>speciality==='Gynecologist'?navi('/doctors'):navi('/doctors/Gynecologist')}  className={`w-[94vw] sm:w-auto pl-3 py-1.5 pr-16 border border-gray-300 rounded transition-all cursor-pointer ${speciality==="Gynecologist"?"bg-indigo-100 text-black":""}`}>Gynecologist</p>
          <p onClick={()=>speciality==='Dermatologist'?navi('/doctors'):navi('/doctors/Dermatologist')} className={`w-[94vw] sm:w-auto pl-3 py-1.5 pr-16 border border-gray-300 rounded transition-all cursor-pointer ${speciality==="Dermatologist"?"bg-indigo-100 text-black":""}`}>Dermatologist</p>
          <p onClick={()=>speciality==='Pediatricians'?navi('/doctors'):navi('/doctors/Pediatricians')} className={`w-[94vw] sm:w-auto pl-3 py-1.5 pr-16 border border-gray-300 rounded transition-all cursor-pointer ${speciality==="Pediatricians"?"bg-indigo-100 text-black":""}`}>Pediatrician</p>
          <p onClick={()=>speciality==='Neurologist'?navi('/doctors'):navi('/doctors/Neurologist')} className={`w-[94vw] sm:w-auto pl-3 py-1.5 pr-16 border border-gray-300 rounded transition-all cursor-pointer ${speciality==="Neurologist"?"bg-indigo-100 text-black":""}`}>Neurologist</p>
          <p onClick={()=>speciality==='Gastroenterologist'?navi('/doctors'):navi('/doctors/Gastroenterologist')} className={`not-last:w-[94vw] sm:w-auto pl-3 py-1.5 pr-16 border border-gray-300 rounded transition-all cursor-pointer ${speciality==="Gastroenterologist"?"bg-indigo-100 text-black":""}`}>Gastroenterologist</p>
       
        </div>
        <div className="w-full grid grid-cols-1 mt-5  sm:grid-cols-2 md:grid-cols-4 gap-4  gap-y-6 px-3 md:ml-3 md:mt-0 sm:px-0 ">
          {
            filterDoc.map((item, index) => (
              <div onClick={() => navi(`/my-appointment/${item._id}`)} className="border border-blue-200 rounded-xl overflow-hidden cursor-pointer hover:-translate-y-2 transition-all duration-500" key={index}>
                <img className="bg-blue-100" src={item.image} alt="" />
                <div className="p-4">
                  <div className="flex items-center gap-2 text-sm text-center text-green-500">
                    <p className="w-2 h-2 bg-green-500 rounded-full "></p>
                    <p>Available</p>
                  </div>
                  <p className="text-gray-900 text-md font-medium">{item.name}</p>
                  <p className="text-gray-900 text-sm">{item.speciality}</p>
                </div>
              </div>
            ))
          }
        </div>
      </div>
    </div>
  )
}

export default Doctor