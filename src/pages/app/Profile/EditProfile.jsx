import { useState } from "react";
import { ChevronLeft, MoreVertical } from "lucide-react";
import { Link } from "react-router-dom";
import { StatusBar } from "../../../components/common/StatusBar";
import { useAuth } from "../../../contexts/AuthContext";
import { motion } from "framer-motion";
import toast from "react-hot-toast";

const EditProfile = () => {
  const { user, updateProfile } = useAuth();
  const [formData, setFormData] = useState({
    fullName: user?.name || "",
    nickname: "",
    dateOfBirth: "",
    email: user?.email || "",
    phone: "",
    address: "",
  });
  const [errors, setErrors] = useState({});

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    // Clear error when field is edited
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  // Validate form
  const validateForm = () => {
    const newErrors = {};

    if (!formData.fullName.trim()) {
      newErrors.fullName = "Full name is required";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Invalid email address";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (validateForm()) {
      try {
        await updateProfile(formData);
        toast.success("Profile updated successfully");
      } catch (error) {
        toast.error("Failed to update profile");
      }
    }
  };

  // Check if form is dirty (has changes)
  const isDirty = () => {
    return (
      formData.fullName !== (user?.name || "") ||
      formData.email !== (user?.email || "") ||
      formData.nickname !== "" ||
      formData.dateOfBirth !== "" ||
      formData.phone !== "" ||
      formData.address !== ""
    );
  };

  return (
    <div className="bg-gray-50 flex flex-row justify-center w-full min-h-screen">
      <div className="bg-white w-full max-w-md relative shadow-md">
        <StatusBar />

        {/* Header */}
        <motion.div
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.3 }}
          className="flex items-center justify-between p-4 border-b bg-white sticky top-0 z-10"
        >
          <div className="flex items-center">
            <Link to="/profile">
              <motion.div
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="p-2 rounded-full hover:bg-gray-100 transition-colors"
              >
                <ChevronLeft className="w-5 h-5" />
              </motion.div>
            </Link>
            <h1 className="text-xl font-bold">Edit Profile</h1>
          </div>
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="p-2 rounded-full hover:bg-gray-100 transition-colors"
          >
            <MoreVertical className="w-5 h-5" />
          </motion.button>
        </motion.div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="space-y-4"
          >
            {/* Full Name */}
            <div>
              <label className="block text-base font-medium mb-1">
                Full Name
              </label>
              <input
                type="text"
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                placeholder="Enter your Full Name..."
                className={`w-full p-3 border ${
                  errors.fullName ? "border-red-500" : "border-gray-200"
                } rounded-lg`}
              />
              {errors.fullName && (
                <span className="text-red-500 text-sm mt-1 block">
                  {errors.fullName}
                </span>
              )}
            </div>

            {/* Nickname */}
            <div>
              <label className="block text-base font-medium mb-1">
                Nickname
              </label>
              <input
                type="text"
                name="nickname"
                value={formData.nickname}
                onChange={handleChange}
                placeholder="Enter your Nickname..."
                className="w-full p-3 border border-gray-200 rounded-lg"
              />
            </div>

            {/* Date of Birth */}
            <div>
              <label className="block text-base font-medium mb-1">
                Date of Birth
              </label>
              <input
                type="date"
                name="dateOfBirth"
                value={formData.dateOfBirth}
                onChange={handleChange}
                className="w-full p-3 border border-gray-200 rounded-lg"
              />
            </div>

            {/* Email */}
            <div>
              <label className="block text-base font-medium mb-1">Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Enter your Email..."
                className={`w-full p-3 border ${
                  errors.email ? "border-red-500" : "border-gray-200"
                } rounded-lg`}
              />
              {errors.email && (
                <span className="text-red-500 text-sm mt-1 block">
                  {errors.email}
                </span>
              )}
            </div>

            {/* Phone */}
            <div>
              <label className="block text-base font-medium mb-1">Phone</label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="Enter your Phone..."
                className="w-full p-3 border border-gray-200 rounded-lg"
              />
            </div>

            {/* Address */}
            <div>
              <label className="block text-base font-medium mb-1">
                Address
              </label>
              <textarea
                name="address"
                value={formData.address}
                onChange={handleChange}
                placeholder="Address"
                className="w-full p-3 border border-gray-200 rounded-lg h-20 resize-none"
              />
            </div>
          </motion.div>

          {/* Update Button */}
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            type="submit"
            disabled={!isDirty()}
            className="w-full mt-6 py-3 px-4 bg-blue-500 text-white rounded-full font-medium shadow-md disabled:opacity-50 disabled:cursor-not-allowed hover:bg-blue-600 transition-colors"
          >
            Update
          </motion.button>
        </form>
      </div>
    </div>
  );
};

export default EditProfile;
