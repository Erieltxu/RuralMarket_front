import React from 'react';

const EntrepreneurCard = ({ name, image }) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-4 text-center"> {/* Padding de 2 y sombra ligera */}
      <img
        src={image}
        alt={name}
        className="w-full h-64 object-cover rounded-lg"  
      />
      <div className="mt-5">  {/* Espacio entre la imagen y el nombre */}
        <h3 className="text-xl font-bold">{name}</h3>
      </div>
    </div>
  );
};

export default EntrepreneurCard;
