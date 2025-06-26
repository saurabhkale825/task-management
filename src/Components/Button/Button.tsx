import React from "react";

interface ButtonProps {
  data: string;
  className?: string;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
}

const Button: React.FC<ButtonProps> = ({ data, className, onClick }) => {
  return (
    <button className={className} onClick={onClick}>
      {data}
    </button>
  );
};

export default Button;
