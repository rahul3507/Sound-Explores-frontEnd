
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

  export { useSwipe };