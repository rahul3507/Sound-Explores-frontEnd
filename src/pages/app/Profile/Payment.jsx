import { useState } from "react";
import { ChevronLeft, MoreVertical, CreditCard } from "lucide-react";
import { Link } from "react-router-dom";
import { StatusBar } from "../../../components/common/StatusBar";
import { motion } from "framer-motion";
import toast from "react-hot-toast";

const Payment = () => {
  const [formData, setFormData] = useState({
    cardHolderName: "",
    cardNumber: "",
    expirationDate: "",
    cvv: "",
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

  // Format card number
  const formatCardNumber = (e) => {
    const input = e.target.value.replace(/\D/g, "");
    const formatted = input.substring(0, 16);
    setFormData((prev) => ({ ...prev, cardNumber: formatted }));
  };

  // Format expiration date as MM/YY
  const formatExpirationDate = (e) => {
    let input = e.target.value.replace(/\D/g, "");

    if (input.length > 0) {
      const month = input.substring(0, 2);
      const year = input.substring(2, 4);

      if (input.length <= 2) {
        setFormData((prev) => ({ ...prev, expirationDate: month }));
      } else {
        setFormData((prev) => ({
          ...prev,
          expirationDate: `${month}/${year}`,
        }));
      }
    } else {
      setFormData((prev) => ({ ...prev, expirationDate: "" }));
    }
  };

  // Validate form
  const validateForm = () => {
    const newErrors = {};

    if (!formData.cardHolderName.trim()) {
      newErrors.cardHolderName = "Card holder name is required";
    }

    if (!formData.cardNumber.trim()) {
      newErrors.cardNumber = "Card number is required";
    } else if (!/^[0-9]{16}$/.test(formData.cardNumber)) {
      newErrors.cardNumber = "Card number must be 16 digits";
    }

    if (!formData.expirationDate.trim()) {
      newErrors.expirationDate = "Expiration date is required";
    } else if (!/^(0[1-9]|1[0-2])\/[0-9]{2}$/.test(formData.expirationDate)) {
      newErrors.expirationDate = "Expiration date must be in MM/YY format";
    }

    if (!formData.cvv.trim()) {
      newErrors.cvv = "CVV is required";
    } else if (!/^[0-9]{3,4}$/.test(formData.cvv)) {
      newErrors.cvv = "CVV must be 3 or 4 digits";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();

    if (validateForm()) {
      try {
        // In a real app, you would send this data to your payment processor
        console.log("Payment data:", formData);
        toast.success("Payment information updated");
      } catch (error) {
        toast.error("Failed to update payment information");
      }
    }
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
            <h1 className="text-xl font-bold">Payment</h1>
          </div>
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="p-2 rounded-full hover:bg-gray-100 transition-colors"
          >
            <MoreVertical className="w-5 h-5" />
          </motion.button>
        </motion.div>

        {/* Card image */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="flex items-center justify-center mt-6 mb-4"
        >
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="relative w-[300px] h-[180px] bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl shadow-lg overflow-hidden"
          >
            <div className="absolute top-4 left-4 right-4 flex justify-between items-center">
              <CreditCard className="text-white w-6 h-6" />
              <div className="text-white font-bold text-lg">PREMIUM</div>
            </div>

            <div className="absolute bottom-4 left-4">
              <div className="text-gray-200 text-xs mb-1">CARD HOLDER</div>
              <div className="text-white font-medium">
                {formData.cardHolderName || "YOUR NAME"}
              </div>
            </div>

            <div className="absolute bottom-4 right-4">
              <div className="text-gray-200 text-xs mb-1">EXPIRES</div>
              <div className="text-white font-medium">
                {formData.expirationDate || "MM/YY"}
              </div>
            </div>

            <div className="absolute top-1/2 left-4 transform -translate-y-1/2">
              <div className="text-white font-mono text-xl">
                {formData.cardNumber
                  ? `•••• •••• •••• ${formData.cardNumber.slice(-4)}`
                  : "•••• •••• •••• ••••"}
              </div>
            </div>
          </motion.div>
        </motion.div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.2 }}
            className="space-y-4"
          >
            {/* Card Holder */}
            <div>
              <label className="block text-base font-medium mb-1">
                Card Holder
              </label>
              <input
                type="text"
                name="cardHolderName"
                value={formData.cardHolderName}
                onChange={handleChange}
                placeholder="Card Holder Name"
                className={`w-full p-3 border ${
                  errors.cardHolderName ? "border-red-500" : "border-gray-200"
                } rounded-lg`}
              />
              {errors.cardHolderName && (
                <span className="text-red-500 text-sm mt-1 block">
                  {errors.cardHolderName}
                </span>
              )}
            </div>

            {/* Card Number */}
            <div>
              <label className="block text-base font-medium mb-1">
                Card Number
              </label>
              <input
                type="text"
                name="cardNumber"
                value={formData.cardNumber}
                onChange={(e) => {
                  handleChange(e);
                  formatCardNumber(e);
                }}
                placeholder="XXXX XXXX XXXX XXXX"
                maxLength={16}
                className={`w-full p-3 border ${
                  errors.cardNumber ? "border-red-500" : "border-gray-200"
                } rounded-lg`}
              />
              {errors.cardNumber && (
                <span className="text-red-500 text-sm mt-1 block">
                  {errors.cardNumber}
                </span>
              )}
            </div>

            <div className="flex space-x-4">
              {/* Expiration Date */}
              <div className="w-1/2">
                <label className="block text-base font-medium mb-1">
                  MM/YY
                </label>
                <input
                  type="text"
                  name="expirationDate"
                  value={formData.expirationDate}
                  onChange={(e) => {
                    handleChange(e);
                    formatExpirationDate(e);
                  }}
                  placeholder="MM/YY"
                  maxLength={5}
                  className={`w-full p-3 border ${
                    errors.expirationDate ? "border-red-500" : "border-gray-200"
                  } rounded-lg`}
                />
                {errors.expirationDate && (
                  <span className="text-red-500 text-sm mt-1 block">
                    {errors.expirationDate}
                  </span>
                )}
              </div>

              {/* CVV */}
              <div className="w-1/2">
                <label className="block text-base font-medium mb-1">CVV</label>
                <input
                  type="text"
                  name="cvv"
                  value={formData.cvv}
                  onChange={handleChange}
                  placeholder="CVV"
                  maxLength={4}
                  className={`w-full p-3 border ${
                    errors.cvv ? "border-red-500" : "border-gray-200"
                  } rounded-lg`}
                />
                {errors.cvv && (
                  <span className="text-red-500 text-sm mt-1 block">
                    {errors.cvv}
                  </span>
                )}
              </div>
            </div>
          </motion.div>

          {/* Update Button */}
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            type="submit"
            className="w-full mt-6 py-3 px-4 bg-blue-500 text-white rounded-full font-medium shadow-md hover:bg-blue-600 transition-colors"
          >
            Update Payment Method
          </motion.button>
        </form>
      </div>
    </div>
  );
};

export default Payment;
