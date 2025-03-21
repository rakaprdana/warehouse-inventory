interface ButtonProps {
  text: string;
  onClick: () => void;
}

export const Button = ({ onClick, text }: ButtonProps) => {
  return (
    <button
      onClick={onClick}
      className="w-full p-3 bg-gradient-to-r from-primary to-secondary text-white font-semibold rounded-lg shadow-md hover:opacity-90 transition duration-200"
    >
      {text}
    </button>
  );
};
