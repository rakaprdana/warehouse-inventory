import React from "react";

interface ButtonProps {
  text: string;
  onClick?: () => void;
  variant?: "primary" | "delete" | "submit";
  type?: "submit" | "button";
}

export const Button: React.FC<ButtonProps> = ({
  onClick,
  text,
  type,
  variant = "primary",
}) => {
  const getVariantClass = () => {
    switch (variant) {
      case "delete":
        return "w-full max-w-28 bg-buttonCancel hover:bg-red-700 text-white"; // Warna merah untuk delete
      case "submit":
        return "w-28 bg-white border border-foreBackground text-gray-700 hover:bg-gray-50"; // Warna putih untuk submit
      case "primary":
      default:
        return "w-full max-w-xl bg-gradient-to-r from-primary to-secondary text-white"; // Gradient untuk primary
    }
  };

  return (
    <button
      type={type}
      onClick={onClick}
      className={`p-3 font-semibold rounded-lg shadow-md hover:opacity-90 transition duration-200 ${getVariantClass()}`}
    >
      {text}
    </button>
  );
};
