import React, { useState, useRef, useEffect } from 'react';

interface InfoPopupProps {
  children: React.ReactNode;
  className?: string;
}

const InfoPopup: React.FC<InfoPopupProps> = ({ children, className = "" }) => {
  const [isOpen, setIsOpen] = useState(false);
  const popupRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (popupRef.current && !popupRef.current.contains(event.target as Node) &&
          buttonRef.current && !buttonRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  return (
    <div className="relative inline-block">
      <button
        ref={buttonRef}
        onClick={() => setIsOpen(!isOpen)}
        className="text-slate-400 hover:text-slate-200 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-cyan-500 rounded-full p-1"
        aria-label="More information"
      >
        <svg 
          xmlns="http://www.w3.org/2000/svg" 
          className="h-5 w-5" 
          viewBox="0 0 20 20" 
          fill="currentColor"
        >
          <path 
            fillRule="evenodd" 
            d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" 
            clipRule="evenodd" 
          />
        </svg>
      </button>
      
      {isOpen && (
        <div
          ref={popupRef}
          className={`absolute z-50 mt-2 w-80 p-4 bg-slate-900 border border-slate-600 rounded-lg shadow-2xl text-sm text-slate-300 ${className}`}
          style={{
            left: '50%',
            transform: 'translateX(-50%)',
          }}
        >
          {children}
          <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-0 h-0 border-x-8 border-x-transparent border-b-8 border-b-slate-600"></div>
        </div>
      )}
    </div>
  );
};

export default InfoPopup;
