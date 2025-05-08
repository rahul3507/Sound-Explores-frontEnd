import { useState } from "react";
import { motion } from "framer-motion";
import FindFriends from "../../../components/Friends/FindFriends";
import YourFriends from "../../../components/Friends/YourFriends";
import { SearchBar } from "../../../components/common/SearchBar";

const Friends = () => {
  const [selectedTab, setSelectedTab] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  const [initialFriends, setInitialFriends] = useState([
    { id: 1, name: "Jane Cooper", image: "/api/placeholder/48/48" },
    { id: 2, name: "Savannah Nguyen", image: "/api/placeholder/48/48" },
    { id: 3, name: "Devon Lane", image: "/api/placeholder/48/48" },
    { id: 4, name: "Annette Black", image: "/api/placeholder/48/48" },
    { id: 5, name: "Floyd Miles", image: "/api/placeholder/48/48" },
    { id: 6, name: "Theresa Webb", image: "/api/placeholder/48/48" },
  ]);

  const [filteredFriends, setFilteredFriends] = useState(initialFriends);

  // Handle search
  const handleSearch = (term) => {
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

  return (
    <div className="flex flex-col h-full">
      <div className="flex mb-3 h-11 items-center px-0 py-3">
        <div className="flex flex-row w-full border-b">
          <motion.button
            whileTap={{ scale: 0.95 }}
            className={`w-1/2 py-3 text-center ${
              !selectedTab
                ? "text-black font-medium border-b-2 border-primary"
                : "text-gray-400"
            }`}
            onClick={() => setSelectedTab(false)}
          >
            Your Friends
          </motion.button>
          <motion.button
            whileTap={{ scale: 0.95 }}
            className={`w-1/2 py-3 text-center ${
              selectedTab
                ? "text-black font-medium border-b-2 border-primary"
                : "text-gray-400"
            }`}
            onClick={() => setSelectedTab(true)}
          >
            Find Friends
          </motion.button>
        </div>
      </div>

      <SearchBar onSearch={handleSearch} />

      <motion.div
        key={selectedTab ? "find" : "your"}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="flex-1"
      >
        {selectedTab ? (
          <FindFriends friends={filteredFriends} />
        ) : (
          <YourFriends friends={filteredFriends} />
        )}
      </motion.div>
    </div>
  );
};

export default Friends;
