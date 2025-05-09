// src\components\Friends\FindFriends.jsx
import { useState } from 'react';
import { motion } from 'framer-motion';
import toast from 'react-hot-toast';

const FindFriends = ({ friends }) => {
  const [addFriends, setAddFriends] = useState(friends);
  
  const handleDeleteFriend = (friendId) => {
    setAddFriends(addFriends.filter(friend => friend.id !== friendId));
    toast.success('Friend removed from suggestions');
  };

  const handleAddFriend = (friend, friendId) => {
    toast.success(`Friend request sent to ${friend.name}`);
    setAddFriends(addFriends.filter(f => f.id !== friendId));
  };

  return (
    <div className="flex flex-col w-full overflow-y-auto p-4">
      {addFriends.length > 0 ? (
        addFriends.map(friend => (
          <motion.div 
            key={friend.id} 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="flex h-19 items-center justify-between py-2 mb-4"
          >
            <div className="flex pr-4 h-full items-center">
              <img
                src={friend.image}
                alt={friend.name}
                className="w-12 h-12 rounded-full object-cover"
              />
            </div>

            <div className="flex flex-col h-full w-full pl">
              <span className="flex h-1/2 text-lg font-medium">{friend.name}</span>
              <div className="flex h1/2 w-full justify-between mt-1">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-4 py-1 h-full w-1/2 mr-4 bg-primary text-white rounded-md"
                  onClick={() => handleAddFriend(friend, friend.id)}
                >
                  Add Friend
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-4 py-1 w-1/2 bg-white border border-black rounded-md"
                  onClick={() => handleDeleteFriend(friend.id)}
                >
                  Delete
                </motion.button>  
              </div>
            </div>
          </motion.div>
        ))
      ) : (
        <div className="flex flex-col items-center justify-center h-64">
          <p className="text-gray-500">No friend suggestions available</p>
        </div>
      )}
    </div>
  );
};

export default FindFriends;