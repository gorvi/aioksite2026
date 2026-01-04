import React from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

export default function Input({
  label,
  error,
  className = '',
  ...props
}: InputProps) {
  const inputStyles = 'w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary transition-all';
  const errorStyles = error ? 'border-red-500 focus:ring-red-500' : 'border-slate-300 dark:border-slate-600';
  
  return (
    <div className="w-full">
      {label && (
        <label className="block text-sm font-medium mb-1 text-slate-700 dark:text-slate-300">
          {label}
        </label>
      )}
      <input
        className={`${inputStyles} ${errorStyles} ${className}`}
        {...props}
      />
      {error && (
        <p className="mt-1 text-sm text-red-600 dark:text-red-400">{error}</p>
      )}
    </div>
  );
}




