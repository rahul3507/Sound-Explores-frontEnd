import React, { useState, useRef, useEffect } from "react";
import { Menu, User } from "lucide-react";
import SoundList from "./SoundList/SoundList";
import SideBar from "./SideBar";
import { Link } from "react-router-dom";

const SoundLibrary = () => {
  // State for sidebar visibility
  const [sidebarOpen, setSidebarOpen] = useState(false);
  
  // Ref for detecting clicks outside sidebar
  const sidebarRef = useRef(null);
  const mainContentRef = useRef(null);
  
  
  // Toggle sidebar
  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };
  
  // Close sidebar when clicking outside
  const handleOutsideClick = (e) => {
    if (
      sidebarOpen && 
      sidebarRef.current && 
      mainContentRef.current &&
      !sidebarRef.current.contains(e.target) && 
      mainContentRef.current.contains(e.target)
    ) {
      setSidebarOpen(false);
    }
  };
  


  // Add event listener for clicks
  useEffect(() => {
    document.addEventListener("mousedown", handleOutsideClick);
    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, [sidebarOpen]);

  return (
    <div className="bg-white flex justify-center h-screen w-full overflow-hidden">
      {/* Sidebar */}
      <div 
        ref={sidebarRef}
        className={`fixed md:relative z-20 bg-gray-900 text-white w-64 h-full transition-transform duration-300 ease-in-out ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <SideBar/>

      </div>

      {/* Main Content */}
      <div 
        ref={mainContentRef}
        className="bg-white flex flex-row justify-center w-full mt-12"
      >
        <div className="bg-white w-[375px] h-[812px] relative">
          {/* Header */}
          <div className="flex items-center justify-between px-4 py-4 border-b border-gray-100">
            <button className="p-2" onClick={toggleSidebar}>
              <Menu className="w-6 h-6 text-black" />
            </button>
            <h1 className="text-xl font-medium text-center">Sound Library</h1>
            <Link
              to= "/profile"
             className="p-2">
              <User className="w-6 h-6 text-black" />
            </Link>
          </div>

          <SoundList/>

          
        </div>
      </div>
      
      {/* Overlay for mobile when sidebar is open */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-10 md:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}
    </div>
  );
};

export default SoundLibrary;