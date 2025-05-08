import { useState } from "react";
import {
  ChevronLeft,
  MoreVertical,
  User,
  Crown,
  Lock,
  LogOut,
  ChevronRight,
} from "lucide-react";
import { Link } from "react-router-dom";
import { StatusBar } from "../../../components/common/StatusBar";
import { useAuth } from "../../../contexts/AuthContext";
import { motion } from "framer-motion";

const Profile = () => {
  const { user, signOut } = useAuth();
  const [showLogoutModal, setShowLogoutModal] = useState(false);

  // Toggle logout modal
  const toggleLogoutModal = () => {
    setShowLogoutModal(!showLogoutModal);
  };

  // Handle logout confirmation
  const handleLogout = () => {
    signOut();
    setShowLogoutModal(false);
  };

  return (
    <div className="bg-white flex flex-row justify-center w-full">
      <div className="bg-white w-[375px] h-[812px] relative">
        <StatusBar />

        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b">
          <div className="flex items-center">
            <Link to="/sound-library" className="mr-2">
              <ChevronLeft className="w-6 h-6" />
            </Link>
            <h1 className="text-2xl font-bold">Profile</h1>
          </div>
          <button>
            <MoreVertical className="w-6 h-6" />
          </button>
        </div>

        {/* Profile Info */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="flex flex-col items-center p-6 border-b"
        >
          <div className="relative mb-4">
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="w-32 h-32 rounded-full overflow-hidden"
            >
              <img
                src={user?.avatar || "/profile.png"}
                alt="Profile"
                className="w-full h-full object-cover"
              />
            </motion.div>
            <motion.div
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="absolute bottom-0 right-0 bg-primary p-2 rounded-full"
            >
              <User className="w-5 h-5 text-white" />
            </motion.div>
          </div>
          <h2 className="text-2xl font-bold mb-1">
            {user?.name || "User Name"}
          </h2>
          <p className="text-gray-500 mb-4">
            {user?.email || "user@example.com"}
          </p>
          <div className="w-full border-t border-gray-200"></div>
        </motion.div>

        {/* Menu Items */}
        <div className="px-4">
          {/* Edit Profile */}
          <Link
            to="/edit-profile"
            className="flex items-center justify-between py-2 border-b"
          >
            <div className="flex items-center">
              <div className="p-2 mr-4">
                <User className="w-6 h-6" />
              </div>
              <span className="text-lg font-medium">Edit Profile</span>
            </div>
            <ChevronRight className="w-6 h-6 text-gray-400" />
          </Link>

          {/* Upgrade Plan */}
          <Link
            to="/payment"
            className="flex items-center justify-between py-2 border-b"
          >
            <div className="flex items-center">
              <div className="p-2 mr-4">
                <Crown className="w-6 h-6" />
              </div>
              <span className="text-lg font-medium">Upgrade Plan</span>
            </div>
            <ChevronRight className="w-6 h-6 text-gray-400" />
          </Link>

          {/* Privacy Policy */}
          <Link
            to="/privacy-policy"
            className="flex items-center justify-between py-2 border-b"
          >
            <div className="flex items-center">
              <div className="p-2 mr-4">
                <Lock className="w-6 h-6" />
              </div>
              <span className="text-lg font-medium">Privacy Policy</span>
            </div>
            <ChevronRight className="w-6 h-6 text-gray-400" />
          </Link>

          {/* Logout */}
          <motion.div
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="flex items-center py-4 cursor-pointer"
            onClick={toggleLogoutModal}
          >
            <div className="p-2 mr-4">
              <LogOut className="w-6 h-6 text-red-500" />
            </div>
            <span className="text-lg font-medium text-red-500">Logout</span>
          </motion.div>
        </div>

        {/* Logout Modal */}
        {showLogoutModal && (
          <div className="absolute top-0 w-[375px] h-full inset-0 bg-black bg-opacity-50 flex items-end justify-center z-50">
            <motion.div
              initial={{ y: 300 }}
              animate={{ y: 0 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="bg-white w-full rounded-t-xl"
            >
              <div className="flex flex-col items-center">
                {/* Drag handle */}
                <div className="w-12 h-1 bg-gray-300 rounded-full my-3"></div>

                {/* Modal content */}
                <div className="w-full p-6">
                  <h3 className="text-2xl font-bold text-red-500 text-center mb-6">
                    Logout
                  </h3>

                  <div className="border-t border-gray-200 mb-6"></div>

                  <p className="text-xl text-center mb-8">
                    Are you sure you want to log out?
                  </p>

                  <div className="flex gap-4">
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={toggleLogoutModal}
                      className="flex-1 py-4 px-6 bg-gray-100 rounded-full text-black font-medium"
                    >
                      Cancel
                    </motion.button>

                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={handleLogout}
                      className="flex-1 py-4 px-6 bg-red-500 rounded-full text-white font-medium"
                    >
                      Yes, Logout
                    </motion.button>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Profile;
