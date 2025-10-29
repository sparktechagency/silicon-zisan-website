export default function Container({
  children,
  className = "",
}: {
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <div
      className={`max-w-5xl 2xl:max-w-7xl mx-auto w-full px-10 xl:px-5 ${className}`}
    >
      {children}
    </div>
  );
}
