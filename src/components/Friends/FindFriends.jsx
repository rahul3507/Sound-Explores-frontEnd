// src\components\Friends\FindFriends.jsx
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import toast from "react-hot-toast";

const FindFriends = ({ friends, setFriends }) => {
  const [pendingFriends, setPendingFriends] = useState([]);

  const handleDeleteFriend = (friendId) => {
    // Remove from suggestion list
    const updatedFriends = friends.filter((friend) => friend.id !== friendId);

    // Here you would make an API call to remove the suggestion

    // Update UI
    setFriends(updatedFriends);
    toast.success("Friend removed from suggestions");
  };

  const handleAddFriend = (friend) => {
    // Add to pending friends list
    setPendingFriends([...pendingFriends, friend.id]);

    // Here you would make an API call to send the friend request

    // Show success message
    toast.success(`Friend request sent to ${friend.name}`);

    // Optional: Remove from suggestion list after a delay
    setTimeout(() => {
      setFriends(friends.filter((f) => f.id !== friend.id));
      setPendingFriends(pendingFriends.filter((id) => id !== friend.id));
    }, 2000);
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
              className='flex items-center bg-card rounded-lg p-3 mb-3 shadow-sm'
            >
              <div className='flex-shrink-0 mr-3'>
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  className='w-10 h-10 rounded-full overflow-hidden ring-2 ring-gray-100'
                >
                  <img
                    src={friend.image}
                    alt={friend.name}
                    className='w-full h-full object-cover'
                  />
                </motion.div>
              </div>

              <div className='flex-1'>
                <h3 className='text-base font-medium'>{friend.name}</h3>
                <p className='text-xs text-muted-foreground'>
                  Suggested for you
                </p>
              </div>

              <div className='flex gap-2'>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  disabled={pendingFriends.includes(friend.id)}
                  className={`px-3 py-1.5 rounded-md text-sm font-medium ${
                    pendingFriends.includes(friend.id)
                      ? "bg-gray-200 text-muted-foreground"
                      : "bg-primary text-white hover:bg-blue-600"
                  } transition-colors`}
                  onClick={() => handleAddFriend(friend)}
                >
                  {pendingFriends.includes(friend.id) ? "Pending" : "Add"}
                </motion.button>

                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className='px-3 py-1.5 bg-gray-100 rounded-md text-sm font-medium text-foreground hover:bg-gray-200 transition-colors'
                  onClick={() => handleDeleteFriend(friend.id)}
                >
                  Remove
                </motion.button>
              </div>
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
                className='h-8 w-8 text-muted-foreground'
                fill='none'
                viewBox='0 0 24 24'
                stroke='currentColor'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth={2}
                  d='M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z'
                />
              </svg>
            </div>
            <p className='text-muted-foreground font-medium'>
              No friend suggestions available
            </p>
            <p className='text-muted-foreground text-sm mt-1'>
              Check back later for new suggestions
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default FindFriends;
