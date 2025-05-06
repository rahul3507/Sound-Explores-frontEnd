import React, { useState } from 'react'

export const FindFriends = ({friends}) => {
    const[addFriends, setAddFriends] = useState(friends);
    const handleDeleteFriend = (friendId) => {
        setAddFriends(friends.filter(addFriends => addFriends.id !== friendId));
      };

      const handleAddFriend = (friend,friendId) => {
        console.log("Friend added:", friend);
        setAddFriends(friends.filter(addFriends => addFriends.id !== friendId));
      };
  return (
    <div>
        <div className="flex flex-col w-full overflow-y-auto p-4">
         {addFriends.map(addFriends => (
          <div key={addFriends.id} className="flex h-19 items-center justify-between py-2">
            <div className="flex pr-4 h-ful items-center">
              <img
                src={addFriends.image}
                alt={addFriends.name}
                className="w-12 h-12 rounded-full object-cover"
              />
              
            </div>


            <div className="flex flex-col h-full w-full pl ">
            <span className=" flex h-1/2 text-lg font-medium">{addFriends.name}</span>
            <div className='flex h1/2 w-full justify-between   '>
              <button
                className="px-4 py-1 h-full w-1/2 mr-4 bg-green-500 text-white rounded-md"
                onClick={() => handleAddFriend(addFriends ,addFriends.id)}
              >
                Add Friend
              </button>
              <button
                className="px-4 py-1 w-1/2 bg-white border border-black rounded-md"
                onClick={() => handleDeleteFriend(addFriends.id)}
              >
                Delete
              </button>  
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
