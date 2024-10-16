import React from 'react'; 

const ButtonGreen = ({ backgroundColor, textColor, onClick, children }) => {
  return (
    <button
      onClick={onClick}
      className={`mt-4 inline-block ${backgroundColor} ${textColor} font-bold py-2 px-4 rounded-full transition duration-300 hover:opacity-80`}
    >
      {children}
    </button>
  );
};

export default ButtonGreen;
