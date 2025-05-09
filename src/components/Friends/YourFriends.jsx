// src\components\Friends\YourFriends.jsx
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import toast from "react-hot-toast";
import { FriendItem } from "./FriendItem";

const YourFriends = ({ friends, setFriends }) => {
  // Handle remove friend
  const handleRemoveFriend = (id) => {
    // Here you would make an API call to remove the friend

    // Update local state
    const updatedFriends = friends.filter((friend) => friend.id !== id);
    setFriends(updatedFriends);

    // Show success message
    toast.success("Friend removed successfully");
  };

  return (
    <div className='flex flex-col w-full overflow-y-auto'>
      <AnimatePresence>
        {friends.length > 0 ? (
          friends.map((friend) => (
            <motion.div
              key={friend.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.3 }}
            >
              <FriendItem friend={friend} onRemove={handleRemoveFriend} />
            </motion.div>
          ))
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className='flex flex-col items-center justify-center h-64 text-center'
          >
            <div className='bg-gray-100 p-4 rounded-full mb-4'>
              <svg
                xmlns='http://www.w3.org/2000/svg'
                className='h-8 w-8 text-gray-500'
                fill='none'
                viewBox='0 0 24 24'
                stroke='currentColor'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth={2}
                  d='M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z'
                />
              </svg>
            </div>
            <p className='text-gray-500 font-medium'>
              You don't have any friends yet
            </p>
            <p className='text-gray-400 text-sm mt-1'>
              Go to Find Friends to connect with others
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default YourFriends;
