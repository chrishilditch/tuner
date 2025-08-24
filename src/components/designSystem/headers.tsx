interface H1Props {
  children: React.ReactNode;
}

export const H1 = ({ children }: H1Props) => {
  return <h1 className="text-4xl font-bold mb-4">{children}</h1>;
};
