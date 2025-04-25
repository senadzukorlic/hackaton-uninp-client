import React from 'react';
import { motion } from 'framer-motion';
import AuthCard from '../components/AuthCard';

const AuthPage: React.FC = () => {
  const pageVariants = {
    initial: { opacity: 0 },
    animate: { 
      opacity: 1,
      transition: { duration: 0.3 }
    },
    exit: { opacity: 0 }
  };

  return (
    <motion.div
      className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 py-12 px-4 sm:px-6 lg:px-8"
      variants={pageVariants}
      initial="initial"
      animate="animate"
      exit="exit"
    >
      <AuthCard />
    </motion.div>
  );
};

export default AuthPage;