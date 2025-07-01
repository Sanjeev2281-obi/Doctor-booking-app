import React, { useState } from 'react'
import assets from '../assets/assets';

function MyProfile() {

  const [user, setUser] = useState(
    {
      name: "Sanjeev",
      email: "sanjeevasas2281@gmail.com",
      phone: "+91 3548820384",
      address: {
        line1: "House No 123, Street No 4",
        line2: "Near City Park",
      },
      image: assets.profile_pic,
      gender: "Male",
      dob: "1999-01-01",
    }
  );
  const [isEdit, setIsedit] = useState(true);
  return (
    <div className="max-lg flex flex-col gap-2 text-sm">
      <img className="w-36 rounded"src={user.image} alt="" />
      {
        isEdit
          ? <input className="bg-gray-50 text-2xl font-medium max-w-60 mt-4"type="text" value={user.name} onChange={(e) => setUser(prev => ({ ...prev, name: e.target.value }))} />
          : <p className="font-medium text-2xl text-neutral-800 mt-4">{user.name}</p>


      }
      <hr className="bg-zinc-400 h-[1px] border-none"/>
      <div>
        <p className="text-neutral-500 underline mt-3">CONTACT INFORMATION</p>
        <div className="grid grid-cols-[1fr_3fr] gap-y-2.5 mt-3 text-neutral-700">
          <p className="font-medium">Email Id:</p>
          <p className="text-blue-500">{user.email}</p>
          <p  className="font-medium">Phone:</p>
          {
            isEdit
              ? <input className="bg-gray-200 max-w-47"type="text" value={user.phone} onChange={(e) => setUser(prev => ({ ...prev, phone: e.target.value }))} />
              : <p className="text-blue-400">{user.phone}</p>

          }
          <p className="font-medium">Address:</p>
          {
            isEdit ?
              <p>
                <input className="bg-gray-100 " onChange={(e) => setUser(prev => ({ ...prev.address, line1: e.target.value }))} value={user.address.line1} type="text" />
                <br />
                <input className="bg-gray-100 mt-0.5"onChange={(e) => setUser(prev => ({ ...prev.address, line2: e.target.value }))} value={user.address.line2} type="text" />
              </p> :
              <p className="text-gray-500">
                {user.address.line1}
                <br />
                {user.address.line2}
              </p>
          }
        </div>
      </div>
      <div>
        <p  className="text-neutral-500 underline mt-3">BASIC INFORMATION</p>
        <div className="grid grid-cols-[1fr_3fr] gap-y-2.5 mt-3 text-neutral-600">
          <p className="font-medium">Gender:</p>
          {
            isEdit
              ? <select className="m-w-20 w-48 bg-gray-100" onChange={(e) => setUser(prev => ({ ...prev, gender: e.target.value }))} value={user.gender}>
                <option value="Male">Male</option>
                <option value="Felmale">Felmale</option>
              </select>
              : <p className="text-gray-400">{user.gender}</p>

          }
         
          <p classname="font-medium">Birthday:</p>
          {
            isEdit
              ? <input className="w-48 bg-gray-100" type="date" onChange={(e) => setUser(prev => ({ ...prev, dob: e.target.value }))} value={user.dob} />
              : <p className="text-gray-400">{user.dob}</p>

          }
        
        </div>
        <div className="mt-10 ">
         {
          isEdit ?
            <button className="border border-blue-800 px-8 py-2 rounded-full hover:bg-blue-600 hover:text-white transition-all"onClick={() => setIsedit(false)}>Save information</button> :
            <button  className="border border-blue-800 px-8 py-2 rounded-full hover:bg-blue-600 hover:text-white transition-all" onClick={() => setIsedit(true)}>Edit</button>
        }
        </div>
      </div>
    </div>
  )
}

export default MyProfile