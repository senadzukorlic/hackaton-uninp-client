import React, { useState } from 'react';
import { motion } from 'framer-motion';

interface FormInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
}

const FormInput: React.FC<FormInputProps> = ({ 
  label, 
  error, 
  id, 
  type = 'text',
  className = '',
  ...props 
}) => {
  const [isFocused, setIsFocused] = useState(false);
  const [hasValue, setHasValue] = useState(!!props.value);
  
  const handleFocus = (e: React.FocusEvent<HTMLInputElement>) => {
    setIsFocused(true);
    if (props.onFocus) props.onFocus(e);
  };
  
  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    setIsFocused(false);
    if (props.onBlur) props.onBlur(e);
  };
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setHasValue(!!e.target.value);
    if (props.onChange) props.onChange(e);
  };
  
  const isActive = isFocused || hasValue;
  
  return (
    <div className={`relative mb-6 ${className}`}>
      <motion.div 
        className="relative"
        initial={false}
        animate={error ? { x: [0, -5, 5, -5, 5, 0] } : {}}
        transition={{ duration: 0.4 }}
      >
        <input
          id={id}
          type={type}
          className={`
            block w-full px-4 pt-6 pb-2 bg-white dark:bg-gray-800 border rounded-lg text-gray-900 dark:text-white 
            focus:outline-none focus:ring-2 transition-all duration-200
            ${error 
              ? 'border-error-500 focus:border-error-500 focus:ring-error-500/50' 
              : 'border-gray-300 dark:border-gray-600 focus:border-primary-500 focus:ring-primary-500/50'
            }
          `}
          placeholder=" "
          onFocus={handleFocus}
          onBlur={handleBlur}
          onChange={handleChange}
          {...props}
        />
        <label
          htmlFor={id}
          className={`
            absolute left-4 top-4 origin-[0] transform transition-all duration-200
            ${isActive ? 'text-xs -translate-y-3' : 'text-base'}
            ${error 
              ? 'text-error-500' 
              : isActive
                ? 'text-primary-600 dark:text-primary-400'
                : 'text-gray-500 dark:text-gray-400'
            }
          `}
        >
          {label}
        </label>
      </motion.div>
      
      {error && (
        <motion.p 
          className="mt-1 text-error-500 text-sm" 
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
        >
          {error}
        </motion.p>
      )}
    </div>
  );
};

export default FormInput;