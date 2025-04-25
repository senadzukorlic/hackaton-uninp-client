import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import FormInput from './FormInput';
import Button from './Button';
import  axios from "axios"
const AuthCard: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'login' | 'signup'>('login');
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validateForm = (formData: Record<string, string>) => {
    const newErrors: Record<string, string> = {};
 
    if (activeTab === 'signup') {
      if (!formData.username?.trim()) {
        newErrors.username = 'Name is required';
      }
      
      if (!formData.password?.trim()) {
        newErrors.password = 'Password is required';
      } else if (formData.password.length < 8) {
        newErrors.password = 'Password must be at least 8 characters';
      }
      
      if (formData.password !== formData.confirmPassword) {
        newErrors.confirmPassword = 'Passwords do not match';
      }
    }
    
    if (!formData.email?.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Invalid email address';
    }
    
    if (activeTab === 'login' && !formData.password?.trim()) {
      newErrors.password = 'Password is required';
    }
    
    return newErrors;
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const formData = new FormData(e.target as HTMLFormElement);
    const formValues: Record<string, string> = {};
    
    formData.forEach((value, key) => {
      formValues[key] = value.toString();
    });
   
    const formErrors = validateForm(formValues);
    setErrors(formErrors);
    
    if (Object.keys(formErrors).length === 0) {
      // Normally we would handle form submission here
    
      if(activeTab === "signup"){
       await  axios.post("http://localhost:8080/api/auth/register",formValues).then((res)=>{
          localStorage.setItem("token",res.data.token)})

      }else{
        await axios.post("http://localhost:8080/api/auth/login",formValues).then((res)=>{
          localStorage.setItem("token",res.data.token)})
      }
      window.location.reload();
      console.log('Form submitted:', formValues);
    }
  };
  
  
  return (
    <div className="max-w-md w-full mx-auto">
      <motion.div 
        className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
            {activeTab === 'login' ? 'Welcome Back' : 'Create Account'}
          </h2>
          <p className="text-gray-600 dark:text-gray-300 mt-2">
            {activeTab === 'login' 
              ? 'Sign in to access your account' 
              : 'Sign up to get started with our app'
            }
          </p>
        </div>
        
        <div className="flex mb-8 bg-gray-100 dark:bg-gray-700 rounded-lg p-1 relative">
          <button
            className={`flex-1 py-2 rounded-md text-sm font-medium relative z-10 transition-colors ${
              activeTab === 'login' 
                ? 'text-primary-900 dark:text-white' 
                : 'text-gray-600 dark:text-gray-300'
            }`}
            onClick={() => setActiveTab('login')}
          >
            Log In
          </button>
          <button
            className={`flex-1 py-2 rounded-md text-sm font-medium relative z-10 transition-colors ${
              activeTab === 'signup' 
                ? 'text-primary-900 dark:text-white' 
                : 'text-gray-600 dark:text-gray-300'
            }`}
            onClick={() => setActiveTab('signup')}
          >
            Sign Up
          </button>
          <motion.div 
            className="absolute top-1 left-1 bottom-1 rounded-md bg-white dark:bg-gray-800 shadow-sm z-0"
            initial={false}
            animate={{
              width: '50%',
              x: activeTab === 'login' ? 0 : '100%',
            }}
            transition={{ duration: 0.3 }}
          />
        </div>
        
        <AnimatePresence mode="wait">
          <motion.form
            key={activeTab}
            onSubmit={handleSubmit}
            initial={{ opacity: 0, x: activeTab === 'login' ? -20 : 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: activeTab === 'login' ? 20 : -20 }}
            transition={{ duration: 0.3 }}
          >
            {activeTab === 'signup' && (
              <FormInput
                id="username"
                name="username"
                label="Full Name"
                error={errors.username}
              />
            )}
            
            <FormInput
              id="email"
              name="email"
              type="email"
              label="Email Address"
              error={errors.email}
            />
            
            <FormInput
              id="password"
              name="password"
              type="password"
              label="Password"
              error={errors.password}
            />
            
            {activeTab === 'signup' && (
              <FormInput
                id="confirmPassword"
                name="confirmPassword"
                type="password"
                label="Confirm Password"
                error={errors.confirmPassword}
              />
            )}
            
            {activeTab === 'login' && (
              <div className="flex justify-end mb-6">
                <a href="#" className="text-sm text-primary-600 dark:text-primary-400 hover:underline">
                  Forgot password?
                </a>
              </div>
            )}
            
            <Button type="submit" className="w-full">
              {activeTab === 'login' ? 'Sign In' : 'Create Account'}
            </Button>
            
            {activeTab === 'login' && (
              <div className="mt-6 text-center">
                <p className="text-gray-600 dark:text-gray-300">
                  Don't have an account?{' '}
                  <button
                    type="button"
                    className="text-primary-600 dark:text-primary-400 hover:underline"
                    onClick={() => setActiveTab('signup')}
                  >
                    Sign up
                  </button>
                </p>
              </div>
            )}
            
            {activeTab === 'signup' && (
              <div className="mt-6 text-center">
                <p className="text-gray-600 dark:text-gray-300">
                  Already have an account?{' '}
                  <button
                    type="button"
                    className="text-primary-600 dark:text-primary-400 hover:underline"
                    onClick={() => setActiveTab('login')}
                  >
                    Log in
                  </button>
                </p>
              </div>
            )}
          </motion.form>
        </AnimatePresence>
      </motion.div>
    </div>
  );
};

export default AuthCard;