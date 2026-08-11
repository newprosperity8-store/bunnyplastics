import React from 'react';
import { cn } from '../../lib/utils';

interface ImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  eager?: boolean;
  width: number | string;
  height: number | string;
  alt: string; // Enforce alt tag for SEO and accessibility
}

export const Image = React.forwardRef<HTMLImageElement, ImageProps>(
  ({ className, eager = false, width, height, alt, ...props }, ref) => {
    return (
      <img
        ref={ref}
        width={width}
        height={height}
        alt={alt}
        loading={eager ? 'eager' : 'lazy'}
        // @ts-ignore - React types might not fully support fetchpriority yet
        fetchpriority={eager ? 'high' : 'auto'}
        className={cn("object-cover", className)}
        {...props}
      />
    );
  }
);
Image.displayName = 'Image';
