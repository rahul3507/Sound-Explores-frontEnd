
import React from 'react'
import { Link } from 'react-router-dom'

const SideBar = () => {

    // Handle logout
  const handleLogout = () => {
    console.log("Logging out");
    // Implement logout functionality
  };

  return (
    <div className="flex w-full flex-col h-full">
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
                <Link
                  to='/' 
                  onClick={handleLogout}
                  className="w-full text-left px-4 py-3 hover:bg-gray-800 transition-colors"
                >
                  Log Out
                </Link>
              </div>
            </div>
  )
}

export default SideBar