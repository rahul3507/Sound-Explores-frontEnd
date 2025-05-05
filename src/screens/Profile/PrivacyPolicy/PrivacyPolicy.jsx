import { ChevronLeft, MoreVertical } from 'lucide-react'
import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { PrivacySection } from '../../../components/profile/PrivacySection';

export const PrivacyPolicy = () => {
    const [items, setItems] = useState([
            { id: 1, title: "Types of Data We Collect",desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute iruredolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat nonproident, sunt in culpa qui officia deserunt mollit anim id est laborum." },
            { id: 2, title: "Use of Your Personal Data",desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute iruredolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat nonproident, sunt in culpa qui officia deserunt mollit anim id est laborum." },
            { id: 3, title: "Disclosure of Your Personal Data",desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute iruredolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat nonproident, sunt in culpa qui officia deserunt mollit anim id est laborum." },
            { id: 4, title: "Use of Your Personal Data",desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute iruredolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat nonproident, sunt in culpa qui officia deserunt mollit anim id est laborum." },
            
          ]);
  return (
    <div className="bg-white mt-12 flex flex-row justify-center w-full">
      <div className="bg-white w-[375px] h-[812px] relative">
        {/* Header */}
      <div className="flex items-center justify-between p-0 border-b">
        <div className="flex items-center">
          <Link
            to="/profile"
           className="mr-2">
            <ChevronLeft className="w-6 h-6" />
          </Link>
          <h1 className="text-2xl font-bold">Profile</h1>
        </div>
        <button>
          <MoreVertical className="w-6 h-6" />
        </button>
      </div>

      {/* Section  */}
      {items.map((item) => <PrivacySection key={item.id} item={item} />)}
      

      
      </div>
    </div>
  )
}
