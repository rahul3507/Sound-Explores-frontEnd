import { useState } from "react";
import { Link } from "react-router-dom";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { EyeIcon, EyeOffIcon } from "lucide-react";
import { Button } from "../../components/ui/button";
import { Card, CardContent } from "../../components/ui/card";
import { Checkbox } from "../../components/ui/checkbox";
import { Input } from "../../components/ui/input";
import { useAuth } from "../../contexts/AuthContext";
import { motion } from "framer-motion";

// Validation schema
const loginSchema = z.object({
  email: z.string().email("Email is invalid"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  rememberMe: z.boolean().optional(),
});

const SignIn = () => {
  const { signIn } = useAuth();
  const [showPassword, setShowPassword] = useState(false);

  // React Hook Form
  const {
    register,
    handleSubmit,
    control, // Add control from useForm
    formState: { errors },
  } = useForm({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
      rememberMe: false,
    },
  });

  // Handle form submission
  const onSubmit = async (data) => {
    await signIn(data);
  };

  // Toggle password visibility
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
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
          className="flex flex-col w-full items-start gap-6 px-5 py-10 absolute top-[254px] left-0 bg-white"
        >
          <h1 className="relative self-stretch mt-[-1.00px] font-h01-bold text-[#0b0b0b] text-[2rem] font-bold tracking-tight leading-tight">
            Login to your Account
          </h1>

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
                          {...register("email")}
                          className={`border-none px-4 py-3 h-auto text-[#707070] text-sm ${
                            errors.email ? "border-red-500" : ""
                          }`}
                          placeholder="Enter your Email..."
                        />
                      </CardContent>
                    </Card>
                    {errors.email && (
                      <span className="text-red-500 text-sm">
                        {errors.email.message}
                      </span>
                    )}
                  </div>

                  {/* Password Field */}
                  <div className="flex flex-col items-start gap-2 relative self-stretch w-full flex-[0_0_auto]">
                    <label className="relative self-stretch mt-[-1.00px] font-medium text-[#0b0b0b] text-base">
                      Password
                    </label>

                    <Card className="p-0 w-full border border-solid border-[#e3ecf7] shadow-none">
                      <CardContent className="p-0 flex items-center">
                        <Input
                          {...register("password")}
                          className={`border-none px-4 py-3 h-auto text-[#707070] text-sm ${
                            errors.password ? "border-red-500" : ""
                          }`}
                          placeholder="Enter your Password..."
                          type={showPassword ? "text" : "password"}
                        />
                        <div
                          className="absolute right-4 cursor-pointer"
                          onClick={togglePasswordVisibility}
                        >
                          {showPassword ? (
                            <EyeOffIcon className="w-6 h-6 text-gray-500" />
                          ) : (
                            <EyeIcon className="w-6 h-6 text-gray-500" />
                          )}
                        </div>
                      </CardContent>
                    </Card>
                    {errors.password && (
                      <span className="text-red-500 text-sm">
                        {errors.password.message}
                      </span>
                    )}
                  </div>
                </div>

                {/* Remember Me & Forget Password */}
                <div className="items-center justify-between self-stretch w-full flex-[0_0_auto] flex relative mt-4">
                  <div className="items-center gap-2 flex-1 grow flex relative">
                    <Controller
                      name="rememberMe"
                      control={control}
                      render={({ field }) => (
                        <Checkbox
                          id="remember-me"
                          checked={field.value}
                          onCheckedChange={field.onChange}
                          className="w-5 h-5 border-2 border-[#00ae34] rounded"
                        />
                      )}
                    />
                    <label
                      htmlFor="remember-me"
                      className="relative flex-1 mt-[-1.00px] font-medium text-[#707070] text-sm cursor-pointer"
                    >
                      Remember Me
                    </label>
                  </div>

                  <Link
                    to="/forget-password"
                    className="relative w-fit mt-[-1.00px] font-medium text-[#00ae34] text-sm text-right whitespace-nowrap"
                  >
                    Forget Password?
                  </Link>
                </div>
              </div>

              {/* Login Button */}
              <Button
                type="submit"
                className="flex items-center justify-center gap-2.5 px-8 py-4 self-stretch w-full bg-[#00ae34] rounded-[100px] shadow-shadow-01 h-auto hover:bg-[#009c2e]"
              >
                <span className="flex-1 font-medium text-white text-base text-center tracking-[0] leading-6">
                  Login
                </span>
              </Button>
            </div>

            {/* Sign Up Link */}
            <div className="flex items-center justify-center gap-1 relative self-stretch w-full flex-[0_0_auto]">
              <p className="relative w-fit mt-[-1.00px] font-normal text-[#707070] text-sm text-right whitespace-nowrap">
                Don't have any account?
              </p>

              <Link
                to="/signup"
                className="relative w-fit mt-[-1.00px] font-medium text-[#00ae34] text-sm whitespace-nowrap"
              >
                Sign Up
              </Link>
            </div>
          </div>
        </form>

        <motion.img
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="absolute w-[200px] h-[200px] top-[54px] left-[94px] object-cover"
          alt="Logo"
          src="/logo.png"
        />
      </motion.div>
    </div>
  );
};

export default SignIn;
