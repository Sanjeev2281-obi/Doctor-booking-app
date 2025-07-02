import React, { useEffect, useState } from 'react';
import assets from '../assets/assets';

function MyProfile() {
  const [user, setUser] = useState({
    name: "",
    email: "",
    phone: "",
    address: { line1: "", line2: "" },
    image: assets.profile_pic,
    gender: "Male",
    dob: "",
  });
  const [isEdit, setIsEdit] = useState(false);

  useEffect(() => {
    const loggedUser = JSON.parse(localStorage.getItem("loggedInUser"));
    if (loggedUser) {
      setUser(prev => ({ ...prev, ...loggedUser }));
    }
  }, []);

  const saveChanges = () => {
    setIsEdit(false);
    localStorage.setItem("loggedInUser", JSON.stringify(user));
    alert("Profile updated successfully!");
  };

  return (
    <div className="max-lg flex flex-col gap-2 text-sm">
      <img className="w-36 rounded" src={user.image} alt="profile" />
      {
        isEdit
          ? <input className="bg-gray-50 text-2xl font-medium max-w-60 mt-4" type="text" value={user.name} onChange={(e) => setUser(prev => ({ ...prev, name: e.target.value }))} />
          : <p className="font-medium text-2xl text-neutral-800 mt-4">{user.name}</p>
      }

      <hr className="bg-zinc-400 h-[1px] border-none" />

      <div>
        <p className="text-neutral-500 underline mt-3">CONTACT INFORMATION</p>
        <div className="grid grid-cols-[1fr_3fr] gap-y-2.5 mt-3 text-neutral-700">
          <p className="font-medium">Email Id:</p>
          {isEdit
            ? <input className="bg-gray-100" value={user.email} onChange={(e) => setUser(prev => ({ ...prev, email: e.target.value }))} />
            : <p className="text-blue-500">{user.email}</p>}
          
          <p className="font-medium">Phone:</p>
          {isEdit
            ? <input className="bg-gray-100" value={user.phone} onChange={(e) => setUser(prev => ({ ...prev, phone: e.target.value }))} />
            : <p className="text-blue-400">{user.phone}</p>}
          
          <p className="font-medium">Address:</p>
          {isEdit ? (
            <div>
              <input className="bg-gray-100 block" value={user.address.line1} onChange={(e) => setUser(prev => ({ ...prev, address: { ...prev.address, line1: e.target.value } }))} />
              <input className="bg-gray-100 mt-1 block" value={user.address.line2} onChange={(e) => setUser(prev => ({ ...prev, address: { ...prev.address, line2: e.target.value } }))} />
            </div>
          ) : (
            <p>{user.address.line1}<br />{user.address.line2}</p>
          )}
        </div>
      </div>

      <div>
        <p className="text-neutral-500 underline mt-3">BASIC INFORMATION</p>
        <div className="grid grid-cols-[1fr_3fr] gap-y-2.5 mt-3 text-neutral-600">
          <p className="font-medium">Gender:</p>
          {isEdit ? (
            <select className="w-48 bg-gray-100" onChange={(e) => setUser(prev => ({ ...prev, gender: e.target.value }))} value={user.gender}>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
            </select>
          ) : <p>{user.gender}</p>}

          <p className="font-medium">Birthday:</p>
          {isEdit
            ? <input type="date" className="w-48 bg-gray-100" value={user.dob} onChange={(e) => setUser(prev => ({ ...prev, dob: e.target.value }))} />
            : <p>{user.dob}</p>}
        </div>
        <div className="mt-10">
          {
            isEdit
              ? <button onClick={saveChanges} className="border border-blue-800 px-8 py-2 rounded-full hover:bg-blue-600 hover:text-white">Save information</button>
              : <button onClick={() => setIsEdit(true)} className="border border-blue-800 px-8 py-2 rounded-full hover:bg-blue-600 hover:text-white">Edit</button>
          }
        </div>
      </div>
    </div>
  );
}

export default MyProfile;
