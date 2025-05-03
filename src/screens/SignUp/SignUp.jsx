import { EyeIcon, EyeOffIcon } from "lucide-react";
import React, { useState } from "react";
import { Button } from "../../components/ui/button";
import { Card, CardContent } from "../../components/ui/card";
import { Checkbox } from "../../components/ui/checkbox";
import { Input } from "../../components/ui/input";
import { Link, useNavigate } from "react-router-dom";

export const SignUp = () => {
  const navigate = useNavigate();
  
  // State for form inputs
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    password: "",
    agreeToTerms: false
  });
  
  // State for form validation
  const [errors, setErrors] = useState({
    name: "",
    phone: "",
    password: "",
    agreeToTerms: ""
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
      agreeToTerms: checked
    });
    
    // Clear error when user checks
    if (errors.agreeToTerms) {
      setErrors({
        ...errors,
        agreeToTerms: ""
      });
    }
  };
  
  // Toggle password visibility
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
  
  // Validate form
  const validateForm = () => {
    let isValid = true;
    const newErrors = { 
      name: "", 
      phone: "", 
      password: "", 
      agreeToTerms: "" 
    };
    
    // Name validation
    if (!formData.name.trim()) {
      newErrors.name = "Name is required";
      isValid = false;
    }
    
    // Phone validation
    if (!formData.phone) {
      newErrors.phone = "Phone number is required";
      isValid = false;
    } else if (!/^\d{10,}$/.test(formData.phone.replace(/\D/g, ''))) {
      newErrors.phone = "Please enter a valid phone number";
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
    
    // Terms agreement validation
    if (!formData.agreeToTerms) {
      newErrors.agreeToTerms = "You must agree to the terms";
      isValid = false;
    }
    
    setErrors(newErrors);
    return isValid;
  };
  
  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (validateForm()) {
      console.log("Form data:", formData);
      console.log("Sign up attempt successful");
    } else {
      console.log("Form validation failed");
    }
  };

  return (
    <div className="bg-white flex flex-row justify-center w-full">
      <div className="bg-white w-[375px] h-[812px]">
        <div className="relative h-[797px] top-[15px]">
          <form 
            onSubmit={handleSubmit}
            className="flex flex-col w-[375px] items-start gap-6 px-5 py-10 absolute top-[143px] left-0 bg-white"
          >
            <h1 className="self-stretch font-h01-bold font-[number:var(--h01-bold-font-weight)] text-[#0b0b0b] text-[length:var(--h01-bold-font-size)] tracking-[var(--h01-bold-letter-spacing)] leading-[var(--h01-bold-line-height)] [font-style:var(--h01-bold-font-style)]">
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
                      <label className="relative self-stretch mt-[-1.00px] font-base-medium font-[number:var(--base-medium-font-weight)] text-[#0b0b0b] text-[length:var(--base-medium-font-size)] tracking-[var(--base-medium-letter-spacing)] leading-[var(--base-medium-line-height)] [font-style:var(--base-medium-font-style)]">
                        Name
                      </label>
                      <Card className="p-0 w-full border border-solid border-[#e3ecf7] shadow-none">
                        <CardContent className="p-0">
                          <Input
                            name="name"
                            value={formData.name}
                            onChange={handleInputChange}
                            className={`border-none px-4 py-3 h-auto font-base-small-regular font-[number:var(--base-small-regular-font-weight)] text-[#707070] text-[length:var(--base-small-regular-font-size)] tracking-[var(--base-small-regular-letter-spacing)] leading-[var(--base-small-regular-line-height)] [font-style:var(--base-small-regular-font-style)] ${errors.name ? "border-red-500" : ""}`}
                            placeholder="Enter your name..."
                          />
                        </CardContent>
                      </Card>
                      {errors.name && (
                        <span className="text-red-500 text-sm">{errors.name}</span>
                      )}
                    </div>

                    {/* Phone Field */}
                    <div className="flex flex-col items-start gap-2 self-stretch w-full">
                      <label className="relative self-stretch mt-[-1.00px] font-base-medium font-[number:var(--base-medium-font-weight)] text-[#0b0b0b] text-[length:var(--base-medium-font-size)] tracking-[var(--base-medium-letter-spacing)] leading-[var(--base-medium-line-height)] [font-style:var(--base-medium-font-style)]">
                        Phone number
                      </label>
                      <Card className="p-0 w-full border border-solid border-[#e3ecf7] shadow-none">
                        <CardContent className="p-0">
                          <Input
                            name="phone"
                            type="tel"
                            value={formData.phone}
                            onChange={handleInputChange}
                            className={`border-none px-4 py-3 h-auto font-base-small-regular font-[number:var(--base-small-regular-font-weight)] text-[#707070] text-[length:var(--base-small-regular-font-size)] tracking-[var(--base-small-regular-letter-spacing)] leading-[var(--base-small-regular-line-height)] [font-style:var(--base-small-regular-font-style)] ${errors.phone ? "border-red-500" : ""}`}
                            placeholder="Enter your Phone number..."
                          />
                        </CardContent>
                      </Card>
                      {errors.phone && (
                        <span className="text-red-500 text-sm">{errors.phone}</span>
                      )}
                    </div>

                    {/* Password Field */}
                    <div className="flex flex-col items-start gap-2 self-stretch w-full">
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
                          <div className="absolute right-10 cursor-pointer" onClick={togglePasswordVisibility}>
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

                  {/* Terms Checkbox */}
                  <div className="items-center justify-between self-stretch w-full flex">
                    <div className="flex items-center gap-2 flex-1">
                      <Checkbox
                        id="terms"
                        checked={formData.agreeToTerms}
                        onCheckedChange={handleCheckboxChange}
                        className={`w-5 h-5 rounded border-2 ${errors.agreeToTerms ? "border-red-500" : "border-[#00ae34]"}`}
                      />
                      <label
                        htmlFor="terms"
                        className="relative flex-1 mt-[-1.00px] font-base-small-medium font-[number:var(--base-small-medium-font-weight)] text-[#707070] text-[length:var(--base-small-regular-font-size)] tracking-[var(--base-small-medium-letter-spacing)] leading-[var(--base-small-medium-line-height)] [font-style:var(--base-small-medium-font-style)]"
                      >
                        I agree to the processing of Personal data
                      </label>
                    </div>
                  </div>
                  {errors.agreeToTerms && (
                    <span className="text-red-500 text-sm">{errors.agreeToTerms}</span>
                  )}
                </div>

                <Button 
                  type="submit"
                  className="flex items-center justify-center gap-2.5 px-8 py-4 self-stretch w-full bg-[#00ae34] rounded-[100px] shadow-shadow-01 h-auto hover:bg-[#009c2e]"
                >
                  <span className="flex-1 [font-family:'Roboto',Helvetica] font-medium text-white text-base text-center tracking-[0] leading-6">
                    Sign Up
                  </span>
                </Button>
              </div>

              <div className="flex items-center justify-center gap-1 self-stretch w-full">
                <p className="w-fit font-base-small-regular font-[number:var(--base-small-regular-font-weight)] text-[#707070] text-[length:var(--base-small-regular-font-size)] text-right tracking-[var(--base-small-regular-letter-spacing)] leading-[var(--base-small-regular-line-height)] whitespace-nowrap [font-style:var(--base-small-regular-font-style)]">
                  Already have an account?
                </p>
                <Link
                  type="button"
                  to='/'
                  className="relative w-fit mt-[-1.00px] font-base-small-medium font-[number:var(--base-small-medium-font-weight)] text-[#00ae34] text-[length:var(--base-small-medium-font-size)] tracking-[var(--base-small-medium-letter-spacing)] leading-[var(--base-small-medium-line-height)] whitespace-nowrap [font-style:var(--base-small-medium-font-style)]"
                >
                  Sign In
                </Link>
              </div>
            </div>
          </form>

          <img
            className="absolute w-[200px] h-[200px] top-0 left-[88px] object-cover"
            alt="Poopcharacter smile"
            src="/poopcharacter-smile-1024p-1.png"
          />
        </div>
      </div>
    </div>
  );
};