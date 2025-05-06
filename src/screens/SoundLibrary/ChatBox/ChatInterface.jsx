
import { useState, useRef, useEffect } from 'react';
import { ArrowLeft, MoreHorizontal, Mic, Send } from 'lucide-react';
import { StatusBar } from '../../../components/component/StatusBar';
import { Link } from 'react-router-dom';

export default function ChatInterface() {
  const [isKeyboardOpen, setIsKeyboardOpen] = useState(false);
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const textareaRef = useRef(null);
  const messagesContainerRef = useRef(null);

  const toggleKeyboard = () => {
    setIsKeyboardOpen(!isKeyboardOpen);
  };

  const hideKeyboard = () => {
    setIsKeyboardOpen(false);
  };

  const handleSend = () => {
    if (message.trim()) {
      setMessages([...messages, { text: message, isSent: true }]);
      setMessage('');
      hideKeyboard();
      
      // Simulate reply after a short delay
      setTimeout(() => {
        setMessages(prev => [...prev, { 
          text: "Thanks for your message!", 
          isSent: false 
        }]);
      }, 1000);
    }
  };

  // Scroll to bottom when new messages appear
  useEffect(() => {
    if (messagesContainerRef.current) {
      messagesContainerRef.current.scrollTop = messagesContainerRef.current.scrollHeight;
    }
  }, [messages]);

  // Handle Enter key press
  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="flex flex-col h-screen bg-gray-100 w-[375px] mx-auto relative overflow-hidden">
      {/* Status bar */}
      <StatusBar/>
      {/* Header */}
      <Link
        to="/sound-library"
       className="bg-white p-3 flex items-center border-b border-gray-200">
        <ArrowLeft size={24} className="text-gray-800" />
        <div className="ml-4 font-medium text-lg">Jane Cooper</div>
      </Link>

      {/* Messages area */}
      <div 
        ref={messagesContainerRef}
        className="flex-1 p-4 overflow-y-auto"
        style={{ paddingBottom: isKeyboardOpen ? '240px' : '60px' }}
      >
        {messages.map((msg, index) => (
          <div 
            key={index} 
            className={`max-w-xs mb-2 p-3 rounded-lg ${
              msg.isSent 
                ? 'bg-blue-500 text-white ml-auto rounded-br-none' 
                : 'bg-gray-200 text-gray-800 rounded-bl-none'
            }`}
          >
            {msg.text}
          </div>
        ))}
      </div>

      {/* Message input */}
      <div className="absolute bottom-0 left-0 right-0 bg-gray-900 pb-6">
        <div className="bg-gray-800 px-3 py-2 flex items-center">
          <div 
            className="bg-gray-700 flex-1 rounded-full py-2 px-4 text-gray-200 flex items-center"
            onClick={toggleKeyboard}
          >
            {message ? message : "Text your message..."}
            <div className="ml-auto">
              <div className="w-5 h-5">
                <svg viewBox="0 0 24 24" fill="currentColor">
                  <rect x="4" y="4" width="2" height="16"/>
                  <rect x="8" y="4" width="2" height="16"/>
                  <rect x="12" y="4" width="2" height="16"/>
                  <rect x="16" y="4" width="2" height="16"/>
                  <rect x="20" y="4" width="2" height="16"/>
                </svg>
              </div>
            </div>
          </div>
          <button 
            className="ml-2 rounded-full w-10 h-10 bg-gray-700 flex items-center justify-center"
            onClick={handleSend}
          >
            {message ? <Send size={20} className="text-gray-200" /> : <Mic size={20} className="text-gray-200" />}
          </button>
        </div>

        <div className="flex justify-between px-2 py-2">
          <button className="text-gray-400 p-2"><span className="font-bold text-xl">&lt;</span></button>
          <button className="text-gray-400 p-2">GIF</button>
          <button className="text-gray-400 p-2"><span className="font-bold">⚙️</span></button>
          <button className="text-gray-400 p-2"><span className="font-bold">🖼️</span></button>
          <button className="text-gray-400 p-2"><span className="font-bold">😊</span></button>
          <button className="text-gray-400 p-2"><MoreHorizontal size={20} /></button>
          <button className="text-gray-400 p-2"><Mic size={20} /></button>
        </div>

        {/* Virtual Keyboard */}
        {isKeyboardOpen && (
          <div className="bg-gray-800 p-1">
            <div className="grid grid-cols-10 gap-1 mb-1">
              {['q','w','e','r','t','y','u','i','o','p'].map(key => (
                <button 
                  key={key} 
                  className="bg-gray-700 text-white rounded p-2 text-center"
                  onClick={() => setMessage(prev => prev + key)}
                >
                  {key}
                </button>
              ))}
            </div>
            <div className="grid grid-cols-10 gap-1 mb-1">
              <div className="col-span-0.5"></div>
              {['a','s','d','f','g','h','j','k','l'].map(key => (
                <button 
                  key={key} 
                  className="bg-gray-700 text-white rounded p-2 text-center"
                  onClick={() => setMessage(prev => prev + key)}
                >
                  {key}
                </button>
              ))}
              <div className="col-span-0.5"></div>
            </div>
            <div className="grid grid-cols-10 gap-1 mb-1">
              <button className="bg-gray-600 text-white rounded p-2 text-center flex items-center justify-center col-span-1.5">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M7 10l5 5 5-5"/>
                </svg>
              </button>
              {['z','x','c','v','b','n','m'].map(key => (
                <button 
                  key={key} 
                  className="bg-gray-700 text-white rounded p-2 text-center"
                  onClick={() => setMessage(prev => prev + key)}
                >
                  {key}
                </button>
              ))}
              <button 
                className="bg-gray-600 text-white rounded p-2 text-center flex items-center justify-center col-span-1.5"
                onClick={() => setMessage(prev => prev.slice(0, -1))}
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M21 4H8l-7 8 7 8h13a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2z" />
                  <line x1="18" y1="9" x2="12" y2="15" />
                  <line x1="12" y1="9" x2="18" y2="15" />
                </svg>
              </button>
            </div>
            <div className="grid grid-cols-10 gap-1">
              <button className="bg-gray-600 text-white rounded p-2 col-span-1.5 flex items-center justify-center">
                ?123
              </button>
              <button className="bg-gray-600 text-white rounded p-2 flex items-center justify-center">
                @
              </button>
              <button 
                className="bg-gray-700 text-white rounded col-span-5 p-2"
                onClick={() => setMessage(prev => prev + ' ')}
              >
              </button>
              <button className="bg-gray-600 text-white rounded p-2 flex items-center justify-center">
                .
              </button>
              <button 
                className="bg-gray-600 text-white rounded p-2 col-span-1.5 flex items-center justify-center"
                onClick={handleSend}
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </button>
            </div>
            <div className="flex justify-center mt-1">
              <div className="bg-gray-600 h-1 w-32 rounded"></div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}