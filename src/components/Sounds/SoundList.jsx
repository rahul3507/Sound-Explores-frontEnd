import { useState, useEffect } from "react";
import { Checkbox } from "../ui/checkbox";
import { Button } from "../ui/button";

const SoundList = () => {
  const [sounds, setSounds] = useState([
    {
      id: 1,
      name: "Relaxing Melody",
      duration: "00:45",
      selected: false,
      isPlaying: false,
    },
    {
      id: 2,
      name: "Energetic Beat",
      duration: "00:30",
      selected: true,
      isPlaying: false,
    },
    {
      id: 3,
      name: "Nature Ambience",
      duration: "01:15",
      selected: false,
      isPlaying: false,
    },
    {
      id: 4,
      name: "Urban Rhythm",
      duration: "00:50",
      selected: false,
      isPlaying: false,
    },
    {
      id: 5,
      name: "Acoustic Guitar",
      duration: "00:38",
      selected: false,
      isPlaying: false,
    },
    {
      id: 6,
      name: "Soft Piano",
      duration: "01:20",
      selected: false,
      isPlaying: false,
    },
  ]);

  const [filteredSounds, setFilteredSounds] = useState(sounds);

  // Toggle sound selection (radio button behavior)
  const toggleSelect = (id) => {
    const updatedSounds = sounds.map((sound) =>
      sound.id === id
        ? { ...sound, selected: true }
        : { ...sound, selected: false }
    );
    setSounds(updatedSounds);
    setFilteredSounds(
      updatedSounds.filter((sound) =>
        filteredSounds.some((fs) => fs.id === sound.id)
      )
    );

    const selectedSound = updatedSounds.find((s) => s.id === id);
    console.log(`Sound ${id} (${selectedSound.name}) selected`);
    console.log(
      "Currently selected sound:",
      updatedSounds.filter((s) => s.selected).map((s) => s.id)
    );
  };

  // Play/pause sound function (only one at a time)
  const togglePlaySound = (id) => {
    // Stop any currently playing sound and play the new one
    const updatedSounds = sounds.map((sound) =>
      sound.id === id
        ? { ...sound, isPlaying: !sound.isPlaying }
        : { ...sound, isPlaying: false }
    );

    setSounds(updatedSounds);
    setFilteredSounds(
      filteredSounds.map((sound) =>
        sound.id === id
          ? { ...sound, isPlaying: !sound.isPlaying }
          : { ...sound, isPlaying: false }
      )
    );

    const targetSound = sounds.find((s) => s.id === id);
    console.log(
      `${targetSound.isPlaying ? "Stopping" : "Playing"} sound: ${id} (${
        targetSound.name
      })`
    );
  };

  // Send to friend function (only selected sound)
  const sendToFriend = () => {
    const selectedSound = sounds.find((sound) => sound.selected);
    if (selectedSound) {
      console.log("Sending sound to friend:", {
        id: selectedSound.id,
        name: selectedSound.name,
      });
    }
  };

  // Handle search
  const handleSearch = (term) => {
    if (!term || !term.trim()) {
      setFilteredSounds(sounds);
    } else {
      const filtered = sounds.filter((sound) =>
        sound.name.toLowerCase().includes(term.toLowerCase())
      );
      setFilteredSounds(filtered);
    }
  };

  const AudioWave = ({ isPlaying }) => {
    const generateLines = () => {
      const lineCount = 67;
      const lines = [];

      for (let i = 0; i < lineCount; i++) {
        const minHeight = isPlaying ? 5 : 8;
        const maxHeight = isPlaying ? 18 : 14;
        const height =
          Math.floor(Math.random() * (maxHeight - minHeight + 1)) + minHeight;
        lines.push(height);
      }

      return lines;
    };

    const [waveLines, setWaveLines] = useState(generateLines());
    const [animationSpeed] = useState(150);

    useEffect(() => {
      let animationTimer;

      if (isPlaying) {
        animationTimer = setInterval(() => {
          setWaveLines((prevLines) => {
            const newLines = [...prevLines];
            for (let i = 0; i < 10; i++) {
              const randomIndex = Math.floor(Math.random() * newLines.length);
              const minHeight = 5;
              const maxHeight = 18;
              newLines[randomIndex] =
                Math.floor(Math.random() * (maxHeight - minHeight + 1)) +
                minHeight;
            }
            return newLines;
          });
        }, animationSpeed);
      }

      return () => {
        if (animationTimer) {
          clearInterval(animationTimer);
        }
      };
    }, [isPlaying, animationSpeed]);

    return (
      <svg viewBox={`0 0 ${waveLines.length * 2} 24`} className="w-full h-8">
        {waveLines.map((height, index) => {
          const startY = 12 - height / 2;
          const endY = 12 + height / 2;

          return (
            <line
              key={index}
              x1={index * 2}
              y1={startY}
              x2={index * 2}
              y2={endY}
              stroke={isPlaying ? "#00ae34" : "#D1D5DB"}
              strokeWidth="0.5"
              strokeLinecap="round"
            />
          );
        })}
      </svg>
    );
  };

  return (
    <div className="flex flex-col h-full">
      {/* Search Bar */}
      <div className="relative mb-4">
        <input
          type="text"
          placeholder="Search"
          onChange={(e) => handleSearch(e.target.value)}
          className="w-full p-2 pl-8 bg-gray-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
        />
        <svg
          className="absolute left-2 top-2.5 h-4 w-4 text-gray-400"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
          />
        </svg>
      </div>

      {/* Sound List */}
      <div className="flex-1 overflow-auto">
        {filteredSounds.length > 0 ? (
          <div className="space-y-2">
            {filteredSounds.map((sound) => (
              <div
                key={sound.id}
                className={`flex items-center p-2 rounded-lg ${
                  sound.selected ? "bg-green-50 border border-green-200" : ""
                } hover:bg-gray-100`}
              >
                <div
                  className="flex items-center cursor-pointer"
                  onClick={() => toggleSelect(sound.id)}
                >
                  <Checkbox
                    id={`sound-${sound.id}`}
                    checked={sound.selected}
                    onCheckedChange={() => toggleSelect(sound.id)}
                    className="w-5 h-5 border-2 border-gray-300 rounded mr-3"
                  />
                  <div className="mr-3">
                    <p className="text-sm font-medium">{sound.name}</p>
                    <p className="text-xs text-gray-500">{sound.duration}</p>
                  </div>
                </div>

                <div className="flex-1 mx-2">
                  {/* Dynamic waveform */}
                  <AudioWave isPlaying={sound.isPlaying} />
                </div>

                <Button
                  onClick={() => togglePlaySound(sound.id)}
                  className={`rounded-full w-14 h-7 flex items-center justify-center text-white text-xs ${
                    sound.isPlaying
                      ? "bg-red-500 hover:bg-red-600"
                      : "bg-green-500 hover:bg-green-600"
                  }`}
                >
                  {sound.isPlaying ? "Stop" : "Play"}
                </Button>
              </div>
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center h-64">
            <p className="text-gray-500">No sounds found</p>
          </div>
        )}
      </div>

      {/* Bottom Action Button */}
      <Button
        onClick={sendToFriend}
        disabled={!sounds.some((sound) => sound.selected)}
        className="flex items-center justify-center gap-2.5 px-6 py-3 self-stretch w-full bg-green-500 rounded-full shadow-md h-auto hover:bg-green-600 mt-4 mb-4 disabled:opacity-50"
      >
        <span className="font-medium text-white text-base text-center">
          Send to Friend
        </span>
      </Button>
    </div>
  );
};

export default SoundList;
