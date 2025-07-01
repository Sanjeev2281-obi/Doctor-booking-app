import React from 'react'
import Navbar from './components/Navbar'
import { Outlet, useLocation } from 'react-router-dom'
import './index.css'
import Footer from './components/Footer';

function App() {

  const location=useLocation();
  const ignore=["/login"];
  return (
    <div className="mx-4 sm:mx-[10%]" >
      <Navbar />
      <Outlet />
      {!ignore.includes(location.pathname) && <Footer />}
    </div>
  );
}
export default App;
