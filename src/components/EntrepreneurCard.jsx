// EntrepreneurCard.jsx
import React from 'react';

const EntrepreneurCard = ({ name, description, image }) => {
  return (
    <div className="bg-white rounded-lg shadow-lg p-4 text-center">
      <img
        src={image}
        alt={name}
        className="w-full h-64 object-cover rounded-t-lg"
      />
      <div className="mt-4">
        <h3 className="text-xl font-bold">{name}</h3>
        <p className="text-sm text-gray-500">{description}</p>
      </div>
    </div>
  );
};

export default EntrepreneurCard;
