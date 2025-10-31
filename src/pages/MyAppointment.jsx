import React, { useEffect, useState } from 'react';

function MyAppointment() {
  const [appointments, setAppointments] = useState([]);

  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL

  
  const fetchAppointments = async () => {
    const user = JSON.parse(localStorage.getItem("loggedInUser"));
    if (!user || !user.email) {
      console.log("No logged-in user found");
      return;
    }

    try {
      const res = await fetch(`${API_BASE_URL}/api/appointments/${user.email}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json"
        },
      });

      if (!res.ok) {
        const msg = await res.text();
        console.error("Failed to fetch appointments:", msg);
        return;
      }

      const data = await res.json();
      setAppointments(data);
    } catch (err) {
      console.error("Error fetching appointments:", err);
      alert("Error connecting to backend.");
    }
  };

  // Cancel appointment
  const handleCancel = async (id) => {
    try {
      const res = await fetch(`${API_BASE_URL}/api/appointments/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json"
        },
      });

      if (res.ok) {
        alert("Appointment cancelled!");
        fetchAppointments();
      } else {
        const msg = await res.text();
        console.error("Failed to cancel:", msg);
        alert("Failed to cancel!");
      }
    } catch (err) {
      console.error("Error cancelling appointment:", err);
      alert("Error connecting to backend.");
    }
  };

  useEffect(() => {
    fetchAppointments();
  }, []);

  return (
    <div>
      <p className="pb-3 mt-12 font-medium text-zinc-700 border-b border-gray-300">My Appointment</p>

      {appointments.length === 0 ? (
        <p className="text-sm text-gray-600 mt-4">No appointments booked yet.</p>
      ) : (
        appointments.map((item) => (
          <div key={item.id} className="grid grid-cols-[1fr_2fr] gap-4 sm:flex sm:gap-6 py-2 border-b border-gray-300">
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
                onClick={() => handleCancel(item.id)}
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
