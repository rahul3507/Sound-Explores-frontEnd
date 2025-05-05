
import React, { useState } from 'react'
import { Checkbox } from '../../../components/ui/checkbox'
import { Button } from '../../../components/ui/button'
import { Link } from 'react-router-dom'
import { Search } from 'lucide-react'
import { Input } from '../../../components/ui/input'
import { SearchBar } from '../../../components/component/SearchBar'

const SoundList = () => {
    const [sounds, setSounds] = useState([
        { id: 1, name: "Name", duration: "00:30", selected: false },
        { id: 2, name: "Name", duration: "00:30", selected: true },
        { id: 3, name: "Name", duration: "00:30", selected: false },
        { id: 4, name: "Name", duration: "00:30", selected: false },
        { id: 5, name: "Name", duration: "00:30", selected: false },
        { id: 6, name: "Name", duration: "00:30", selected: false }
      ]);
    
      // Toggle sound selection
      const toggleSelect = (id) => {
        setSounds(sounds.map(sound => 
          sound.id === id ? { ...sound, selected: !sound.selected } : sound
        ));
      };
    
      // Play sound function
      const playSound = (id) => {
        console.log("Playing sound:", id);
        // Here you would implement actual sound playing functionality
      };
    
      // Send to friend function
      const sendToFriend = () => {
        const selectedSounds = sounds.filter(sound => sound.selected);
        console.log("Sending sounds to friend:", selectedSounds);
        // Here you would implement actual sharing functionality
      };
      
  
  return (
    
    <div >
        <SearchBar/>
        

          {/* Sound List */}
          <div className="px-0 py-2 flex-1 overflow-auto">
            {sounds.map((sound) => (
              <div key={sound.id} className="flex items-center mb-4">
                <Checkbox
                  checked={sound.selected}
                  onCheckedChange={() => toggleSelect(sound.id)}
                  className="w-5 h-5 border-2 border-gray-300 rounded mr-3"
                />
                <div className="flex flex-1 items-center justify-between">
                  <div>
                    <p className="font-medium">{sound.name}</p>
                    <p className="text-xs text-gray-500">{sound.duration}</p>
                  </div>
                  <div className="flex items-center flex-1 mx-2">
                    {/* Waveform representation */}
                    <div className="w-full h-8">
                      <svg width="100%" height="100%" viewBox="0 0 200 32">
                        <path 
                          d="M0,16 Q10,5 20,16 T40,16 T60,16 T80,16 T100,16 T120,16 T140,16 T160,16 T180,16 T200,16" 
                          fill="none" 
                          stroke="#D1D5DB" 
                          strokeWidth="2"
                        />
                        <path 
                          d="M0,16 Q10,8 20,16 T40,16 T60,16 T80,16 T100,16 T120,16 T140,16 T160,16 T180,16 T200,16" 
                          fill="none" 
                          stroke="#9CA3AF" 
                          strokeWidth="2"
                        />
                      </svg>
                    </div>
                  </div>
                  <Button
                    onClick={() => playSound(sound.id)}
                    className="bg-green-500 hover:bg-green-600 text-white rounded-full w-16 h-8 flex items-center justify-center"
                  >
                    Play
                  </Button>
                </div>
              </div>
            ))}
          </div>

          {/* Bottom Action Button */}
          <Link
                to='/signin'
                type="submit"
                className="flex items-center  justify-center gap-2.5 px-8 py-2 self-stretch w-full bg-[#00ae34] rounded-[100px] shadow-shadow-01 h-auto hover:bg-[#009c2e]"
                >
                <span className="flex-1 [font-family:'Roboto',Helvetica] font-medium text-white text-base text-center tracking-[0] leading-6">
                  Send to Friend
                </span>
          </Link>
    </div>
  )
}

export default SoundList