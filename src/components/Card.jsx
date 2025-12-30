import React from "react";

export default function Card({ children, className = "", onClick }) {
  return (
    <div
      onClick={onClick}
      className={`
        bg-gray-800 
        border border-gray-700 
        rounded-xl 
        p-6 
        shadow-lg 
        ${onClick ? "cursor-pointer hover:border-blue-500 transition" : ""}
        ${className}
      `}
    >
      {children}
    </div>
  );
}
