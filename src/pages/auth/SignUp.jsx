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
const signUpSchema = z.object({
  name: z.string().min(1, "Name is required"),
  phone: z
    .string()
    .min(1, "Phone number is required")
    .refine((val) => /^\d{10,}$/.test(val.replace(/\D/g, "")), {
      message: "Please enter a valid phone number",
    }),
  password: z.string().min(6, "Password must be at least 6 characters"),
  agreeToTerms: z.literal(true, {
    errorMap: () => ({ message: "You must agree to the terms" }),
  }),
});

const SignUp = () => {
  const { signUp } = useAuth();
  const [showPassword, setShowPassword] = useState(false);

  // React Hook Form
  const {
    register,
    handleSubmit,
    control, // Add control for Controller
    formState: { errors },
  } = useForm({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      name: "",
      phone: "",
      password: "",
      agreeToTerms: false,
    },
  });

  // Handle form submission
  const onSubmit = async (data) => {
    await signUp(data);
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
        className="bg-white w-[375px] h-[812px]"
      >
        <div className="relative h-[797px] top-[15px]">
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col w-[375px] items-start gap-6 px-5 py-10 absolute top-[143px] left-0 bg-white"
          >
            <h1 className="self-stretch font-bold text-[#0b0b0b] text-[2rem] tracking-tight leading-tight">
              Create your
              <br />
              Account
            </h1>

            <div className="flex-col items-start gap-8 self-stretch w-full flex">
              <div className="flex flex-col items-start gap-6 self-stretch w-full">
                <div className="flex flex-col items-start gap-3 self-stretch w-full">
                  <div className="flex flex-col items-start gap-4 self-stretch w-full">
                    {/* Name Field */}
                    <div className="flex flex-col items-start gap-2 self-stretch w-full">
                      <label className="relative self-stretch mt-[-1.00px] font-medium text-[#0b0b0b] text-base">
                        Name
                      </label>
                      <Card className="p-0 w-full border border-solid border-[#e3ecf7] shadow-none">
                        <CardContent className="p-0">
                          <Input
                            {...register("name")}
                            className={`border-none px-4 py-3 h-auto text-[#707070] text-sm ${
                              errors.name ? "border-red-500" : ""
                            }`}
                            placeholder="Enter your name..."
                          />
                        </CardContent>
                      </Card>
                      {errors.name && (
                        <span className="text-red-500 text-sm">
                          {errors.name.message}
                        </span>
                      )}
                    </div>

                    {/* Phone Field */}
                    <div className="flex flex-col items-start gap-2 self-stretch w-full">
                      <label className="relative self-stretch mt-[-1.00px] font-medium text-[#0b0b0b] text-base">
                        Phone number
                      </label>
                      <Card className="p-0 w-full border border-solid border-[#e3ecf7] shadow-none">
                        <CardContent className="p-0">
                          <Input
                            {...register("phone")}
                            type="tel"
                            className={`border-none px-4 py-3 h-auto text-[#707070] text-sm ${
                              errors.phone ? "border-red-500" : ""
                            }`}
                            placeholder="Enter your Phone number..."
                          />
                        </CardContent>
                      </Card>
                      {errors.phone && (
                        <span className="text-red-500 text-sm">
                          {errors.phone.message}
                        </span>
                      )}
                    </div>

                    {/* Password Field */}
                    <div className="flex flex-col items-start gap-2 self-stretch w-full">
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
                            className="absolute right-10 cursor-pointer"
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

                  {/* Terms Checkbox */}
                  <div className="items-center justify-between self-stretch w-full flex">
                    <div className="flex items-center gap-2 flex-1">
                      <Controller
                        name="agreeToTerms"
                        control={control}
                        render={({ field }) => (
                          <Checkbox
                            id="terms"
                            checked={field.value}
                            onCheckedChange={field.onChange}
                            className={`w-5 h-5 rounded border-2 ${
                              errors.agreeToTerms
                                ? "border-red-500"
                                : "border-[#00ae34]"
                            }`}
                          />
                        )}
                      />
                      <label
                        htmlFor="terms"
                        className="relative cursor-pointer flex-1 mt-[-1.00px] font-medium text-[#707070] text-sm"
                      >
                        I agree to the processing of Personal data
                      </label>
                    </div>
                  </div>
                  {errors.agreeToTerms && (
                    <span className="text-red-500 text-sm">
                      {errors.agreeToTerms.message}
                    </span>
                  )}
                </div>

                <Button
                  type="submit"
                  className="flex items-center justify-center gap-2.5 px-8 py-4 self-stretch w-full bg-[#00ae34] rounded-[100px] shadow-shadow-01 h-auto hover:bg-[#009c2e]"
                >
                  <span className="flex-1 font-medium text-white text-base text-center tracking-[0] leading-6">
                    Sign Up
                  </span>
                </Button>
              </div>

              <div className="flex items-center justify-center gap-1 self-stretch w-full">
                <p className="w-fit font-normal text-[#707070] text-sm text-right whitespace-nowrap">
                  Already have an account?
                </p>
                <Link
                  to="/"
                  className="relative w-fit mt-[-1.00px] font-medium text-[#00ae34] text-sm whitespace-nowrap"
                >
                  Sign In
                </Link>
              </div>
            </div>
          </form>

          <motion.img
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="absolute w-[200px] h-[200px] top-0 left-[88px] object-cover"
            alt="Logo"
            src="/logo.png"
          />
        </div>
      </motion.div>
    </div>
  );
};

export default SignUp;
