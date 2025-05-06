
import { useState } from 'react';
import { Search, Menu, User } from 'lucide-react';
import { SearchBar } from '../../../components/component/SearchBar';
import { FindFriends } from './FindFriends';

export const Friends = () => {
  const [selectedTab, setSelectedTab] = useState('yourFriends');
  const [searchTerm, setSearchTerm] = useState('');
  
  const [friends, setFriends] = useState([
    { id: 1, name: 'Jane Cooper', image: '/api/placeholder/48/48' },
    { id: 2, name: 'Savannah Nguyen', image: '/api/placeholder/48/48' },
    { id: 3, name: 'Devon Lane', image: '/api/placeholder/48/48' },
    { id: 4, name: 'Annette Black', image: '/api/placeholder/48/48' },
    { id: 5, name: 'Floyd Miles', image: '/api/placeholder/48/48' },
    { id: 6, name: 'Theresa Webb', image: '/api/placeholder/48/48' },
  ]);
  
  const [addedFriends, setAddedFriends] = useState([]);

  const handleAddFriend = (friend) => {
    setAddedFriends([...addedFriends, friend]);
  };

  const handleDeleteFriend = (friendId) => {
    setFriends(friends.filter(friend => friend.id !== friendId));
  };

  const filteredFriends = friends.filter(friend => 
    friend.name.toLowerCase().includes(searchTerm.toLowerCase())
  );
  return (
    <div>
      <div className='flex  mb-3  h-11 items-center px-0 py-3'>
        <div className="flex flex-row w-full border-b">
        <button
          className={`w-1/2 py-3 text-center ${
            selectedTab === 'yourFriends' 
            ? 'text-black font-medium' 
            : 'text-gray-400'
          }`}
          onClick={() => setSelectedTab('yourFriends')}
        >
          Your Friends
        </button>
        <button
          className={`w-1/2 py-3 text-center ${
            selectedTab === 'findFriends' 
            ? 'text-black font-medium' 
            : 'text-gray-400 bg-gray-100'
          }`}
          onClick={() => setSelectedTab('findFriends')}
        >
          Find Friends
        </button>
        </div>
      </div>
      
        <SearchBar/>
        <FindFriends friends={friends}/>
    </div>
  )
}
