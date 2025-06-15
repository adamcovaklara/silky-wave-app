import React from "react";

const styles = {
  default:
    "bg-gradient-to-r from-pink-300 via-purple-300 to-blue-300 text-gray-900 hover:from-blue-300 hover:via-purple-300 hover:to-pink-300 hover:text-gray-800",
  ghost: "bg-transparent text-purple-600 hover:text-purple-500",
};

export function Button({ variant = "default", className = "", ...props }) {
  return (
    <button className={`${styles[variant]} px-4 py-2 rounded-md transition ${className}`} {...props} />
  );
}
