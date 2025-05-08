import { useState } from "react";
import { motion } from "framer-motion";
import toast from "react-hot-toast";
import { FriendItem } from "./FriendItem";

const YourFriends = ({ friends }) => {
  const [yourFriends, setYourFriends] = useState(friends);

  const handleRemoveFriend = (id) => {
    setYourFriends(yourFriends.filter((friend) => friend.id !== id));
    toast.success("Friend removed successfully");
  };

  return (
    <div className="flex flex-col w-full overflow-y-auto p-4">
      {yourFriends.length > 0 ? (
        yourFriends.map((friend) => (
          <motion.div
            key={friend.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <FriendItem friend={friend} onRemove={handleRemoveFriend} />
          </motion.div>
        ))
      ) : (
        <div className="flex flex-col items-center justify-center h-64">
          <p className="text-gray-500">You don't have any friends yet</p>
        </div>
      )}
    </div>
  );
};

export default YourFriends;
