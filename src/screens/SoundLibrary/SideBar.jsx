
import React, { useState } from 'react'
import { Link } from 'react-router-dom'

const SideBar = ({ onTitleChange,onSoundListChange }) => {

  const [activeButton, setActiveButton] = useState(1);
    // Handle logout
  const handleLogout = () => {
    console.log("Logging out");
    // Implement logout functionality
  };

  const handleSoundButtonClick = (button) => {
    onTitleChange("Sound Library");
    onSoundListChange(true);
    setActiveButton(button);
  };
  const handleFriendButtonClick = (button) => {
    onTitleChange("Friend Library");
    onSoundListChange(false);
    setActiveButton(button);
  }

  return (
    <div className="flex w-full flex-col h-full">
              <div className="p-5 border-b border-gray-800">
                <h1 className="text-xl font-bold">App Name</h1>
              </div>
              
              <nav className="flex-1 w-full p-4">
                <ul className="space-y-4 ">
                  <li>
                    <button
                      onClick={() =>handleSoundButtonClick(1)}
                      // className="w-full `${onSoundListChange ? 'bg-white text-black' : 'bg-black text-white'}` text-left px-4 py-3 rounded-md hover:bg-gray-800 "
                      className={`px-4 py-2 rounded-md w-full text-left 
                        ${activeButton === 1 ? 'bg-white text-black' : 'bg-black text-white'}`}
                      >
                      Sound
                    </button>
                  </li>
                  <li>
                    <button 
                      onClick={() =>handleFriendButtonClick(2)}
                      className={`px-4 py-2 rounded-md w-full text-left 
                        ${activeButton === 2 ? 'bg-white text-black' : 'bg-black text-white'}`}
                      >
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