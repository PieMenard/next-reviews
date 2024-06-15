export interface HeadingProps {
  children: React.ReactNode;
}

export default function Heading({ children }: HeadingProps) {
  return (
    <h1 className={`font-bold font-orbitron pb-3 text-2xl`}>{children}</h1>
  );
}
