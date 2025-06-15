import React from "react";

export function Card({ children, className }) {
  return <div className={`rounded-2xl bg-white p-6 ${className}`}>{children}</div>;
}

export function CardContent({ children, className }) {
  return <div className={`text-center ${className}`}>{children}</div>;
}
