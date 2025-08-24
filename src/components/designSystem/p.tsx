interface PProps {
  children: React.ReactNode;
}

export const P = ({ children }: PProps) => {
  return (
    <p className="text-lg text-gray-700 max-w-2xl text-center mb-4">
      {children}
    </p>
  );
};
