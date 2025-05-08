import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { ArrowLeft, Eye, EyeOff } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '../../components/ui/button';
import { Card, CardContent } from '../../components/ui/card';
import { Input } from '../../components/ui/input';
import { useAuth } from '../../contexts/AuthContext';
import { motion } from 'framer-motion';

// Validation schema
const resetPasswordSchema = z.object({
  newPassword: z.string().min(6, 'Password must be at least 6 characters'),
  confirmPassword: z.string().min(6, 'Please confirm your password'),
}).refine((data) => data.newPassword === data.confirmPassword, {
  message: "Passwords don't match",
  path: ['confirmPassword'],
});

const ResetPassword = () => {
  const { resetPassword } = useAuth();
  const navigate = useNavigate();
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  
  // React Hook Form
  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: {
      newPassword: '',
      confirmPassword: ''
    }
  });
  
  // Handle form submission
  const onSubmit = async (data) => {
    const success = await resetPassword(data);
    if (success) {
      navigate('/signin');
    }
  };
  
  // Toggle password visibility
  const toggleNewPasswordVisibility = () => {
    setShowNewPassword(!showNewPassword);
  };
  
  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  return (
    <div className="bg-white flex flex-row justify-center w-full">
      <motion.div 
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="bg-white w-[375px] h-[812px] relative"
      >
        <form 
          onSubmit={handleSubmit(onSubmit)} 
          className="flex flex-col w-full items-start gap-6 px-5 py-10 absolute top-[80px] left-0 bg-white"
        >
          <Link to="/send-code" className="flex items-center gap-2 text-gray-700">
            <ArrowLeft className="w-5 h-5" />
            <span className="font-medium">Forget Password</span>
          </Link>

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

          <div className="flex-col justify-between items-start gap-2 self-stretch w-full flex-[0_0_auto]">
            <p className="text-left w-full font-medium text-[#0b0b0b] text-xl mb-6">
              Create Your New password
            </p>
            
            <div className="flex flex-col items-start gap-6 relative self-stretch w-full flex-[0_0_auto]">
              <div className="flex flex-col items-start gap-4 relative self-stretch w-full flex-[0_0_auto]">
                {/* New Password Field */}
                <div className="flex flex-col items-start gap-2 relative self-stretch w-full flex-[0_0_auto]">
                  <label className="relative self-stretch mt-[-1.00px] font-medium text-[#0b0b0b] text-base">
                    New Password
                  </label>

                  <Card className="p-0 w-full border border-solid border-[#e3ecf7] shadow-none">
                    <CardContent className="p-0 flex items-center">
                      <Input
                        {...register('newPassword')}
                        className={`border-none px-4 py-3 h-auto text-[#707070] text-sm ${errors.newPassword ? "border-red-500" : ""}`}
                        placeholder="Enter New password!..."
                        type={showNewPassword ? "text" : "password"}
                      />
                      <div 
                        className="absolute right-4 cursor-pointer"
                        onClick={toggleNewPasswordVisibility}
                      >
                        {showNewPassword ? (
                          <EyeOff className="w-6 h-6 text-gray-500" />
                        ) : (
                          <Eye className="w-6 h-6 text-gray-500" />
                        )}
                      </div>
                    </CardContent>
                  </Card>
                  {errors.newPassword && (
                    <span className="text-red-500 text-sm">{errors.newPassword.message}</span>
                  )}
                </div>

                {/* Confirm Password Field */}
                <div className="flex flex-col items-start gap-2 relative self-stretch w-full flex-[0_0_auto]">
                  <label className="relative self-stretch mt-[-1.00px] font-medium text-[#0b0b0b] text-base">
                    Re-Type Password
                  </label>

                  <Card className="p-0 w-full border border-solid border-[#e3ecf7] shadow-none">
                    <CardContent className="p-0 flex items-center">
                      <Input
                        {...register('confirmPassword')}
                        className={`border-none px-4 py-3 h-auto text-[#707070] text-sm ${errors.confirmPassword ? "border-red-500" : ""}`}
                        placeholder="Enter re-type password!..."
                        type={showConfirmPassword ? "text" : "password"}
                      />
                      <div 
                        className="absolute right-4 cursor-pointer"
                        onClick={toggleConfirmPasswordVisibility}
                      >
                        {showConfirmPassword ? (
                          <EyeOff className="w-6 h-6 text-gray-500" />
                        ) : (
                          <Eye className="w-6 h-6 text-gray-500" />
                        )}
                      </div>
                    </CardContent>
                  </Card>
                  {errors.confirmPassword && (
                    <span className="text-red-500 text-sm">{errors.confirmPassword.message}</span>
                  )}
                </div>
              </div>
            </div>
          </div>

          <Button 
            type="submit"
            className="flex items-center justify-center gap-2.5 px-8 py-2 self-stretch w-full bg-[#00ae34] rounded-[100px] shadow-shadow-01 h-auto hover:bg-[#009c2e] mt-4"
          >
            <span className="flex-1 font-medium text-white text-base text-center tracking-[0] leading-6">
              Continue
            </span>
          </Button>
        </form>
      </motion.div>
    </div>
  );
};

export default ResetPassword;