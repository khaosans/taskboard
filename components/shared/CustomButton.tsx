import React, { ReactNode } from 'react';
import { Button } from '@/components/ui/button';

interface CustomButtonProps {
  children: ReactNode;
  [key: string]: any;
}

const CustomButton: React.FC<CustomButtonProps> = ({ children, ...props }) => {
  return <Button {...props}>{children}</Button>;
};

export default CustomButton;