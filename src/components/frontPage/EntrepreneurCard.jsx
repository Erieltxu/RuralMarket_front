import React from 'react';

const EntrepreneurCard = ({ name, image }) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-4 text-center h-full flex flex-col justify-between">
      <img
        src={image}
        alt={name}
        className="w-full h-64 object-cover rounded-lg lg:h-72 xl:h-80"   // Ajuste de la altura en pantallas grandes
      />
      <div className="mt-5">
        <h3 className="text-xl font-bold">{name}</h3>
      </div>
    </div>
  );
};

export default EntrepreneurCard;
