import React from "react";
import { X } from "react-feather"; // Ensure that react-feather is installed

const DetailEmployee = ({ open, onClose, children }) => {
  return (
    <div
      className={`
        fixed inset-0 flex justify-center items-center transition-colors ${open ? "visible bg-black/20" : "invisible"}`}
    >
      {/* modal */}
      <div
        onClick={(e) => e.stopPropagation()}
        className={`
          p-6 transition-all bg-white shadow rounded-xl ${open ? "scale-100 opacity-100" : "scale-125 opacity-0"}`}
      >
        <button onClick={onClose} className="absolute p-1 text-gray-400 bg-white rounded-lg top-2 right-2 hover:bg-gray-50 hover:text-gray-600">
          <X />
        </button>
        {children}
      </div>
    </div>
  );
};

export default DetailEmployee;
