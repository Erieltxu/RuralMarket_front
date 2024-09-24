import React from 'react'

const ButtonGreen = ({ backgroundColor, textColor, href, children }) => {
  return (
    <button>
      <a
        href={href}
        className={`mt-4 inline-block ${backgroundColor} ${textColor} font-bold py-2 px-4 rounded-full transition duration-300 hover:opacity-80`}
      >
        {children}
      </a>
    </button>
  );
};

export default ButtonGreen