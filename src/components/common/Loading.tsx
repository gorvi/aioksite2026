import React from 'react';

interface LoadingProps {
  size?: 'sm' | 'md' | 'lg';
  text?: string;
}

export default function Loading({ size = 'md', text }: LoadingProps) {
  const sizeStyles = {
    sm: 'w-4 h-4',
    md: 'w-8 h-8',
    lg: 'w-12 h-12',
  };
  
  return (
    <div className="flex flex-col items-center justify-center gap-2">
      <div
        className={`${sizeStyles[size]} border-4 border-primary border-t-transparent rounded-full animate-spin`}
      />
      {text && (
        <p className="text-sm text-slate-600 dark:text-slate-400">{text}</p>
      )}
    </div>
  );
}




