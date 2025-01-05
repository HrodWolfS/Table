import React from "react";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

const BackButton = ({ href = "/", label = "Retour", className = "" }) => {
  return (
    <Link
      href={href}
      className={`inline-flex items-center px-4 py-2 border-2 border-blue-600 
        rounded-lg text-blue-600 hover:bg-blue-600 hover:text-white 
        transition-all duration-200 ${className}`}
    >
      <ArrowLeft className="mr-2" size={20} />
      {label}
    </Link>
  );
};

export default BackButton;
