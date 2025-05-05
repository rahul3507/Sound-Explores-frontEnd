import React from 'react'
import { Search } from 'lucide-react'
import { Input } from '../ui/input'
export const SearchBar = () => {
  return (
     
     <div className="flex relative items-center  px-0 py-3"> 
     <Search className="w-5 h-5 z-10 ml-3 text-gray-400 mr-2" />
     <Input 
       className="bg-gray-100  absolute rounded-md text-lg px-9 py-3"
       placeholder="Search" 
       type='text'
     />            
 </div>
  )
}
