import React, { useEffect, useState } from 'react';
import assets from '../assets/assets';

function MyAppointment() {
  const [appointments, setAppointments] = useState([]);

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("appointments")) || [];
    setAppointments(data);
  }, []);

  return (
    <div>
      <p className="pb-3 mt-12 font-medium text-zinc-700 border-b border-gray-300">My Appointment</p>

      {appointments.length === 0 ? (
        <p className="text-sm text-gray-600 mt-4">No appointments booked yet.</p>
      ) : (
        appointments.map((item, index) => (
          <div
            className="grid grid-cols-[1fr_2fr] gap-4 sm:flex sm:gap-6 py-2 border-b border-gray-300"
            key={index}
          >
            <div>
              <img className="bg-indigo-50 w-32" src={item.doctorImage} alt="" />
            </div>
            <div className="flex-1 text-sm text-zinc-700">
              <p className="text-neutral-800 font-semibold">{item.doctorName}</p>
              <p className="text-sm">Appointment Booked</p>
              <p className="text-neutral-800 font-semibold mt-1">Date & Time:</p>
              <p className="text-xs mt-1">{item.date} | {item.time}</p>
            </div>
            <div className="flex flex-col justify-end">
              <button className="text-sm text-stone-500 text-center sm:min-w-48 py-2 border border-gray-400 hover:bg-blue-600 hover:text-white transition-all duration-300">
                Pay online
              </button>
              <button
                className="text-sm text-stone-500 text-center sm:min-w-48 py-2 border mt-1 border-gray-400 hover:bg-red-600 hover:text-white transition-all duration-300"
                onClick={() => {
                  const updated = appointments.filter((_, i) => i !== index);
                  localStorage.setItem("appointments", JSON.stringify(updated));
                  setAppointments(updated);
                }}
              >
                Cancel appointment
              </button>
            </div>
          </div>
        ))
      )}
    </div>
  );
}

export default MyAppointment;
