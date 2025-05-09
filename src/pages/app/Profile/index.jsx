import { useState, useEffect, useRef } from "react";
import {
  ChevronLeft,
  MoreVertical,
  User,
  Crown,
  Lock,
  LogOut,
  ChevronRight,
  Settings,
  Bell,
  HelpCircle,
  Edit2Icon,
} from "lucide-react";
import { Link } from "react-router-dom";
import { StatusBar } from "../../../components/common/StatusBar";
import { useAuth } from "../../../contexts/AuthContext";
import { motion, AnimatePresence } from "framer-motion";

const Profile = () => {
  const { user, signOut } = useAuth();
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const [showOptions, setShowOptions] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [avatar, setAvatar] = useState(user?.avatar || "/profile.png");
  const fileInputRef = useRef(null);

  // Toggle logout modal
  const toggleLogoutModal = () => {
    setShowLogoutModal(!showLogoutModal);
    setShowOptions(false);
  };

  // Toggle options menu
  const toggleOptions = () => {
    setShowOptions(!showOptions);
  };

  // Handle logout confirmation
  const handleLogout = () => {
    signOut();
    setShowLogoutModal(false);
  };

  // Track scroll for shadow effect
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Handle avatar upload
  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setAvatar(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  // Trigger file input click
  const triggerFileInput = () => {
    fileInputRef.current.click();
  };

  return (
    <div className="bg-gray-50 flex flex-row justify-center w-full min-h-screen">
      <div className="bg-white w-full max-w-md relative shadow-md">
        <StatusBar />

        {/* Header */}
        <motion.div
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.3 }}
          className={`flex items-center justify-between p-4 border-b bg-white sticky top-0 z-10 transition-shadow ${
            scrolled ? "shadow-md" : ""
          }`}
        >
          <div className="flex items-center">
            <Link to="/sound-library" >
              <motion.div
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="p-2 rounded-full hover:bg-gray-100 transition-colors"
              >
                <ChevronLeft className="w-5 h-5" />
              </motion.div>
            </Link>
            <h1 className="text-xl font-bold">Profile</h1>
          </div>
          <div className="relative">
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="p-2 rounded-full hover:bg-gray-100 transition-colors"
              onClick={toggleOptions}
            >
              <MoreVertical className="w-5 h-5" />
            </motion.button>

            {/* Dropdown menu */}
            <AnimatePresence>
              {showOptions && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.2 }}
                  className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-100 z-20 overflow-hidden"
                >
                  <div className="py-1">
                    <Link
                      to="/settings"
                      className="flex items-center px-4 py-3 hover:bg-gray-50"
                    >
                      <Settings className="w-4 h-4 mr-3 text-gray-500" />
                      <span className="text-sm font-medium">Settings</span>
                    </Link>
                    <Link
                      to="/notifications"
                      className="flex items-center px-4 py-3 hover:bg-gray-50"
                    >
                      <Bell className="w-4 h-4 mr-3 text-gray-500" />
                      <span className="text-sm font-medium">Notifications</span>
                    </Link>
                    <Link
                      to="/help"
                      className="flex items-center px-4 py-3 hover:bg-gray-50"
                    >
                      <HelpCircle className="w-4 h-4 mr-3 text-gray-500" />
                      <span className="text-sm font-medium">Help Center</span>
                    </Link>
                    <motion.div
                      whileHover={{ backgroundColor: "#fef2f2" }}
                      className="flex items-center px-4 py-3 hover:bg-gray-50 text-red-500 cursor-pointer"
                      onClick={toggleLogoutModal}
                    >
                      <LogOut className="w-4 h-4 mr-3" />
                      <span className="text-sm font-medium">Logout</span>
                    </motion.div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>

        {/* Profile Info */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="flex flex-col items-center p-6 border-b bg-gradient-to-b from-blue-50 to-white"
        >
          <div className="relative mb-5 group">
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="w-28 h-28 rounded-full overflow-hidden ring-4 ring-white shadow-md"
            >
              <img
                src={avatar}
                alt="Profile"
                className="w-full h-full object-cover"
              />
            </motion.div>
            <motion.div
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="absolute bottom-0 right-0 bg-blue-500 p-2 rounded-full shadow-md cursor-pointer transition-all hover:bg-blue-600"
              onClick={triggerFileInput}
            >
              <Edit2Icon className="w-4 h-4 text-white" />
            </motion.div>
            <input
              type="file"
              ref={fileInputRef}
              className="hidden"
              accept="image/*"
              onChange={handleAvatarChange}
            />
          </div>

          <h2 className="text-2xl font-bold mb-1">
            {user?.name || "User Name"}
          </h2>
          <p className="text-xs text-gray-500 mb-2">
            {user?.email || "user@example.com"}
          </p>
          <div className="mb-4 flex items-center bg-blue-50 px-3 py-1 rounded-full">
            <Crown className="w-4 h-4 text-blue-500 mr-1" />
            <span className="text-xs font-medium text-blue-700">
              Premium Member
            </span>
          </div>
          <div className="flex gap-4 w-full justify-center mt-2">
            <Link
              to="/edit-profile"
              className="px-5 py-2 bg-blue-500 text-white rounded-full text-sm font-medium hover:bg-blue-600 transition-colors"
            >
              Edit Profile
            </Link>
            <Link
              to="/stats"
              className="px-5 py-2 bg-gray-100 text-gray-700 rounded-full text-sm font-medium hover:bg-gray-200 transition-colors"
            >
              View Stats
            </Link>
          </div>
        </motion.div>

        {/* Menu Items */}
        <div className="px-4 py-2">
          <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2 px-2">
            Account Settings
          </h3>

          {/* Edit Profile */}
          <Link
            to="/edit-profile"
            className="flex items-center justify-between py-3 px-2 mb-1 rounded-lg hover:bg-gray-50 transition-colors"
          >
            <div className="flex items-center">
              <div className="p-2 mr-4 bg-blue-100 rounded-full">
                <User className="w-5 h-5 text-blue-600" />
              </div>
              <div>
                <span className="text-base font-medium">
                  Personal Information
                </span>
                <p className="text-xs text-gray-500">
                  Update your profile details
                </p>
              </div>
            </div>
            <ChevronRight className="w-5 h-5 text-gray-400" />
          </Link>

          {/* Upgrade Plan */}
          <Link
            to="/payment"
            className="flex items-center justify-between py-3 px-2 mb-1 rounded-lg hover:bg-gray-50 transition-colors"
          >
            <div className="flex items-center">
              <div className="p-2 mr-4 bg-yellow-100 rounded-full">
                <Crown className="w-5 h-5 text-yellow-600" />
              </div>
              <div>
                <span className="text-base font-medium">Subscription</span>
                <p className="text-xs text-gray-500">Manage your plan</p>
              </div>
            </div>
            <div className="flex items-center">
              <span className="text-xs font-medium text-green-600 mr-2">
                Premium
              </span>
              <ChevronRight className="w-5 h-5 text-gray-400" />
            </div>
          </Link>

          {/* Privacy Policy */}
          <Link
            to="/privacy-policy"
            className="flex items-center justify-between py-3 px-2 mb-1 rounded-lg hover:bg-gray-50 transition-colors"
          >
            <div className="flex items-center">
              <div className="p-2 mr-4 bg-purple-100 rounded-full">
                <Lock className="w-5 h-5 text-purple-600" />
              </div>
              <div>
                <span className="text-base font-medium">
                  Privacy & Security
                </span>
                <p className="text-xs text-gray-500">
                  Manage your data and privacy
                </p>
              </div>
            </div>
            <ChevronRight className="w-5 h-5 text-gray-400" />
          </Link>

          <div className="border-t border-gray-100 my-4"></div>

          {/* Logout */}
          <motion.div
            whileHover={{ backgroundColor: "#fef2f2" }}
            className="flex items-center py-3 px-2 rounded-lg hover:bg-red-50 transition-colors cursor-pointer"
            onClick={toggleLogoutModal}
          >
            <div className="p-2 mr-4 bg-red-100 rounded-full">
              <LogOut className="w-5 h-5 text-red-500" />
            </div>
            <span className="text-base font-medium text-red-500">Logout</span>
          </motion.div>
        </div>

        {/* Logout Modal */}
        <AnimatePresence>
          {showLogoutModal && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black bg-opacity-50 flex items-end justify-center z-50"
              onClick={toggleLogoutModal}
            >
              <motion.div
                initial={{ y: 300 }}
                animate={{ y: 0 }}
                exit={{ y: 300 }}
                transition={{ type: "spring", damping: 25, stiffness: 300 }}
                className="bg-white w-full max-w-md rounded-t-2xl"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="flex flex-col items-center">
                  <div className="w-12 h-1 bg-gray-300 rounded-full my-3"></div>
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
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default Profile;

// import { useState } from "react";
// import {
//   ChevronLeft,
//   MoreVertical,
//   User,
//   Crown,
//   Lock,
//   LogOut,
//   ChevronRight,
// } from "lucide-react";
// import { Link } from "react-router-dom";
// import { StatusBar } from "../../../components/common/StatusBar";
// import { useAuth } from "../../../contexts/AuthContext";
// import { motion } from "framer-motion";

// const Profile = () => {
//   const { user, signOut } = useAuth();
//   const [showLogoutModal, setShowLogoutModal] = useState(false);

//   // Toggle logout modal
//   const toggleLogoutModal = () => {
//     setShowLogoutModal(!showLogoutModal);
//   };

//   // Handle logout confirmation
//   const handleLogout = () => {
//     signOut();
//     setShowLogoutModal(false);
//   };

//   return (
//     <div className="bg-white flex flex-row justify-center w-full">
//       <div className="bg-white w-[375px] h-[812px] relative">
//         <StatusBar />

//         {/* Header */}
//         <div className="flex items-center justify-between p-4 border-b">
//           <div className="flex items-center">
//             <Link to="/sound-library" className="mr-2">
//               <ChevronLeft className="w-6 h-6" />
//             </Link>
//             <h1 className="text-2xl font-bold">Profile</h1>
//           </div>
//           <button>
//             <MoreVertical className="w-6 h-6" />
//           </button>
//         </div>

//         {/* Profile Info */}
//         <motion.div
//           initial={{ opacity: 0, y: 20 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.3 }}
//           className="flex flex-col items-center p-6 border-b"
//         >
//           <div className="relative mb-4">
//             <motion.div
//               whileHover={{ scale: 1.05 }}
//               className="w-32 h-32 rounded-full overflow-hidden"
//             >
//               <img
//                 src={user?.avatar || "/profile.png"}
//                 alt="Profile"
//                 className="w-full h-full object-cover"
//               />
//             </motion.div>
//             <motion.div
//               whileHover={{ scale: 1.1 }}
//               whileTap={{ scale: 0.9 }}
//               className="absolute bottom-0 right-0 bg-primary p-2 rounded-full"
//             >
//               <User className="w-5 h-5 text-white" />
//             </motion.div>
//           </div>
//           <h2 className="text-2xl font-bold mb-1">
//             {user?.name || "User Name"}
//           </h2>
//           <p className="text-gray-500 mb-4">
//             {user?.email || "user@example.com"}
//           </p>
//           <div className="w-full border-t border-gray-200"></div>
//         </motion.div>

//         {/* Menu Items */}
//         <div className="px-4">
//           {/* Edit Profile */}
//           <Link
//             to="/edit-profile"
//             className="flex items-center justify-between py-2 border-b"
//           >
//             <div className="flex items-center">
//               <div className="p-2 mr-4">
//                 <User className="w-6 h-6" />
//               </div>
//               <span className="text-lg font-medium">Edit Profile</span>
//             </div>
//             <ChevronRight className="w-6 h-6 text-gray-400" />
//           </Link>

//           {/* Upgrade Plan */}
//           <Link
//             to="/payment"
//             className="flex items-center justify-between py-2 border-b"
//           >
//             <div className="flex items-center">
//               <div className="p-2 mr-4">
//                 <Crown className="w-6 h-6" />
//               </div>
//               <span className="text-lg font-medium">Upgrade Plan</span>
//             </div>
//             <ChevronRight className="w-6 h-6 text-gray-400" />
//           </Link>

//           {/* Privacy Policy */}
//           <Link
//             to="/privacy-policy"
//             className="flex items-center justify-between py-2 border-b"
//           >
//             <div className="flex items-center">
//               <div className="p-2 mr-4">
//                 <Lock className="w-6 h-6" />
//               </div>
//               <span className="text-lg font-medium">Privacy Policy</span>
//             </div>
//             <ChevronRight className="w-6 h-6 text-gray-400" />
//           </Link>

//           {/* Logout */}
//           <motion.div
//             whileHover={{ scale: 1.02 }}
//             whileTap={{ scale: 0.98 }}
//             className="flex items-center py-4 cursor-pointer"
//             onClick={toggleLogoutModal}
//           >
//             <div className="p-2 mr-4">
//               <LogOut className="w-6 h-6 text-red-500" />
//             </div>
//             <span className="text-lg font-medium text-red-500">Logout</span>
//           </motion.div>
//         </div>

//         {/* Logout Modal */}
//         {showLogoutModal && (
//           <div className="absolute top-0 w-[375px] h-full inset-0 bg-black bg-opacity-50 flex items-end justify-center z-50">
//             <motion.div
//               initial={{ y: 300 }}
//               animate={{ y: 0 }}
//               transition={{ type: "spring", damping: 25, stiffness: 300 }}
//               className="bg-white w-full rounded-t-xl"
//             >
//               <div className="flex flex-col items-center">
//                 {/* Drag handle */}
//                 <div className="w-12 h-1 bg-gray-300 rounded-full my-3"></div>

//                 {/* Modal content */}
//                 <div className="w-full p-6">
//                   <h3 className="text-2xl font-bold text-red-500 text-center mb-6">
//                     Logout
//                   </h3>

//                   <div className="border-t border-gray-200 mb-6"></div>

//                   <p className="text-xl text-center mb-8">
//                     Are you sure you want to log out?
//                   </p>

//                   <div className="flex gap-4">
//                     <motion.button
//                       whileHover={{ scale: 1.05 }}
//                       whileTap={{ scale: 0.95 }}
//                       onClick={toggleLogoutModal}
//                       className="flex-1 py-4 px-6 bg-gray-100 rounded-full text-black font-medium"
//                     >
//                       Cancel
//                     </motion.button>

//                     <motion.button
//                       whileHover={{ scale: 1.05 }}
//                       whileTap={{ scale: 0.95 }}
//                       onClick={handleLogout}
//                       className="flex-1 py-4 px-6 bg-red-500 rounded-full text-white font-medium"
//                     >
//                       Yes, Logout
//                     </motion.button>
//                   </div>
//                 </div>
//               </div>
//             </motion.div>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default Profile;
