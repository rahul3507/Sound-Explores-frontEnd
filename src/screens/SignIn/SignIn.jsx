import { EyeIcon, EyeOffIcon } from "lucide-react";
import React, { useState } from "react";
import { Button } from "../../components/ui/button";
import { Card, CardContent } from "../../components/ui/card";
import { Checkbox } from "../../components/ui/checkbox";
import { Input } from "../../components/ui/input";
import { Link } from "react-router-dom";

export const SignIn = () => {
  
  
  // State for form inputs
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    rememberMe: false
  });
  
  // State for form validation
  const [errors, setErrors] = useState({
    email: "",
    password: ""
  });
  
  // State for password visibility
  const [showPassword, setShowPassword] = useState(false);
  
  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
    
    // Clear error when user types
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: ""
      });
    }
  };
  
  // Handle checkbox change
  const handleCheckboxChange = (checked) => {
    setFormData({
      ...formData,
      rememberMe: checked
    });
  };
  
  // Toggle password visibility
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
  
  // Validate form
  const validateForm = () => {
    let isValid = true;
    const newErrors = { email: "", password: "" };
    
    // Email validation
    if (!formData.email) {
      newErrors.email = "Email is required";
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email is invalid";
      isValid = false;
    }
    
    // Password validation
    if (!formData.password) {
      newErrors.password = "Password is required";
      isValid = false;
    } else if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
      isValid = false;
    }
    
    setErrors(newErrors);
    return isValid;
  };
  
  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (validateForm()) {
      // Log form data to console as requested
      console.log("Form data:", formData);
      
      // Here you would typically make an API call to authenticate the user
      // For example: authService.login(formData.email, formData.password, formData.rememberMe)
      
      // For demonstration, we'll just log a success message
      console.log("Login attempt successful");
    } else {
      console.log("Form validation failed");
    }
  };
  
  // Handle forget password
  const handleForgetPassword = () => {
    console.log("Forget password clicked");
    // Implement forget password functionality or navigation
  };

  return (
    <div className="bg-white flex flex-row justify-center w-full">
      <div className="bg-white w-[375px] h-[812px] relative">
        <form onSubmit={handleSubmit} className="flex flex-col w-full items-start gap-6 px-5 py-10 absolute top-[254px] left-0 bg-white">
          <h1 className="relative self-stretch mt-[-1.00px] font-h01-bold font-[number:var(--h01-bold-font-weight)] text-[#0b0b0b] text-[length:var(--h01-bold-font-size)] tracking-[var(--h01-bold-letter-spacing)] leading-[var(--h01-bold-line-height)] [font-style:var(--h01-bold-font-style)]">
            Login to your Account
          </h1>

          <div className="flex-col items-start gap-8 self-stretch w-full flex-[0_0_auto] flex relative">
            <div className="flex flex-col items-start gap-6 relative self-stretch w-full flex-[0_0_auto]">
              <div className="flex flex-col items-start gap-3 relative self-stretch w-full flex-[0_0_auto]">
                <div className="flex flex-col items-start gap-4 relative self-stretch w-full flex-[0_0_auto]">
                  <div className="flex flex-col items-start gap-2 relative self-stretch w-full flex-[0_0_auto]">
                    <label className="relative self-stretch mt-[-1.00px] font-base-medium font-[number:var(--base-medium-font-weight)] text-[#0b0b0b] text-[length:var(--base-medium-font-size)] tracking-[var(--base-medium-letter-spacing)] leading-[var(--base-medium-line-height)] [font-style:var(--base-medium-font-style)]">
                      Email
                    </label>

                    <Card className="p-0 w-full border border-solid border-[#e3ecf7] shadow-none">
                      <CardContent className="p-0">
                        <Input
                          name="email"
                          value={formData.email}
                          onChange={handleInputChange}
                          className={`border-none px-4 py-3 h-auto font-base-small-regular font-[number:var(--base-small-regular-font-weight)] text-[#707070] text-[length:var(--base-small-regular-font-size)] tracking-[var(--base-small-regular-letter-spacing)] leading-[var(--base-small-regular-line-height)] [font-style:var(--base-small-regular-font-style)] ${errors.email ? "border-red-500" : ""}`}
                          placeholder="Enter your Email..."
                        />
                      </CardContent>
                    </Card>
                    {errors.email && (
                      <span className="text-red-500 text-sm">{errors.email}</span>
                    )}
                  </div>

                  <div className="flex flex-col items-start gap-2 relative self-stretch w-full flex-[0_0_auto]">
                    <label className="relative self-stretch mt-[-1.00px] font-base-medium font-[number:var(--base-medium-font-weight)] text-[#0b0b0b] text-[length:var(--base-medium-font-size)] tracking-[var(--base-medium-letter-spacing)] leading-[var(--base-medium-line-height)] [font-style:var(--base-medium-font-style)]">
                      Password
                    </label>

                    <Card className="p-0 w-full border border-solid border-[#e3ecf7] shadow-none">
                      <CardContent className="p-0 flex items-center">
                        <Input
                          name="password"
                          value={formData.password}
                          onChange={handleInputChange}
                          className={`border-none px-4 py-3 h-auto font-base-small-regular font-[number:var(--base-small-regular-font-weight)] text-[#707070] text-[length:var(--base-small-regular-font-size)] tracking-[var(--base-small-regular-letter-spacing)] leading-[var(--base-small-regular-line-height)] [font-style:var(--base-small-regular-font-style)] ${errors.password ? "border-red-500" : ""}`}
                          placeholder="Enter your Password..."
                          type={showPassword ? "text" : "password"}
                        />
                        <div className="absolute right-4 cursor-pointer" onClick={togglePasswordVisibility}>
                          {showPassword ? (
                            <EyeOffIcon className="w-6 h-6 text-gray-500" />
                          ) : (
                            <EyeIcon className="w-6 h-6 text-gray-500" />
                          )}
                        </div>
                      </CardContent>
                    </Card>
                    {errors.password && (
                      <span className="text-red-500 text-sm">{errors.password}</span>
                    )}
                  </div>
                </div>

                <div className="items-center justify-between self-stretch w-full flex-[0_0_auto] flex relative">
                  <div className="items-center gap-2 flex-1 grow flex relative">
                    <Checkbox
                      id="remember-me"
                      checked={formData.rememberMe}
                      onCheckedChange={handleCheckboxChange}
                      className="w-5 h-5 border-2 border-[#00ae34] rounded"
                    />
                    <label
                      htmlFor="remember-me"
                      className="relative flex-1 mt-[-1.00px] font-base-small-medium font-[number:var(--base-small-medium-font-weight)] text-[#707070] text-[length:var(--base-small-medium-font-size)] tracking-[var(--base-small-medium-letter-spacing)] leading-[var(--base-small-medium-line-height)] [font-style:var(--base-small-medium-font-style)]"
                    >
                      Remember Me
                    </label>
                  </div>

                  <Link 
                    type="button"
                    to='/forget-password'
                    className="relative w-fit mt-[-1.00px] font-base-small-medium font-[number:var(--base-small-medium-font-weight)] text-[#00ae34] text-[length:var(--base-small-medium-font-size)] text-right tracking-[var(--base-small-medium-letter-spacing)] leading-[var(--base-small-medium-line-height)] whitespace-nowrap [font-style:var(--base-small-medium-font-style)]"
                  >
                    Forget Password?
                  </Link>
                </div>
              </div>

              <Button 
                type="submit"
                className="flex items-center justify-center gap-2.5 px-8 py-4 self-stretch w-full bg-[#00ae34] rounded-[100px] shadow-shadow-01 h-auto hover:bg-[#009c2e]"
              >
                <span className="flex-1 [font-family:'Roboto',Helvetica] font-medium text-white text-base text-center tracking-[0] leading-6">
                  Login
                </span>
              </Button>
            </div>

            <div className="flex items-center justify-center gap-1 relative self-stretch w-full flex-[0_0_auto]">
              <p className="relative w-fit mt-[-1.00px] font-base-small-regular font-[number:var(--base-small-regular-font-weight)] text-[#707070] text-[length:var(--base-small-regular-font-size)] text-right tracking-[var(--base-small-regular-letter-spacing)] leading-[var(--base-small-regular-line-height)] whitespace-nowrap [font-style:var(--base-small-regular-font-style)]">
                Don't have any account?
              </p>

              <Link 
                type="button"
                to='/signup'
                
                className="relative w-fit mt-[-1.00px] font-base-small-medium font-[number:var(--base-small-medium-font-weight)] text-[#00ae34] text-[length:var(--base-small-medium-font-size)] tracking-[var(--base-small-medium-letter-spacing)] leading-[var(--base-small-medium-line-height)] whitespace-nowrap [font-style:var(--base-small-medium-font-style)]"
              >
                Sign Up
              </Link>
            </div>
          </div>
        </form>

        <img
          className="absolute w-[200px] h-[200px] top-[54px] left-[94px] object-cover"
          alt="Poopcharacter smile"
          src="/poopcharacter-smile-1024p-1.png"
        />
      </div>
    </div>
  );
};