import React from 'react';
import { cn } from '../../lib/utils';
import { Link } from 'react-router-dom';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  asChild?: boolean;
  href?: string;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'primary', size = 'md', asChild, href, ...props }, ref) => {
    const baseClasses = "inline-flex items-center justify-center font-bold rounded-full transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none min-h-[44px] min-w-[44px]";
    
    const variants = {
      primary: "bg-primary text-white hover:bg-primary",
      secondary: "bg-[#EBE7DF] text-foreground hover:bg-[#DCD7CD]",
      outline: "border-2 border-[#EBE7DF] hover:bg-[#FDFBF7] text-foreground",
      ghost: "hover:bg-[#EBE7DF] text-foreground"
    };

    const sizes = {
      sm: "h-9 px-4 text-sm",
      md: "h-11 px-8 text-base",
      lg: "h-14 px-10 text-lg"
    };

    const classes = cn(baseClasses, variants[variant], sizes[size], className);

    if (href) {
      return (
        <Link to={href} className={classes}>
          {props.children}
        </Link>
      );
    }

    return (
      <button
        ref={ref}
        className={classes}
        {...props}
      />
    );
  }
);
Button.displayName = 'Button';
