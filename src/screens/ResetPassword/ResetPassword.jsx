
import React, { useState } from "react";
import { Button } from "../../components/ui/button";
import { Card, CardContent } from "../../components/ui/card";
import { Input } from "../../components/ui/input";
import { Link } from "react-router-dom";
import { ArrowLeft, Eye, EyeOff } from "lucide-react";

export const ResetPassword = () => {
  // State for form inputs
  const [formData, setFormData] = useState({
    newPassword: "",
    confirmPassword: ""
  });
  
  // State for form validation
  const [errors, setErrors] = useState({
    newPassword: "",
    confirmPassword: ""
  });
  
  // State for password visibility
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  
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
  
  // Toggle password visibility
  const toggleNewPasswordVisibility = () => {
    setShowNewPassword(!showNewPassword);
  };
  
  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };
  
  // Validate form
  const validateForm = () => {
    let isValid = true;
    const newErrors = { newPassword: "", confirmPassword: "" };
    
    // Password validation
    if (!formData.newPassword) {
      newErrors.newPassword = "Password is required";
      isValid = false;
    } else if (formData.newPassword.length < 6) {
      newErrors.newPassword = "Password must be at least 6 characters";
      isValid = false;
    }
    
    // Confirm password validation
    if (!formData.confirmPassword) {
      newErrors.confirmPassword = "Please confirm your password";
      isValid = false;
    } else if (formData.newPassword !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
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
      
      // Here you would typically make an API call to reset the password
      // For example: authService.resetPassword(formData.newPassword)
      
      // For demonstration, we'll just log a success message
      console.log("Password reset successful");
    } else {
      console.log("Form validation failed");
    }
  };

  return (
    <div className="bg-white flex flex-row justify-center w-full">
      <div className="bg-white w-[375px] h-[812px] relative">
        <form onSubmit={handleSubmit} className="flex flex-col w-full items-start gap-6 px-5 py-10 absolute top-[80px] left-0 bg-white">
          <Link to="/send-code" className="flex items-center gap-2 text-gray-700">
            <ArrowLeft className="w-5 h-5" />
            <span className="font-medium">Forget Password</span>
          </Link>

          <div className="flex-col items-center justify-center w-full">
            <img
              className="w-[200px] h-[200px] mx-auto mb-8 object-cover"
              alt="Poopcharacter with megaphone"
              src="/poopcharacter-smile-1024p-1.png"
            />
          </div>

          <div className="flex-col items-start gap-8 self-stretch w-full flex-[0_0_auto] flex relative">
            <p className="text-left w-full font-base-medium text-[#0b0b0b] text-xl mb-6">
              Create Your New password
            </p>
            
            <div className="flex flex-col items-start gap-6 relative self-stretch w-full flex-[0_0_auto]">
              <div className="flex flex-col items-start gap-4 relative self-stretch w-full flex-[0_0_auto]">
                <div className="flex flex-col items-start gap-2 relative self-stretch w-full flex-[0_0_auto]">
                  <label className="relative self-stretch mt-[-1.00px] font-base-medium font-[number:var(--base-medium-font-weight)] text-[#0b0b0b] text-[length:var(--base-medium-font-size)] tracking-[var(--base-medium-letter-spacing)] leading-[var(--base-medium-line-height)] [font-style:var(--base-medium-font-style)]">
                    New Password
                  </label>

                  <Card className="p-0 w-full border border-solid border-[#e3ecf7] shadow-none">
                    <CardContent className="p-0 flex items-center">
                      <Input
                        name="newPassword"
                        value={formData.newPassword}
                        onChange={handleInputChange}
                        className={`border-none px-4 py-3 h-auto font-base-small-regular font-[number:var(--base-small-regular-font-weight)] text-[#707070] text-[length:var(--base-small-regular-font-size)] tracking-[var(--base-small-regular-letter-spacing)] leading-[var(--base-small-regular-line-height)] [font-style:var(--base-small-regular-font-style)] ${errors.newPassword ? "border-red-500" : ""}`}
                        placeholder="Enter New password!..."
                        type={showNewPassword ? "text" : "password"}
                      />
                      <div className="absolute right-4 cursor-pointer" onClick={toggleNewPasswordVisibility}>
                        {showNewPassword ? (
                          <EyeOff className="w-6 h-6 text-gray-500" />
                        ) : (
                          <Eye className="w-6 h-6 text-gray-500" />
                        )}
                      </div>
                    </CardContent>
                  </Card>
                  {errors.newPassword && (
                    <span className="text-red-500 text-sm">{errors.newPassword}</span>
                  )}
                </div>

                <div className="flex flex-col items-start gap-2 relative self-stretch w-full flex-[0_0_auto]">
                  <label className="relative self-stretch mt-[-1.00px] font-base-medium font-[number:var(--base-medium-font-weight)] text-[#0b0b0b] text-[length:var(--base-medium-font-size)] tracking-[var(--base-medium-letter-spacing)] leading-[var(--base-medium-line-height)] [font-style:var(--base-medium-font-style)]">
                    Re-Type Password
                  </label>

                  <Card className="p-0 w-full border border-solid border-[#e3ecf7] shadow-none">
                    <CardContent className="p-0 flex items-center">
                      <Input
                        name="confirmPassword"
                        value={formData.confirmPassword}
                        onChange={handleInputChange}
                        className={`border-none px-4 py-3 h-auto font-base-small-regular font-[number:var(--base-small-regular-font-weight)] text-[#707070] text-[length:var(--base-small-regular-font-size)] tracking-[var(--base-small-regular-letter-spacing)] leading-[var(--base-small-regular-line-height)] [font-style:var(--base-small-regular-font-style)] ${errors.confirmPassword ? "border-red-500" : ""}`}
                        placeholder="Enter re-type password!..."
                        type={showConfirmPassword ? "text" : "password"}
                      />
                      <div className="absolute right-4 cursor-pointer" onClick={toggleConfirmPasswordVisibility}>
                        {showConfirmPassword ? (
                          <EyeOff className="w-6 h-6 text-gray-500" />
                        ) : (
                          <Eye className="w-6 h-6 text-gray-500" />
                        )}
                      </div>
                    </CardContent>
                  </Card>
                  {errors.confirmPassword && (
                    <span className="text-red-500 text-sm">{errors.confirmPassword}</span>
                  )}
                </div>
              </div>
            </div>
          </div>

          <div className="absolute bottom-8 left-0 right-0 px-5">
            <Button 
              type="submit"
              className="flex items-center justify-center gap-2.5 px-8 py-4 self-stretch w-full bg-[#00ae34] rounded-[100px] shadow-shadow-01 h-auto hover:bg-[#009c2e]"
            >
              <span className="flex-1 [font-family:'Roboto',Helvetica] font-medium text-white text-base text-center tracking-[0] leading-6">
                Continue
              </span>
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};