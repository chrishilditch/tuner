interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {}

const IconButton = ({ children, className, ...props }: ButtonProps) => {
  return (
    <button
      {...props}
      className="bg-tuner-dark-turquoise text-white px-4 py-2 text-4 font-light cursor-pointer flex flex-col items-center rounded-md"
    >
      {children}
    </button>
  );
};

export default IconButton;
