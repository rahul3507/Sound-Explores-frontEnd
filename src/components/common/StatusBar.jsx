import React, { useState, useEffect } from "react";

export const StatusBar = () => {
  const [timeString, setTimeString] = useState(
    new Date().toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "2-digit",
    })
  );

  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date();
      setTimeString(
        now.toLocaleTimeString("en-US", { hour: "numeric", minute: "2-digit" })
      );
    }, 60 * 1000);

    const immediate = setTimeout(() => {
      const now = new Date();
      setTimeString(
        now.toLocaleTimeString("en-US", { hour: "numeric", minute: "2-digit" })
      );
    }, 0);

    return () => {
      clearInterval(interval);
      clearTimeout(immediate);
    };
  }, []);

  return (
    <div className="h-6 bg-black text-white text-xs flex items-center justify-between px-2 md:px-4">
      <span>{timeString}</span>
      <div className="flex space-x-1">
        <span>🛜</span>
        <span>📶</span>
        <span>🔋</span>
      </div>
    </div>
  );
};
