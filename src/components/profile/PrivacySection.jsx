import { useState } from 'react';
import { motion } from 'framer-motion';
import { ChevronDown } from 'lucide-react';

export const PrivacySection = ({ item }) => {
  const { id, title, desc } = item;
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="mb-4 border-b border-gray-100">
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="flex w-full justify-between items-center py-4 px-4 text-left"
      >
        <h2 className="text-lg font-bold">{id}. {title}</h2>
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.3 }}
        >
          <ChevronDown className="w-5 h-5 text-gray-500" />
        </motion.div>
      </button>
      
      <motion.div
        initial={{ height: 0, opacity: 0 }}
        animate={{ 
          height: isOpen ? 'auto' : 0,
          opacity: isOpen ? 1 : 0
        }}
        transition={{ duration: 0.3 }}
        className="overflow-hidden"
      >
        <p className="text-sm text-gray-700 leading-relaxed px-4 pb-4">
          {desc}
        </p>
      </motion.div>
    </div>
  );
};