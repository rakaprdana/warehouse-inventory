import React from "react";

interface ButtonProps {
  text: string;
  onClick?: () => void;
  variant?: "primary" | "delete" | "submit";
}

export const Button: React.FC<ButtonProps> = ({
  onClick,
  text,
  variant = "primary",
}) => {
  const getVariantClass = () => {
    switch (variant) {
      case "delete":
        return "bg-red-600 hover:bg-red-700 text-white"; // Warna merah untuk delete
      case "submit":
        return "bg-white border border-foreBackground text-gray-700 hover:bg-gray-50"; // Warna putih untuk submit
      case "primary":
      default:
        return "bg-gradient-to-r from-primary to-secondary text-white"; // Gradient untuk primary
    }
  };

  return (
    <button
      onClick={onClick}
      className={`w-full max-w-xl p-3 font-semibold rounded-lg shadow-md hover:opacity-90 transition duration-200 ${getVariantClass()}`}
    >
      {text}
    </button>
  );
};
