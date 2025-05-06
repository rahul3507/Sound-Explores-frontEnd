import React from 'react'

export const FindFriends = (findFriends) => {
  return (
    <div>
        <div className="flex-1 overflow-y-auto p-4">
         {findFriends.map(friend => (
          <div key={friend.id} className="flex items-center justify-between py-2">
            <div className="flex items-center">
              <img
                src={friend.image}
                alt={friend.name}
                className="w-12 h-12 rounded-full object-cover"
              />
              <span className="ml-4 font-medium">{friend.name}</span>
            </div>
            <div className="flex gap-2">
              <button
                className="px-4 py-2 bg-green-500 text-white rounded-md"
                onClick={() => handleAddFriend(friend)}
              >
                Add Friend
              </button>
              <button
                className="px-4 py-2 border border-gray-300 rounded-md"
                onClick={() => handleDeleteFriend(friend.id)}
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
