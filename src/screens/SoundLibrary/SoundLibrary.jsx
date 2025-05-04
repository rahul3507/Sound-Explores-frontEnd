import React, { useState, useRef, useEffect } from "react";
import { Search, Menu, User } from "lucide-react";
import { Button } from "../../components/ui/button";
import { Checkbox } from "../../components/ui/checkbox";
import { Input } from "../../components/ui/input";
import { Link } from "react-router-dom";
import SoundList from "./SoundList/SoundList";
import SideBar from "./SideBar";

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
  
  // Handle logout
  const handleLogout = () => {
    console.log("Logging out");
    // Implement logout functionality
  };

  // Add event listener for clicks
  useEffect(() => {
    document.addEventListener("mousedown", handleOutsideClick);
    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, [sidebarOpen]);

  return (
    <div className="bg-white flex h-screen w-full overflow-hidden">
      {/* Sidebar */}
      <div 
        ref={sidebarRef}
        className={`fixed md:relative z-20 bg-gray-900 text-white w-64 h-full transition-transform duration-300 ease-in-out ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <SideBar/>
        {/* <div className="flex w-full flex-col h-full">
          <div className="p-5 border-b border-gray-800">
            <h1 className="text-xl font-bold">App Name</h1>
          </div>
          
          <nav className="flex-1 w-full p-4">
            <ul className="space-y-4 ">
              <li>
                <Link
                  to='/sound-library' 
                  className="w-full text-left px-4 py-3 rounded-md hover:bg-gray-800 transition-colors">
                  Sound
                </Link>
              </li>
              <li>
                <button className="w-full text-left px-4 py-3 rounded-md hover:bg-gray-800 transition-colors">
                  Friend
                </button>
              </li>
            </ul>
          </nav>
          
          <div className="p-4 mt-auto">
            <button 
              onClick={handleLogout}
              className="w-full text-left px-4 py-3 hover:bg-gray-800 transition-colors"
            >
              Log Out
            </button>
          </div>
        </div> */}
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
            <button className="p-2">
              <User className="w-6 h-6 text-black" />
            </button>
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