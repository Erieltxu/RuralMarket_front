import React from 'react';

const EntrepreneurCard = ({ name, image }) => {
  return (
    <div className="bg-white rounded-lg shadow-lg p-4 text-center">
      <img
        src={image}
        alt={name}
        className="w-full h-64 object-cover rounded-t-lg"
      />
      <div className="mt-4">
        <h3 className="text-xl font-bold">{name}</h3>
      </div>
    </div>
  );
};

export default EntrepreneurCard;
