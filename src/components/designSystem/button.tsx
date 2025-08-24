interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "dark-turquoise" | "turquoise";
  progress?: number;
}

const Button = ({
  children,
  className,
  variant = "dark-turquoise",
  progress,
  ...props
}: ButtonProps) => {
  return (
    <button
      {...props}
      className={
        variant === "dark-turquoise"
          ? "relative bg-tuner-dark-turquoise text-white px-8 py-1 cursor-pointer rounded-sm"
          : "relative bg-tuner-turquoise text-white px-8 py-1 cursor-pointer rounded-sm"
      }
    >
      {progress !== undefined && (
        <span
          className={`absolute h-full bg-tuner-dark-turquoise top-0 left-0 z-0 transition-all w-0 opacity-50`}
          style={{
            width: `${progress}%`,
          }}
        ></span>
      )}
      {children}
    </button>
  );
};

export default Button;
