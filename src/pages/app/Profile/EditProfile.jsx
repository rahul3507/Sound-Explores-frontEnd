import { useState } from "react";
import { ChevronLeft, MoreVertical } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "../../../components/ui/button";
import { StatusBar } from "../../../components/common/StatusBar";
import { useAuth } from "../../../contexts/AuthContext";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import toast from "react-hot-toast";
import { motion } from "framer-motion";

// Validation schema
const profileSchema = z.object({
  fullName: z.string().min(1, "Full name is required"),
  nickname: z.string().optional(),
  dateOfBirth: z.string().optional(),
  email: z.string().email("Invalid email address"),
  phone: z.string().optional(),
  address: z.string().optional(),
});

const EditProfile = () => {
  const { user, updateProfile } = useAuth();

  // React Hook Form with default values
  const {
    register,
    handleSubmit,
    formState: { errors, isDirty },
  } = useForm({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      fullName: user?.name || "",
      nickname: "",
      dateOfBirth: "",
      email: user?.email || "",
      phone: "",
      address: "",
    },
  });

  // Handle form submission
  const onSubmit = async (data) => {
    try {
      await updateProfile(data);
      toast.success("Profile updated successfully");
    } catch (error) {
      toast.error("Failed to update profile");
    }
  };

  return (
    <div className="bg-white flex flex-col h-full w-[375px] max-w-md mx-auto">
      <StatusBar />

      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b">
        <div className="flex items-center">
          <Link to="/profile" className="mr-2">
            <ChevronLeft className="w-6 h-6" />
          </Link>
          <h1 className="text-2xl font-bold">Edit Profile</h1>
        </div>
        <button>
          <MoreVertical className="w-6 h-6" />
        </button>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit(onSubmit)} className="flex-1 p-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="space-y-6"
        >
          {/* Full Name */}
          <div>
            <label className="block text-xl font-medium mb-1">Full Name</label>
            <input
              {...register("fullName")}
              placeholder="Enter your Full Name..."
              className={`w-full p-2 border ${
                errors.fullName ? "border-red-500" : "border-gray-200"
              } rounded-lg`}
            />
            {errors.fullName && (
              <span className="text-red-500 text-sm">
                {errors.fullName.message}
              </span>
            )}
          </div>

          {/* Nickname */}
          <div>
            <label className="block text-xl font-medium mb-1">Nickname</label>
            <input
              {...register("nickname")}
              placeholder="Enter your Nickname..."
              className="w-full p-2 border border-gray-200 rounded-lg"
            />
          </div>

          {/* Date of Birth */}
          <div>
            <label className="block text-xl font-medium mb-1">
              Date of Birth
            </label>
            <input
              type="date"
              {...register("dateOfBirth")}
              placeholder="Date of Birth"
              className="w-full p-2 border border-gray-200 rounded-lg"
            />
          </div>

          {/* Email */}
          <div>
            <label className="block text-xl font-medium mb-1">Email</label>
            <input
              type="email"
              {...register("email")}
              placeholder="Enter your Email..."
              className={`w-full p-2 border ${
                errors.email ? "border-red-500" : "border-gray-200"
              } rounded-lg`}
            />
            {errors.email && (
              <span className="text-red-500 text-sm">
                {errors.email.message}
              </span>
            )}
          </div>

          {/* Phone */}
          <div>
            <label className="block text-xl font-medium mb-1">Phone</label>
            <input
              type="tel"
              {...register("phone")}
              placeholder="Enter your Phone..."
              className="w-full p-2 border border-gray-200 rounded-lg"
            />
          </div>

          {/* Address */}
          <div>
            <label className="block text-xl font-medium mb-1">Address</label>
            <textarea
              {...register("address")}
              placeholder="Address"
              className="w-full p-2 border border-gray-200 rounded-lg h-12"
            />
          </div>
        </motion.div>

        {/* Update Button */}
        <Button
          type="submit"
          disabled={!isDirty}
          className="flex items-center mt-10 justify-center gap-2.5 px-8 py-2 self-stretch w-full bg-primary rounded-[100px] shadow-md h-auto hover:bg-primary/90 disabled:opacity-50"
        >
          <span className="flex-1 font-medium text-white text-base text-center tracking-[0] leading-6">
            Update
          </span>
        </Button>
      </form>
    </div>
  );
};

export default EditProfile;
