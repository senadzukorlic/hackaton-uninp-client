import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import Button from '../components/Button';

const NotFoundPage: React.FC = () => {
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
      className="min-h-screen flex flex-col items-center justify-center text-center px-4"
      variants={pageVariants}
      initial="initial"
      animate="animate"
      exit="exit"
    >
      <h1 className="text-9xl font-bold text-primary-600 dark:text-primary-500">404</h1>
      <h2 className="text-4xl font-semibold text-gray-900 dark:text-white mt-6">Page Not Found</h2>
      <p className="mt-4 text-xl text-gray-600 dark:text-gray-300 max-w-lg">
        The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
      </p>
      <Link to="/" className="mt-8">
        <Button>
          Go Back Home
        </Button>
      </Link>
    </motion.div>
  );
};

export default NotFoundPage;