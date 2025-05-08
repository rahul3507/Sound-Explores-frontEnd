import { useState } from "react";
import { ChevronLeft, MoreVertical, CreditCard } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "../../../components/ui/button";
import { StatusBar } from "../../../components/common/StatusBar";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import toast from "react-hot-toast";
import { motion } from "framer-motion";

// Validation schema
const paymentSchema = z.object({
  cardHolderName: z.string().min(1, "Card holder name is required"),
  cardNumber: z
    .string()
    .min(1, "Card number is required")
    .regex(/^[0-9]{16}$/, "Card number must be 16 digits"),
  expirationDate: z
    .string()
    .min(1, "Expiration date is required")
    .regex(
      /^(0[1-9]|1[0-2])\/[0-9]{2}$/,
      "Expiration date must be in MM/YY format"
    ),
  cvv: z
    .string()
    .min(1, "CVV is required")
    .regex(/^[0-9]{3,4}$/, "CVV must be 3 or 4 digits"),
});

const Payment = () => {
  // React Hook Form
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(paymentSchema),
    defaultValues: {
      cardHolderName: "",
      cardNumber: "",
      expirationDate: "",
      cvv: "",
    },
  });

  // Handle form submission
  const onSubmit = async (data) => {
    try {
      // In a real app, you would send this data to your payment processor
      console.log("Payment data:", data);
      toast.success("Payment information updated");
    } catch (error) {
      toast.error("Failed to update payment information");
    }
  };

  // Format card number with spaces
  const formatCardNumber = (e) => {
    const input = e.target.value.replace(/\D/g, "");
    const formatted = input.substring(0, 16);
    e.target.value = formatted;
  };

  // Format expiration date as MM/YY
  const formatExpirationDate = (e) => {
    let input = e.target.value.replace(/\D/g, "");

    if (input.length > 0) {
      const month = input.substring(0, 2);
      const year = input.substring(2, 4);

      if (input.length <= 2) {
        e.target.value = month;
      } else {
        e.target.value = `${month}/${year}`;
      }
    }
  };

  return (
    <div className="bg-white flex flex-row justify-center w-full">
      <div className="bg-white w-[375px] relative">
        <StatusBar />

        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b">
          <div className="flex items-center">
            <Link to="/profile" className="mr-2">
              <ChevronLeft className="w-6 h-6" />
            </Link>
            <h1 className="text-2xl font-bold">Payment</h1>
          </div>
          <button>
            <MoreVertical className="w-6 h-6" />
          </button>
        </div>

        {/* Card image */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="flex items-center justify-center mt-10"
        >
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="relative w-[300px] h-[180px] bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl shadow-lg overflow-hidden"
          >
            <div className="absolute top-4 left-4 right-4 flex justify-between items-center">
              <CreditCard className="text-white w-8 h-8" />
              <div className="text-white font-bold text-lg">PREMIUM</div>
            </div>

            <div className="absolute bottom-4 left-4">
              <div className="text-gray-200 text-xs mb-1">CARD HOLDER</div>
              <div className="text-white font-medium">JOHN DOE</div>
            </div>

            <div className="absolute bottom-4 right-4">
              <div className="text-gray-200 text-xs mb-1">EXPIRES</div>
              <div className="text-white font-medium">05/25</div>
            </div>

            <div className="absolute top-1/2 left-4 transform -translate-y-1/2">
              <div className="text-white font-mono text-xl">
                •••• •••• •••• 1234
              </div>
            </div>
          </motion.div>
        </motion.div>

        {/* Form */}
        <form onSubmit={handleSubmit(onSubmit)} className="flex-1 p-6">
          <div className="space-y-6">
            {/* Card Holder */}
            <div>
              <label className="block text-lg font-medium mb-1">
                Card Holder
              </label>
              <input
                type="text"
                {...register("cardHolderName")}
                placeholder="Card Holder Name"
                className={`w-full p-2 border ${
                  errors.cardHolderName ? "border-red-500" : "border-gray-200"
                } rounded-lg`}
              />
              {errors.cardHolderName && (
                <span className="text-red-500 text-sm">
                  {errors.cardHolderName.message}
                </span>
              )}
            </div>

            {/* Card Number */}
            <div>
              <label className="block text-lg font-medium mb-1">
                Card Number
              </label>
              <input
                type="text"
                {...register("cardNumber")}
                onChange={formatCardNumber}
                placeholder="XXXX XXXX XXXX XXXX"
                maxLength={16}
                className={`w-full p-2 border ${
                  errors.cardNumber ? "border-red-500" : "border-gray-200"
                } rounded-lg`}
              />
              {errors.cardNumber && (
                <span className="text-red-500 text-sm">
                  {errors.cardNumber.message}
                </span>
              )}
            </div>

            <div className="flex space-x-4">
              {/* Expiration Date */}
              <div className="w-1/2">
                <label className="block text-lg font-medium mb-1">MM/YY</label>
                <input
                  type="text"
                  {...register("expirationDate")}
                  onChange={formatExpirationDate}
                  placeholder="MM/YY"
                  maxLength={5}
                  className={`w-full p-2 border ${
                    errors.expirationDate ? "border-red-500" : "border-gray-200"
                  } rounded-lg`}
                />
                {errors.expirationDate && (
                  <span className="text-red-500 text-sm">
                    {errors.expirationDate.message}
                  </span>
                )}
              </div>

              {/* CVV */}
              <div className="w-1/2">
                <label className="block text-lg font-medium mb-1">CVV</label>
                <input
                  type="text"
                  {...register("cvv")}
                  placeholder="CVV"
                  maxLength={4}
                  className={`w-full p-2 border ${
                    errors.cvv ? "border-red-500" : "border-gray-200"
                  } rounded-lg`}
                />
                {errors.cvv && (
                  <span className="text-red-500 text-sm">
                    {errors.cvv.message}
                  </span>
                )}
              </div>
            </div>
          </div>

          {/* Update Button */}
          <Button
            type="submit"
            className="flex items-center mt-10 justify-center gap-2.5 px-8 py-2 self-stretch w-full bg-primary rounded-[100px] shadow-md h-auto hover:bg-primary/90"
          >
            <span className="flex-1 font-medium text-white text-base text-center tracking-[0] leading-6">
              Update Payment Method
            </span>
          </Button>
        </form>
      </div>
    </div>
  );
};

export default Payment;
