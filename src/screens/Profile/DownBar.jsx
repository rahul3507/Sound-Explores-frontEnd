import React from 'react'
import { Link } from 'react-router-dom';

export const DownBar = () => {
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
    <div>
        {/* Logout Modal */}
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
  )
}
