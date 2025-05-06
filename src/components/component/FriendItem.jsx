import { useState, useRef, useEffect } from 'react';
import { Search, Mail, Menu, User } from 'lucide-react';

// Custom hook for swipe detection
const useSwipe = (onSwipeLeft, onSwipeRight) => {
  const [touchStart, setTouchStart] = useState(null);
  const [touchEnd, setTouchEnd] = useState(null);

  // Minimum distance required for swipe
  const minSwipeDistance = 50;

  const onTouchStart = (e) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const onTouchMove = (e) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;
    
    if (isLeftSwipe && onSwipeLeft) onSwipeLeft();
    if (isRightSwipe && onSwipeRight) onSwipeRight();
  };

  // Mouse event handlers for desktop testing
  const [mouseStart, setMouseStart] = useState(null);
  const [mouseDown, setMouseDown] = useState(false);

  const onMouseDown = (e) => {
    setMouseDown(true);
    setMouseStart(e.clientX);
  };

  const onMouseMove = (e) => {
    if (!mouseDown) return;
    setTouchEnd(e.clientX);
  };

  const onMouseUp = () => {
    if (!mouseDown || !mouseStart || !touchEnd) {
      setMouseDown(false);
      return;
    }
    
    const distance = mouseStart - touchEnd;
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;
    
    if (isLeftSwipe && onSwipeLeft) onSwipeLeft();
    if (isRightSwipe && onSwipeRight) onSwipeRight();
    
    setMouseDown(false);
  };

  // Clean up mouse events if component unmounts while mouse is down
  useEffect(() => {
    if (mouseDown) {
      document.addEventListener('mouseup', onMouseUp);
      document.addEventListener('mousemove', onMouseMove);
    }
    
    return () => {
      document.removeEventListener('mouseup', onMouseUp);
      document.removeEventListener('mousemove', onMouseMove);
    };
  }, [mouseDown, mouseStart, touchEnd]);

  return {
    onTouchStart,
    onTouchMove,
    onTouchEnd,
    onMouseDown,
  };
};

// Friend Item Component with Custom Swipe Support
export const FriendItem = ({ friend, onRemove }) => {
  const [isOpen, setIsOpen] = useState(false);
  
  const swipeHandlers = useSwipe(
    () => setIsOpen(true),   // onSwipeLeft
    () => setIsOpen(false)   // onSwipeRight
  );

  return (
    <div className="relative overflow-hidden">
      <div 
        {...swipeHandlers}
        className="flex items-center justify-between py-3 touch-pan-y"
        style={{ 
          transform: isOpen ? 'translateX(-80px)' : 'translateX(0)',
          transition: 'transform 0.3s ease-out'
        }}
      >
        <div className="flex items-center">
          <img
            src={friend.image}
            alt={friend.name}
            className="w-12 h-12 rounded-full object-cover"
          />
          <span className="ml-3 font-medium">{friend.name}</span>
        </div>
        <Mail size={20} />
      </div>
      
      {/* Remove button positioned absolutely */}
      <div 
        className="absolute right-0 top-0 bottom-0 flex items-center"
        style={{ width: '80px' }}
      >
        <button 
          className="bg-red-600 text-white h-10 w-full mx-1 rounded"
          onClick={() => {
            onRemove(friend.id);
            setIsOpen(false);
          }}
        >
          Remove
        </button>
      </div>
    </div>
  );
};
