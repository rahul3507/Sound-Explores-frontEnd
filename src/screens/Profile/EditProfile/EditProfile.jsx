import React, { useState } from "react";
import { ChevronLeft, MoreVertical } from "lucide-react";
import { Form, Link } from "react-router-dom";
import { Button } from "../../../components/ui/button";

const EditProfile = () => {
  // State for form fields
  const [formData, setFormData] = useState({
    fullName: "Daniel Austin",
    nickname: "",
    dateOfBirth: "",
    email: "daniel_austin@yourdomain.com",
    phone: "",
    address: ""
  });

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    // Here you would typically send the data to your backend
  };

  return (
    <div className="bg-white flex flex-col mt-10 h-full w-full max-w-md mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b">
        <div className="flex items-center">
          <Link
            to="/profile"
            className="mr-2"
          >
            <ChevronLeft className="w-6 h-6" />
          </Link>
          <h1 className="text-2xl font-bold">Edit Profile</h1>
        </div>
        <button>
          <MoreVertical className="w-6 h-6" />
        </button>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="flex-1 p-6">
        <div className="space-y-6">
          {/* Full Name */}
          <div>
            <label className="block text-xl font-medium mb-1">Full Name</label>
            <input
              type="text"
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              placeholder="Enter your Full Name..."
              className="w-full p-2 border border-gray-200 rounded-lg"
            />
          </div>

          {/* Nickname */}
          <div>
            <label className="block text-xl font-medium mb-1">Nickname</label>
            <input
              type="text"
              name="nickname"
              value={formData.nickname}
              onChange={handleChange}
              placeholder="Enter your Nickname..."
              className="w-full p-2 border border-gray-200 rounded-lg"
            />
          </div>

          {/* Date of Birth */}
          <div>
            <label className="block text-xl font-medium mb-1">Date of Birth</label>
            <input
              type="text"
              name="dateOfBirth"
              value={formData.dateOfBirth}
              onChange={handleChange}
              placeholder="Date of Birth"
              className="w-full p-2 border border-gray-200 rounded-lg"
            />
          </div>

          {/* Email */}
          <div>
            <label className="block text-xl font-medium mb-1">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter your Email..."
              className="w-full p-2 border border-gray-200 rounded-lg"
            />
          </div>

          {/* Phone */}
          <div>
            <label className="block text-xl font-medium mb-1">Phone</label>
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              placeholder="Enter your Phone..."
              className="w-full p-2 border border-gray-200 rounded-lg"
            />
          </div>

          {/* Address */}
          <div>
            <label className="block text-xl font-medium mb-1">Address</label>
            <textarea
              name="address"
              value={formData.address}
              onChange={handleChange}
              placeholder="Address"
              className="w-full  p-2 border border-gray-200 rounded-lg h-12"
            />
          </div>
        </div>

        {/* Update Button */}
        <Button 
                asChild
                type="submit"
                className="flex items-center mt-10  justify-center gap-2.5 px-8 py-2 self-stretch w-full bg-[#00ae34] rounded-[100px] shadow-shadow-01 h-auto hover:bg-[#009c2e]"
                >
                <span className="flex-1 [font-family:'Roboto',Helvetica] font-medium text-white text-base text-center tracking-[0] leading-6">
                Update
                </span>
        </Button>
      </form>
    </div>
  );
};

export default EditProfile;
