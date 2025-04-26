import React from "react"
import { motion } from "framer-motion"

// Define variants and sizes
type ButtonVariant = "primary" | "secondary" | "outline"
type ButtonSize = "sm" | "md" | "lg"

// Props interface extending button attributes
interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant
  size?: ButtonSize
  children: React.ReactNode
}

// Cast motion.button properly for TypeScript
const MotionButton = motion.button as React.ElementType

const Button: React.FC<ButtonProps> = ({
  variant = "primary",
  size = "md",
  children,
  className = "",
  ...props
}) => {
  // Base style
  const baseStyles =
    "font-medium rounded-lg transition-all focus:outline-none focus:ring-2 focus:ring-offset-2"

  // Style variants
  const variantStyles = {
    primary:
      "bg-gradient-to-r from-primary-600 to-primary-700 text-white hover:from-primary-700 hover:to-primary-800 focus:ring-primary-500",
    secondary:
      "bg-gray-100 text-gray-900 hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-100 dark:hover:bg-gray-600 focus:ring-gray-500",
    outline:
      "border border-gray-300 dark:border-gray-600 bg-transparent text-gray-900 dark:text-gray-100 hover:bg-gray-50 dark:hover:bg-gray-800 focus:ring-gray-500",
    highlight: "bg-black text-blue-600 hover:bg-blue-50 focus:ring-blue-500",
  }

  // Size variants
  const sizeStyles = {
    sm: "py-1.5 px-3 text-sm",
    md: "py-2 px-4 text-base",
    lg: "py-3 px-6 text-lg",
  }

  // Combine all class names
  const combinedClassName = `${baseStyles} ${variantStyles[variant]} ${sizeStyles[size]} ${className}`

  return (
    <MotionButton
      className={combinedClassName}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.98 }}
      {...props}
    >
      {children}
    </MotionButton>
  )
}

export default Button
