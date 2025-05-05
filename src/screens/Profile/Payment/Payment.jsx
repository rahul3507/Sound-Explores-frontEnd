import { ArrowLeft, ChevronLeft, MoreVertical } from 'lucide-react'
import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { Button } from '../../../components/ui/button'

export const Payment = () => {
    const [formData, setFormData] = useState(
        {
            
            cardHolderName: "",
            cardNumber: "",
            expirationDate: "",
            cvv: ""
        }
    )

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
          ...formData,
          [name]: value
        });
      };

      const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Form submitted:", formData);
        // Here you would typically send the data to your backend
    };
  return (
    <div className='bg-white flex flex-row justify-center w-full mt-12'>
        <div className='bg-white w-[375px] h-[812px] relative'>
            {/* Header */}
            <div className="flex items-center justify-between p-0 border-b">
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

            {/* Card image */}
            <div className='flex  w-[235] h-[210px] items-center justify-center mt-10'>
                <img 
                    src="/card.png" 
                    alt="Card" 
                    className="w-full h-full object-cover"
                />
            </div>

            {/* Form */}
      <form onSubmit={handleSubmit} className="flex-1 p-6">
        <div className="space-y-6">
          {/* Full Name */}
          <div>
            <label className="block text-lg font-medium mb-1">Card Holder</label>
            <input
              type="text"
              name="cardHolderName"
              value={formData.cardHolderName}
              onChange={handleChange}
              placeholder="Card Holder"
              className="w-full p-2 border border-gray-200 rounded-lg"
            />
          </div>

          {/* Nickname */}
          <div>
            <label className="block text-lg font-medium mb-1">Card Number</label>
            <input
              type="tel"
              name="cardNumber"
              value={formData.cardNumber}
              onChange={handleChange}
              placeholder="Enter your Phone..."
              className="w-full p-2 border border-gray-200 rounded-lg"
            />
          </div>

          <div className="flex space-x-4">
            <div className="w-1/2">
              <label className="block text-lg font-medium mb-1">MM/YY</label>
              <input
                type="text"
                name="expirationDate"
                value={formData.expirationDate}
                onChange={handleChange}
                placeholder="MM/YY"
                className="w-full p-2 border border-gray-200 rounded-lg"
              />
            </div>
            <div className="w-1/2">
              <label className="block text-lg font-medium mb-1">CVV</label>
              <input
                type="text"
                name="cvv"
                value={formData.cvv}
                onChange={handleChange}
                placeholder="CVV"
                className="w-full p-2 border border-gray-200 rounded-lg"
              />
            </div>
          </div>

        </div>

        
        {/* Update Button */}
        <Button 
                
                type="submit"
                className="flex items-center mt-10  justify-center gap-2.5 px-8 py-2 self-stretch w-full bg-[#00ae34] rounded-[100px] shadow-shadow-01 h-auto hover:bg-[#009c2e]"
                >
                <span className="flex-1 [font-family:'Roboto',Helvetica] font-medium text-white text-base text-center tracking-[0] leading-6">
                Update
                </span>
        </Button>
      </form>


            

        </div>
    </div>
  )
}
