import React, { useContext, useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import assets from '../assets/assets'
import { AppContext } from '../context/AppContext'
import RelatedDoctor from '../components/RelatedDoctor'
import { useNavigate } from 'react-router-dom'
function Appointment() {
    const { docId } = useParams()
    const { doctors, currency } = useContext(AppContext)
    const daysOfWeek = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"]
    const [docInfo, setDocInfo] = useState(null)
    const [docSlot, setDocSlot] = useState([])
    const [slotIndex, setSlotIndex] = useState(0)
    const [slotTime, setSlotTime] = useState("")
    const [isAuthenticated, setIsAuthenticated] = useState(null);
    const navigate = useNavigate();

    const getAvailableSlots = () => {


        setDocSlot([])
        let today = new Date()
        let allSlots = []
        for (let i = 0; i < 7; i++) {
            let currentDate = new Date(today)
            currentDate.setDate(currentDate.getDate() + i)

            let endTime = new Date(currentDate)
            endTime.setHours(21, 0, 0, 0)

            if (today.getDate() === currentDate.getDate()) {
                currentDate.setHours(currentDate.getHours() > 10 ? currentDate.getHours() + 1 : 10)
                currentDate.setMinutes(currentDate.getMinutes() > 30 ? 30 : 0)
            } else {
                currentDate.setHours(10)
                currentDate.setMinutes(0)
            }
            let timeSlots = []
            while (currentDate <= endTime) {
                let formattedTime = currentDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
                timeSlots.push({
                    datetime: new Date(currentDate),
                    time: formattedTime
                })
                currentDate.setMinutes(currentDate.getMinutes() + 30)
            }
            allSlots.push(timeSlots)
        }
        setDocSlot(allSlots)
    }

    useEffect(() => {
        const doc = doctors.find((doc) => doc._id === docId)
        setDocInfo(doc)
    }, [docId, doctors])





    useEffect(() => {
        if (docInfo) {
            getAvailableSlots()
        }
    }, [docInfo])

    useEffect(() => {
        console.log(docSlot)
    }, [docSlot])
    const handleBooking = async () => {
        const user = JSON.parse(localStorage.getItem("loggedInUser"));
        if (!user || !user.email) {
            alert("You must be logged in to book an appointment.");
            navigate("/login");
            return;
        }

        if (!slotTime) {
            alert("Please select a slot");
            return;
        }

        if (!docSlot[slotIndex] || !docSlot[slotIndex][0]) {
            alert("No slot selected");
            return;
        }

        const appointment = {
            userEmail: user.email,
            doctorName: docInfo.name,
            doctorImage: docInfo.image,
            date: docSlot[slotIndex][0].datetime.toDateString(),
            time: slotTime,
            status: "unpaid",
        };

        try {
            const res = await fetch("http://localhost:8080/api/appointments", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(appointment),
            });

            if (res.ok) {
                alert("Appointment booked successfully!");
            } else {
                alert("Booking failed!");
            }
        } catch (err) {
            console.error(err);
            alert("Error connecting to backend.");
        }
    };

    return docInfo && (
        <>
            <div>
                <div className="flex flex-col sm:flex-row  gap-5">
                    <div>
                        <img className="bg-blue-600 w-full sm:max-w-72 rounded-lg" src={docInfo.image} alt="" />
                    </div>
                    <div className="flex-1 border border-gray-400 rounded-lg p-5 py-7 bg-white mx-2 sm:mx-0 mt-[-80px] sm:mt-0 ">
                        <p className="flex items-center gap-2 text-2xl font-medium text-gray-900">{docInfo.name} <img className="w-5" src={assets.verified_icon} alt="" /></p>
                        <div className="flex items-center gap-2 text-sm mt-1 text-gray-600 ">
                            <p>{docInfo.degree} - {docInfo.speciality}</p>
                            <button className="text-xs rounded-full py-0.5 px-2 border">{docInfo.experience}</button>
                        </div>
                        <div >
                            <p className="flex items-center gap-1 text-sm font medium text-gray-900 mt-3">About <img src={assets.info_icon} alt="" /></p>
                            <p className="text-sm text-gray-500 max-w-[700px] mt-1">{docInfo.about}</p>
                        </div>
                        <p className="text-gray-500 font-medium mt-4">Appointment fee:<span className="text-gray-600 ">{currency}{docInfo.fees}</span></p>
                    </div>
                </div>

                <div className="sm:ml-72 sm:pl-4 mt-4 font-medium text-gray-900">
                    <p>Booking Slots</p>
                    <div className="flex gap-3 items-center w-full overflow-x-scroll mt-4">
                        {
                            docSlot.length > 0 && docSlot.map((item, index) => (
                                <div
                                    onClick={() => setSlotIndex(index)}
                                    className={`text-center py-5 min-w-16 rounded-full cursor-pointer ${slotIndex === index ? "bg-blue-700 text-white" : "border border-gray-300"}`}
                                    key={index}
                                >
                                    <p>{item[0] && daysOfWeek[item[0].datetime.getDay()]}</p>
                                    <p>{item[0] && item[0].datetime.getDate()}</p>
                                </div>
                            ))

                        }
                    </div>
                    <div style={{}}>
                        <div className="flex items-center gap-3 w-full overflow-x-scroll whitespace-nowrap mt-4">
                            {docSlot.length > 0 &&
                                docSlot[slotIndex].map((item, index) => (
                                    <p
                                        onClick={() => setSlotTime(item.time)}
                                        className={`text-sm font-light flex-shrink-0 px-5 py-2 rounded-full cursor-pointer ${item.time === slotTime ? "bg-blue-600 text-white" : "text-gray-700 border border-gray-300"}`}
                                        key={index}
                                    >
                                        {item.time.toLowerCase()}
                                    </p>
                                ))}
                        </div>
                        <button
                            className="bg-blue-700 cursor-pointer text-white text-sm font-light px-14 py-3 rounded-full my-6"
                            onClick={handleBooking}
                        >
                            Book an Appointment
                        </button>
                    </div>
                </div>
            </div>
            <RelatedDoctor docId={docId} speciality={docInfo.speciality} />
        </>
    )
}

export default Appointment