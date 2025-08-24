type SelectProps = React.SelectHTMLAttributes<HTMLSelectElement>;

const Select = ({ children, className, ...props }: SelectProps) => {
  return (
    <select
      {...props}
      className={`ml-2 px-2 py-1 border rounded-sm bg-tuner-dark-turquoise text-white ${className}`}
    >
      {children}
    </select>
  );
};

export default Select;
