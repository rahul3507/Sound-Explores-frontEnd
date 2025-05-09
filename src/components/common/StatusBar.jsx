import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";

export const StatusBar = () => {
  const [timeString, setTimeString] = useState(
    new Date().toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "2-digit",
    })
  );
  const [batteryLevel, setBatteryLevel] = useState(null); // Battery level (0-100) or null if unavailable
  const [isCharging, setIsCharging] = useState(false); // Charging status
  const [networkStatus, setNetworkStatus] = useState("unknown"); // Network type (wifi, cellular, none, unknown)

  // Update time every minute
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

  // Battery Status API
  useEffect(() => {
    if ("getBattery" in navigator) {
      navigator.getBattery().then((battery) => {
        setBatteryLevel(Math.round(battery.level * 100));
        setIsCharging(battery.charging);

        battery.addEventListener("levelchange", () => {
          setBatteryLevel(Math.round(battery.level * 100));
        });
        battery.addEventListener("chargingchange", () => {
          setIsCharging(battery.charging);
        });
      });
    } else {
      setBatteryLevel(null); // Explicit fallback for unsupported API
    }
  }, []);

  // Network Status API
  useEffect(() => {
    const updateNetworkStatus = () => {
      const connection =
        navigator.connection ||
        navigator.mozConnection ||
        navigator.webkitConnection;
      if (connection) {
        setNetworkStatus(connection.type || "unknown");
      } else {
        setNetworkStatus("unknown");
      }
    };

    updateNetworkStatus();

    if (navigator.connection) {
      navigator.connection.addEventListener("change", updateNetworkStatus);
      return () =>
        navigator.connection.removeEventListener("change", updateNetworkStatus);
    }
  }, []);

  // Animation variants for icons
  const iconVariants = {
    initial: { scale: 1, y: 0 },
    hover: { scale: 1.2, y: -2, transition: { duration: 0.2 } },
  };

  // Battery icon with accessibility
  const getBatteryIcon = () => {
    if (batteryLevel === null) {
      return (
        <svg
          width='16'
          height='16'
          viewBox='0 0 24 24'
          fill='none'
          stroke='currentColor'
          strokeWidth='2'
          aria-label='Battery status unavailable'
        >
          <rect x='2' y='7' width='16' height='10' rx='2' ry='2' />
          <path d='M20 10v4' />
        </svg>
      );
    }

    const fillColor =
      batteryLevel <= 20
        ? "text-red-400"
        : batteryLevel <= 50
        ? "text-orange-400"
        : "text-green-400";
    const fillWidth = Math.round((batteryLevel / 100) * 12);

    return (
      <svg
        width='16'
        height='16'
        viewBox='0 0 24 24'
        fill='none'
        stroke='currentColor'
        strokeWidth='2'
        aria-label={`Battery at ${batteryLevel}%${
          isCharging ? ", charging" : ""
        }`}
      >
        <rect x='2' y='7' width='16' height='10' rx='2' ry='2' />
        <path d='M20 10v4' />
        <rect
          x='4'
          y='9'
          width={fillWidth}
          height='6'
          fill='currentColor'
          className={fillColor}
        />
        {isCharging && (
          <path
            d='M22 10l-2-2 2-2'
            fill='none'
            stroke='currentColor'
            strokeWidth='2'
          />
        )}
      </svg>
    );
  };

  // Network icon with accessibility
  const getNetworkIcon = () => {
    if (networkStatus === "wifi") {
      return (
        <svg
          width='16'
          height='16'
          viewBox='0 0 24 24'
          fill='none'
          stroke='currentColor'
          strokeWidth='2'
          aria-label='Wi-Fi connected'
        >
          <path d='M5 12.55a11 11 0 0 1 14.08 0' />
          <path d='M1.42 9a16 16 0 0 1 21.16 0' />
          <path d='M8.53 16.11a6 6 0 0 1 6.95 0' />
          <circle cx='12' cy='20' r='1' />
        </svg>
      );
    } else if (networkStatus === "cellular") {
      return (
        <svg
          width='16'
          height='16'
          viewBox='0 0 24 24'
          fill='none'
          stroke='currentColor'
          strokeWidth='2'
          aria-label='Cellular network connected'
        >
          <rect x='2' y='20' width='4' height='4' />
          <rect x='8' y='16' width='4' height='8' />
          <rect x='14' y='12' width='4' height='12' />
          <rect x='20' y='8' width='4' height='16' />
        </svg>
      );
    } else {
      return (
        <svg
          width='16'
          height='16'
          viewBox='0 0 24 24'
          fill='none'
          stroke='currentColor'
          strokeWidth='2'
          aria-label='No network connection'
        >
          <path d='M2 2l20 20' />
          <rect x='2' y='20' width='4' height='4' />
          <rect x='8' y='16' width='4' height='8' />
          <rect x='14' y='12' width='4' height='12' />
          <rect x='20' y='8' width='4' height='16' />
        </svg>
      );
    }
  };

  return (
    <div className='h-8 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white text-xs flex justify-between  items-center px-2 md:px-4 shadow-lg backdrop-blur-md bg-opacity-80 rounded-b-lg'>
      <span className='font-semibold text-sm tracking-wide'>{timeString}</span>
      <div className='flex space-x-3 justify-center items-center'>
        <motion.div
          variants={iconVariants}
          initial='initial'
          whileHover='hover'
          className='flex justify-center items-center'
        >
          {getNetworkIcon()}
        </motion.div>
        <motion.div
          variants={iconVariants}
          initial='initial'
          whileHover='hover'
          className='flex items-center space-x-1'
        >
          {getBatteryIcon()}
          {batteryLevel !== null && (
            <span className='text-xs'>{batteryLevel}%</span>
          )}
        </motion.div>
      </div>
    </div>
  );
};
