
import React from 'react'

export const StatusBar = () => {
  return (
    <div className="h-6 bg-white flex justify-between items-center px-4 text-xs text-gray-500">
        <div>9:41</div>
        <div className="flex items-center gap-1">
          <div className="h-3 w-3">
            <svg viewBox="0 0 24 24" fill="currentColor">
              <path d="M12.01 21.49L23.64 7c-.45-.34-4.93-4-11.64-4C5.28 3 .81 6.66.36 7l11.63 14.49.01.01.01-.01z" />
            </svg>
          </div>
          <div className="h-3 w-3">
            <svg viewBox="0 0 24 24" fill="currentColor">
              <path d="M1 9l2 2c4.97-4.97 13.03-4.97 18 0l2-2C16.93 2.93 7.08 2.93 1 9zm8 8l3 3 3-3c-1.65-1.66-4.34-1.66-6 0zm-4-4l2 2c2.76-2.76 7.24-2.76 10 0l2-2C15.14 9.14 8.87 9.14 5 13z" />
            </svg>
          </div>
          <div className="font-bold">100%</div>
        </div>
      </div>
  )
}
