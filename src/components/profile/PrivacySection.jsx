import React from 'react'

export const PrivacySection = ({item}) => {
    const { id,title, desc } = item;
  return (
    <div className="mb-6 p-4">
        <h2 className="text-lg font-bold mb-2">{id}. {title}</h2>
        <p className="text-sm text-gray-700 leading-relaxed">
            {desc}
        </p>
      </div>
  )
}
