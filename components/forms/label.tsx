import React from "react";

export const Label: React.FC<React.LabelHTMLAttributes<HTMLLabelElement>> = ({ children, ...props }) => (
  <label {...props} className="block text-sm font-medium text-gray-700">
    {children}
  </label>
);
