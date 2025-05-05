import React, { useState } from "react";
import { ChevronLeft, MoreVertical, Pencil, User, Crown, Lock, LogOut, CreditCard, ChevronRight, Settings } from "lucide-react";
import { Link } from "react-router-dom";
import { DownBar } from "./DownBar";

const Profile = () => {
  // State for logout modal
  const [showLogoutModal, setShowLogoutModal] = useState(false);

  // Toggle logout modal
  const toggleLogoutModal = () => {
    setShowLogoutModal(!showLogoutModal);
  };

  // Handle logout confirmation
  const handleLogout = () => {
    console.log("Logging out...");
    // Implement actual logout functionality here
    // For example: authService.logout() or similar
    setShowLogoutModal(false);
  };

  return (
    <div className="bg-white mt-12 flex flex-row justify-center w-full">
      <div className="bg-white w-[375px] h-[812px] relative">
        {/* Header */}
      <div className="flex items-center justify-between p-4 border-b">
        <div className="flex items-center">
          <Link
            to="/sound-library"
           className="mr-2">
            <ChevronLeft className="w-6 h-6" />
          </Link>
          <h1 className="text-2xl font-bold">Profile</h1>
        </div>
        <button>
          <MoreVertical className="w-6 h-6" />
        </button>
      </div>

      {/* Profile Info */}
      <div className="flex flex-col items-center p-6 border-b">
        <div className="relative mb-4">
          <div className="w-32 h-32 rounded-full overflow-hidden">
            <img 
              src="./img/profile.png" 
              alt="Profile" 
              className="w-full h-full object-cover"
            />
          </div>
          <div className="absolute bottom-0 right-0 bg-pink-500 p-2 rounded-full">
            <Pencil className="w-5 h-5 text-white" />
          </div>
        </div>
        <h2 className="text-2xl font-bold mb-1">Daniel Austin</h2>
        <p className="text-gray-500 mb-4">daniel_austin@yourdomain.com</p>
        <div className="w-full border-t border-gray-200"></div>
      </div>

      {/* Menu Items */}
      <div className="px-4">
        {/* Edit Profile */}
        <Link
            to="/edit-profile"
            className="flex items-center justify-between py-2 border-b">
          <div className="flex items-center">
            <div className="p-2 mr-4">
              <User className="w-6 h-6" />
            </div>
            <span className="text-lg font-medium">Edit Profile</span>
          </div>
          <ChevronRight className="w-6 h-6 text-gray-400" />
        </Link>

        {/* Upgrade Plan */}
        <div className="flex items-center justify-between py-2 border-b">
          <div className="flex items-center">
            <div className="p-2 mr-4">
              <Crown className="w-6 h-6" />
            </div>
            <span className="text-lg font-medium">Upgrade Plan</span>
          </div>
          <ChevronRight className="w-6 h-6 text-gray-400" />
        </div>

        

        {/* Privacy Policy */}
        <Link
            to="/privacy-policy"
            className="flex items-center justify-between py-2 border-b">
          <div className="flex items-center">
            <div className="p-2 mr-4">
              <Lock className="w-6 h-6" />
            </div>
            <span className="text-lg font-medium">Privacy Policy</span>
          </div>
          <ChevronRight className="w-6 h-6 text-gray-400" />
        </Link>

        {/* Logout */}
        <div 
          className="flex items-center py-4 cursor-pointer"
          onClick={toggleLogoutModal}
        >
          <div className="p-2 mr-4">
            <LogOut className="w-6 h-6 text-red-500" />
          </div>
          <span className="text-lg font-medium text-red-500">Logout</span>
        </div>
      </div>

      {showLogoutModal && (
        <div className="absolute top-0 w-[375px] h-full  inset-0 bg-black bg-opacity-50 flex items-end justify-center z-50">
          <div className="bg-white w-full rounded-t-xl">
            <div className="flex flex-col items-center">
              {/* Drag handle */}
              <div className="w-12 h-1 bg-gray-300 rounded-full my-3"></div>
              
              {/* Modal content */}
              <div className="w-full p-6">
                <h3 className="text-2xl font-bold text-red-500 text-center mb-6">Logout</h3>
                
                <div className="border-t border-gray-200 mb-6"></div>
                
                <p className="text-xl text-center mb-8">Are you sure you want to log out?</p>
                
                <div className="flex gap-4">
                  <button 
                    onClick={toggleLogoutModal}
                    className="flex-1 py-4 px-6 bg-gray-100 rounded-full text-black font-medium"
                  >
                    Cancel
                  </button>
                  
                  <Link
                    to="/" 
                    onClick={handleLogout}
                    className="flex-1 py-4 px-6 bg-red-500 rounded-full text-white font-medium"
                  >
                    Yes, Logout
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      </div>
    </div>
  );
};

export default Profile;