import { useState, useRef, useEffect } from "react";
import { Menu, User } from "lucide-react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import SideBar from "../../../components/common/SideBar";
import SoundList from "../../../components/Sounds/SoundList";
import { StatusBar } from "../../../components/common/StatusBar";
import Friends from "../Friends/Friends";

const SoundLibrary = () => {
  // State for sidebar visibility and active section
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isSoundSelected, setIsSoundSelected] = useState(true);
  const [title, setTitle] = useState("Sound Library");

  // Refs for detecting clicks outside sidebar
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
    <div className="bg-white flex flex-r justify-center h-screen w-full overflow-hidden">
      {/* Sidebar */}
      <motion.div
        ref={sidebarRef}
        initial={{ x: "-100%" }}
        animate={{ x: sidebarOpen ? "-4rem" : "-70rem" }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
        className="fixed z-20 bg-gray-900 text-white w-64 h-full"
      >
        <SideBar
          onTitleChange={setTitle}
          onSoundListChange={setIsSoundSelected}
        />
      </motion.div>

      {/* Main Content */}
      <div
        ref={mainContentRef}
        className="bg-white flex flex-row justify-center w-full"
      >
        <div className="bg-white w-[375px] h-[812px] items-center relative">
          <StatusBar />

          {/* Header */}
          <div className="flex items-center justify-between px-0 py-4 border-b border-gray-100">
            <button className="p-0" onClick={toggleSidebar}>
              <Menu className="w-6 h-6 text-black" />
            </button>
            <h1 className="text-xl font-medium text-center">{title}</h1>
            <Link to="/profile" className="px-0 py-2">
              <User className="w-6 h-6 text-black" />
            </Link>
          </div>

          {/* Render active section */}
          <motion.div
            key={isSoundSelected ? "sounds" : "friends"}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="h-[calc(100%-64px)]"
          >
            {isSoundSelected ? <SoundList /> : <Friends />}
          </motion.div>
        </div>
      </div>

      {/* Overlay for mobile when sidebar is open */}
      {sidebarOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 bg-black bg-opacity-50 z-10 md:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}
    </div>
  );
};

export default SoundLibrary;
