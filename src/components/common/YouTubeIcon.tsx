import React from 'react';

interface YouTubeIconProps {
  className?: string;
}

/**
 * Pixel-perfect official YouTube brand icon
 * Standard YouTube red (#FF0000) rounded pill with crisp white triangle
 */
export default function YouTubeIcon({ className = 'w-5 h-5' }: YouTubeIconProps) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-label="YouTube"
    >
      <path
        d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814z"
        fill="#FF0000"
      />
      <path d="m9.75 15.5 6.25-3.5-6.25-3.5v7z" fill="#FFFFFF" />
    </svg>
  );
}
