import React from 'react';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  title?: string;
}

export default function Card({ children, className = '', title }: CardProps) {
  return (
    <div className={`bg-white dark:bg-slate-800 rounded-lg shadow-md p-6 ${className}`}>
      {title && (
        <h3 className="text-xl font-bold mb-4 text-slate-900 dark:text-slate-100">
          {title}
        </h3>
      )}
      {children}
    </div>
  );
}




