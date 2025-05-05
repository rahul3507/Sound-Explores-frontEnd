import React from 'react'
import { SearchBar } from '../../../components/component/SearchBar'

export const Friends = () => {
    const friendsData = [
        { name: "Jane Cooper", image: "https://via.placeholder.com/50" },
        { name: "Savannah Nguyen", image: "https://via.placeholder.com/50" },
        { name: "Devon Lane", image: "https://via.placeholder.com/50" },
        { name: "Annette Black", image: "https://via.placeholder.com/50" },
        { name: "Floyd Miles", image: "https://via.placeholder.com/50" },
        { name: "Theresa Webb", image: "https://via.placeholder.com/50" },
      ];
  return (
    <div>
        <div className='flex mb-3 flex-row h-11 items-center px-0 py-3'>
            <button className='w-1/2 rounded-md h-11'>Your Friends</button>
            <button className='w-1/2 h-11 rounded-md bg-[#E2E2E2]'>Find  Friends</button>

        </div>
        <SearchBar/>
    </div>
  )
}
