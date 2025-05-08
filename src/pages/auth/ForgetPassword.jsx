import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { ArrowLeft } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '../../components/ui/button';
import { Card, CardContent } from '../../components/ui/card';
import { Input } from '../../components/ui/input';
import { useAuth } from '../../contexts/AuthContext';
import { motion } from 'framer-motion';

// Validation schema
const forgotPasswordSchema = z.object({
  email: z.string().email('Please enter a valid email address'),
});

const ForgetPassword = () => {
  const { sendPasswordResetEmail } = useAuth();
  const navigate = useNavigate();
  
  // React Hook Form
  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: {
      email: '',
    }
  });
  
  // Handle form submission
  const onSubmit = async (data) => {
    const success = await sendPasswordResetEmail(data.email);
    if (success) {
      navigate('/send-code');
    }
  };

  return (
    <div className="bg-white flex flex-row justify-center w-full">
      <motion.div 
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="bg-white w-[375px] h-[812px] relative"
      >
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col w-full items-start gap-6 px-5 py-10 absolute top-[254px] left-0 bg-white">
          <Link to="/" className="flex items-center gap-2 text-gray-700">
            <ArrowLeft className="w-5 h-5" />
            <span className="font-medium">Back to Login</span>
          </Link>

          <h1 className="self-stretch mt-4 font-bold text-[#0b0b0b] text-[2rem] tracking-tight leading-tight">
            Forgot Password?
          </h1>
          
          <p className="text-gray-600 mb-4">
            Enter your email address and we'll send you a code to reset your password.
          </p>

          <div className="flex-col items-start gap-8 self-stretch w-full flex-[0_0_auto] flex relative">
            <div className="flex flex-col items-start gap-6 relative self-stretch w-full flex-[0_0_auto]">
              <div className="flex flex-col items-start gap-3 relative self-stretch w-full flex-[0_0_auto]">
                <div className="flex flex-col items-start gap-4 relative self-stretch w-full flex-[0_0_auto]">
                  {/* Email Field */}
                  <div className="flex flex-col items-start gap-2 relative self-stretch w-full flex-[0_0_auto]">
                    <label className="relative self-stretch mt-[-1.00px] font-medium text-[#0b0b0b] text-base">
                      Email
                    </label>

                    <Card className="p-0 w-full border border-solid border-[#e3ecf7] shadow-none">
                      <CardContent className="p-0">
                        <Input
                          {...register('email')}
                          className={`border-none px-4 py-3 h-auto text-[#707070] text-sm ${errors.email ? "border-red-500" : ""}`}
                          placeholder="Enter your Email..."
                        />
                      </CardContent>
                    </Card>
                    {errors.email && (
                      <span className="text-red-500 text-sm">{errors.email.message}</span>
                    )}
                  </div>
                </div>
              </div>

              {/* Send Code Button */}
              <Button
                type="submit"
                className="flex items-center justify-center gap-2.5 px-8 py-4 self-stretch w-full bg-[#00ae34] rounded-[100px] shadow-shadow-01 h-auto hover:bg-[#009c2e] mt-4"
              >
                <span className="flex-1 font-medium text-white text-base text-center tracking-[0] leading-6">
                  Send Code
                </span>
              </Button>
            </div>
          </div>
        </form>

        <motion.img
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="absolute w-[200px] h-[200px] top-[54px] left-[94px] object-cover"
          alt="Logo"
          src="/poopcharacter-smile-1024p-1.png"
        />
      </motion.div>
    </div>
  );
};

export default ForgetPassword;