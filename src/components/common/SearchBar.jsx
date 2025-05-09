import { Search } from "lucide-react";
import { useState } from "react";

export const SearchBar = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearch = (e) => {
    e.preventDefault();
    if (onSearch) {
      onSearch(searchTerm);
    }
  };

  const handleChange = (e) => {
    setSearchTerm(e.target.value);
    if (onSearch) {
      onSearch(e.target.value);
    }
  };

  return (
    <form onSubmit={handleSearch} className='relative mb-4'>
      <div className='relative'>
        <div className='absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none'>
          <Search className='w-5 h-5 text-muted-foreground' />
        </div>
        <input
          type='search'
          value={searchTerm}
          onChange={handleChange}
          className='block w-full p-2 pl-10 text-sm text-gray-900 border border-gray-200 rounded-lg focus:ring-primary focus:border-primary'
          placeholder='Search...'
        />
      </div>
    </form>
  );
};
