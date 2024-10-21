import React from 'react';
import { cn } from "@/utils/cn";

export const Input: React.FC<React.InputHTMLAttributes<HTMLInputElement>> = (props) => (
  <input {...props} className={cn(
    "rounded-md h-8 text-sm px-4 py-2 bg-inherit border",
    props.className,
  )} />
);
