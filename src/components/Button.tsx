import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'outline';
}

const Button: React.FC<ButtonProps> = ({ children, variant = 'primary', ...props }) => {
  const baseClasses = "font-bold py-2 px-6 rounded-lg transition-all duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-black";
  const variantClasses = {
    primary: "bg-amber-500 text-black hover:bg-amber-600 shadow-lg shadow-amber-500/20 focus:ring-amber-500",
    outline: "border-2 border-amber-500 text-amber-500 hover:bg-amber-500 hover:text-black focus:ring-amber-500"
  };
  return (
    <button {...props} className={`${baseClasses} ${variantClasses[variant]}`}>
      {children}
    </button>
  );
};

export default Button;
