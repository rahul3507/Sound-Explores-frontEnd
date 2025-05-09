// src\pages\app\Friends\Friends.jsx
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search } from "lucide-react";
import FindFriends from "../../../components/Friends/FindFriends";
import YourFriends from "../../../components/Friends/YourFriends";

const Friends = () => {
  const [selectedTab, setSelectedTab] = useState(true); // true = Find Friends, false = Your Friends
  const [searchTerm, setSearchTerm] = useState("");

  const [initialFriends, setInitialFriends] = useState([
    { id: 1, name: "Jane Cooper", image: "/profile.png" },
    { id: 2, name: "Savannah Nguyen", image: "/profile.png" },
    { id: 3, name: "Devon Lane", image: "/profile.png" },
    { id: 4, name: "Annette Black", image: "/profile.png" },
    { id: 5, name: "Floyd Miles", image: "/profile.png" },
    { id: 6, name: "Theresa Webb", image: "/profile.png" },
  ]);

  const [filteredFriends, setFilteredFriends] = useState(initialFriends);

  // Handle search
  const handleSearch = (e) => {
    const term = e.target.value;
    setSearchTerm(term);

    if (!term.trim()) {
      setFilteredFriends(initialFriends);
    } else {
      const filtered = initialFriends.filter((friend) =>
        friend.name.toLowerCase().includes(term.toLowerCase())
      );
      setFilteredFriends(filtered);
    }
  };

  // Update filtered friends when initial friends change
  useEffect(() => {
    // Apply current search filter to the updated friend list
    if (!searchTerm.trim()) {
      setFilteredFriends(initialFriends);
    } else {
      const filtered = initialFriends.filter((friend) =>
        friend.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredFriends(filtered);
    }
  }, [initialFriends]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className='flex flex-col h-full'
    >
      {/* Tabs */}
      <div className='flex mb-4'>
        <div className='flex flex-row w-full border-b'>
          <motion.button
            whileHover={{ backgroundColor: "#f9fafb" }}
            whileTap={{ scale: 0.95 }}
            className={`w-1/2 py-3 text-center transition-colors ${
              !selectedTab
                ? "text-blue-600 font-medium border-b-2 border-blue-500"
                : "text-gray-500"
            }`}
            onClick={() => setSelectedTab(false)}
          >
            Your Friends
          </motion.button>
          <motion.button
            whileHover={{ backgroundColor: "#f9fafb" }}
            whileTap={{ scale: 0.95 }}
            className={`w-1/2 py-3 text-center transition-colors ${
              selectedTab
                ? "text-blue-600 font-medium border-b-2 border-blue-500"
                : "text-gray-500"
            }`}
            onClick={() => setSelectedTab(true)}
          >
            Find Friends
          </motion.button>
        </div>
      </div>

      {/* Search Bar */}
      <div className='relative mb-4'>
        <input
          type='text'
          placeholder={
            selectedTab ? "Search for friends" : "Search your friends"
          }
          value={searchTerm}
          onChange={handleSearch}
          className='w-full p-3 pl-10 bg-gray-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500'
        />
        <Search className='absolute left-3 top-3 h-5 w-5 text-gray-400' />
      </div>

      {/* Friends Content */}
      <AnimatePresence mode='wait'>
        <motion.div
          key={selectedTab ? "find" : "your"}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3 }}
          className='flex-1 overflow-hidden'
        >
          {selectedTab ? (
            <FindFriends
              friends={filteredFriends}
              setFriends={setInitialFriends}
            />
          ) : (
            <YourFriends
              friends={filteredFriends}
              setFriends={setInitialFriends}
            />
          )}
        </motion.div>
      </AnimatePresence>
    </motion.div>
  );
};

export default Friends;
