import React from "react";
import { motion } from "framer-motion";
import Button from "./Button";

const Hero: React.FC = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: [0.16, 1, 0.3, 1],
      },
    },
  };

  return (
    <div className="min-h-screen flex items-center bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-dark">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          className="max-w-4xl mx-auto text-center"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.h1
            className="text-hero-mobile md:text-hero-desktop font-bold leading-tight text-gray-900 dark:text-white mb-6"
            variants={itemVariants}
          >
            Sandra | <span className="text-primary-600">Tvoj Asistent</span>
          </motion.h1>

          <motion.p
            className="text-xl md:text-2xl font-light text-gray-700 dark:text-gray-300 mb-10 max-w-3xl mx-auto"
            variants={itemVariants}
          >
            Personalizovani zivotni savetnik. koji ce vam pruziti potpuni
            podrsku u svakodnevnim obavezama.
          </motion.p>

          <motion.div
            className="flex flex-col sm:flex-row justify-center gap-4"
            variants={itemVariants}
          >
            <Button
              size="lg"
              onClick={() => {
                window.scrollBy({
                  top: window.innerHeight * 1.7, // 200vh - 2 times the viewport height
                  left: 0,
                  behavior: "smooth",
                });
              }}
            >
              Zapocni
            </Button>
            <Button variant="outline" size="lg">
              Saznaj vise
            </Button>
          </motion.div>
        </motion.div>
      </div>

      {/* Decorative background elements */}
      <div className="absolute top-1/4 left-10 w-64 h-64 bg-primary-600/10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-1/4 right-10 w-80 h-80 bg-primary-600/5 rounded-full blur-3xl"></div>
    </div>
  );
};

export default Hero;
