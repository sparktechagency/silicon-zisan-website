import React from "react";

export default function Container({
  children,
  className,
}: {
  className?: string;
  children: React.ReactNode;
}) {
  return <div className={`max-w-7xl mx-auto ${className}`}>{children}</div>;
}
