import React from "react";

export function Button({ children, className = "", variant = "default", ...props }) {
  const styles = {
    default: "bg-blue-600 text-white hover:bg-blue-700",
    ghost: "bg-transparent text-white hover:bg-white hover:text-black",
  };

  return (
    <button
      className={`px-4 py-2 rounded-md transition ${styles[variant]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}
