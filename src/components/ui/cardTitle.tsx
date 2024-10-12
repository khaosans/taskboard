import React, { forwardRef, HTMLAttributes, ReactNode } from 'react';

interface CardTitleProps extends HTMLAttributes<HTMLHeadingElement> {
  children: ReactNode;
}

export const CardTitle = forwardRef<HTMLHeadingElement, CardTitleProps>(
  ({ children, ...props }, ref) => (
    <h2 ref={ref} {...props}>
      {children}
    </h2>
  )
);

CardTitle.displayName = 'CardTitle';