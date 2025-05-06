import React, { useState } from 'react'
import { FriendItem } from '../../../components/component/FriendItem';

export const YourFriends = ({friends}) => {
    const[yourFriends, setAddFriends] = useState(friends);
    const handleRemoveFriend = (id) => {
        setAddFriends(friends.filter(friend => friend.id !== id));
      };
  return (
    <div>
        <div className="flex flex-col w-full overflow-y-auto p-4">
            {yourFriends.map((friend) => (
                <FriendItem 
                key={friend.id} 
                friend={friend} 
                onRemove={handleRemoveFriend} 
          />
            ))}
        </div>
    </div>
  )
}
