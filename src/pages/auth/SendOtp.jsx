import { useState, useEffect, useRef } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { ArrowLeft } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '../../components/ui/button';
import { useAuth } from '../../contexts/AuthContext';
import { motion } from 'framer-motion';

// Validation schema
const otpSchema = z.object({
  otp: z.string().length(4, 'OTP must be 4 digits'),
});

const SendOtp = () => {
  const { verifyOtp } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState("infogmaila@gmail.com");
  const [timer, setTimer] = useState(60);
  const [isTimerActive, setIsTimerActive] = useState(true);
  
  // State for OTP digits
  const [otp, setOtp] = useState(["", "", "", ""]);
  
  // References for OTP input fields
  const inputRefs = [useRef(null), useRef(null), useRef(null), useRef(null)];
  
  // Timer for resend code functionality
  useEffect(() => {
    let interval;
    if (isTimerActive && timer > 0) {
      interval = setInterval(() => {
        setTimer((prevTimer) => prevTimer - 1);
      }, 1000);
    } else if (timer === 0) {
      setIsTimerActive(false);
    }
    
    return () => clearInterval(interval);
  }, [timer, isTimerActive]);
  
  // Handle OTP input change
  const handleOtpChange = (e, index) => {
    const value = e.target.value;
    
    // Only allow numbers
    if (value && !/^\d+$/.test(value)) {
      return;
    }
    
    // Update the OTP digits array
    const newOtp = [...otp];
    newOtp[index] = value.slice(0, 1); // Only take the first character
    setOtp(newOtp);
    
    // Move focus to next input if current input is filled
    if (value && index < 3) {
      inputRefs[index + 1].current.focus();
    }
  };
  
  // Handle key down events for backspace
  const handleKeyDown = (e, index) => {
    // Move focus to previous input when backspace is pressed on an empty input
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs[index - 1].current.focus();
    }
  };
  
  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const otpValue = otp.join("");
    if (otpValue.length === 4) {
      const success = await verifyOtp(otpValue);
      if (success) {
        navigate('/reset-password');
      }
    }
  };
  
  // Handle resend code
  const handleResendCode = () => {
    if (!isTimerActive) {
      console.log("Resending code to", email);
      // Reset OTP fields
      setOtp(["", "", "", ""]);
      // Reset timer
      setTimer(60);
      setIsTimerActive(true);
    }
  };

  return (
    <div className="bg-white flex flex-row justify-center items-center w-full h-screen">
      <motion.form
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        onSubmit={handleSubmit}
        className="flex flex-col md:w-1/3 lg:w-1/5 mx-auto px-5 bg-white h-full max-h-[80vh]"
      >
        <Link to="/forget-password" className="flex items-center gap-2 text-gray-700">
          <ArrowLeft className="w-5 h-5" />
          <span className="font-medium">Forget Password</span>
        </Link>

        <div className="flex justify-between flex-col items-center h-full">
          <div className="flex-col items-center justify-center w-full">
            <motion.img
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="w-[200px] h-[200px] mx-auto mb-8 object-cover"
              alt="Logo"
              src="/poopcharacter-smile-1024p-1.png"
            />
          </div>

          <div className="flex-col items-start gap-8 self-stretch w-full flex-[0_0_auto] flex relative">
            <div className="flex flex-col items-start gap-6 relative self-stretch w-full flex-[0_0_auto]">
              <p className="text-center w-full font-medium text-[#707070] text-base mb-4">
                Code has been send to {email}
              </p>
              
              <div className="flex items-center justify-between gap-2 w-full">
                {otp.map((digit, index) => (
                  <div
                    key={index}
                    className="w-14 h-14 border border-solid border-[#E0E0E0] rounded-md flex items-center justify-center"
                  >
                    <input
                      ref={inputRefs[index]}
                      type="text"
                      maxLength={1}
                      value={digit}
                      onChange={(e) => handleOtpChange(e, index)}
                      onKeyDown={(e) => handleKeyDown(e, index)}
                      className="w-full h-full text-center text-3xl font-300 border-none focus:outline-none focus:ring-0"
                      autoFocus={index === 0}
                    />
                  </div>
                ))}
              </div>
              
              <button
                type="button"
                onClick={handleResendCode}
                disabled={isTimerActive}
                className={`w-full text-center font-medium ${
                  isTimerActive ? "text-gray-400" : "text-[#00ae34] cursor-pointer"
                }`}
              >
                {isTimerActive 
                  ? `Resend Code (${timer}s)` 
                  : "Resend Code"}
              </button>
            </div>
          </div>

          <Button
            type="submit"
            className="flex items-center justify-center gap-2.5 px-8 py-2 self-stretch w-full bg-[#00ae34] rounded-[100px] shadow-shadow-01 h-auto hover:bg-[#009c2e]"
            disabled={otp.join("").length !== 4}
          >
            <span className="flex-1 font-medium text-white text-base text-center tracking-[0] leading-6">
              Verify
            </span>
          </Button>
        </div>
      </motion.form>
    </div>
  );
};

export default SendOtp;