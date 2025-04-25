import React from 'react';
import { motion } from 'framer-motion';
import { Cpu, Award, ShieldCheck } from 'lucide-react';
import AnimatedSection from './AnimatedSection';

const About: React.FC = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: [0.16, 1, 0.3, 1]
      }
    }
  };

  return (
    <section className="py-24 bg-white dark:bg-gray-800 relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute top-0 right-0 w-1/3 h-1/3 bg-blue-100 dark:bg-blue-900/20 rounded-bl-full opacity-50"></div>
      <div className="absolute bottom-0 left-0 w-1/4 h-1/4 bg-purple-100 dark:bg-purple-900/20 rounded-tr-full opacity-50"></div>
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* About Content */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
          >
            <motion.h2 
              variants={itemVariants}
              className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-6"
            >
              Revolutionizing Industries with <span className="text-blue-600">Intelligent AI</span>
            </motion.h2>
            
            <motion.p
              variants={itemVariants}

              className="text-lg text-gray-600 dark:text-gray-300 mb-8"
            >
              Founded in 2023, our mission is to make advanced artificial intelligence accessible to everyone. 
              Our team of experts combines deep technical knowledge with industry expertise to create solutions 
              that solve real-world problems.
            </motion.p>
            
            <motion.div
              variants={containerVariants}
              className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-8"
            >
              <motion.div variants={itemVariants} className="flex flex-col items-center">
                <div className="text-4xl font-bold text-blue-600 mb-2">98%</div>
                <div className="text-sm text-gray-600 dark:text-gray-400 text-center">Customer Satisfaction</div>
              </motion.div>
              
              <motion.div variants={itemVariants} className="flex flex-col items-center">
                <div className="text-4xl font-bold text-blue-600 mb-2">50+</div>
                <div className="text-sm text-gray-600 dark:text-gray-400 text-center">Enterprise Clients</div>
              </motion.div>
              
              <motion.div variants={itemVariants} className="flex flex-col items-center">
                <div className="text-4xl font-bold text-blue-600 mb-2">24/7</div>
                <div className="text-sm text-gray-600 dark:text-gray-400 text-center">AI Availability</div>
              </motion.div>
            </motion.div>
            
            <motion.div
              variants={containerVariants}
              className="space-y-4"
            >
              <motion.div variants={itemVariants} className="flex items-start">
                <div className="mr-4 mt-1">
                  <Cpu size={20} className="text-blue-600" />
                </div>
                <div>
                  <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-1">Next-Generation Technology</h3>
                  <p className="text-gray-600 dark:text-gray-300">Built on advanced neural networks and deep learning models that continuously evolve.</p>
                </div>
              </motion.div>
              
              <motion.div variants={itemVariants} className="flex items-start">
                <div className="mr-4 mt-1">
                  <Award size={20} className="text-blue-600" />
                </div>
                <div>
                  <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-1">Industry Recognition</h3>
                  <p className="text-gray-600 dark:text-gray-300">Award-winning solutions recognized for innovation and effectiveness.</p>
                </div>
              </motion.div>
              
              <motion.div variants={itemVariants} className="flex items-start">
                <div className="mr-4 mt-1">
                  <ShieldCheck size={20} className="text-blue-600" />
                </div>
                <div>
                  <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-1">Enterprise Security</h3>
                  <p className="text-gray-600 dark:text-gray-300">Bank-level encryption and compliance with major security standards.</p>
                </div>
              </motion.div>
            </motion.div>
          </motion.div>
          
          {/* Image and stats */}
          <AnimatedSection delay={0.3} className="relative">
            <div className="relative rounded-2xl overflow-hidden">
              <img 
                src="https://images.pexels.com/photos/8386434/pexels-photo-8386434.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" 
                alt="AI Technology" 
                className="w-full h-auto rounded-2xl"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-gray-900/80 to-transparent flex items-end">
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-white mb-2">Building the Future</h3>
                  <p className="text-gray-200">Our team of experts is dedicated to pushing the boundaries of what's possible with AI.</p>
                </div>
              </div>
            </div>
            
            {/* Floating stat card */}
            <div className="absolute -top-8 -right-8 bg-white dark:bg-gray-700 rounded-lg shadow-xl p-6 max-w-xs">
              <div className="flex flex-col">
                <div className="flex justify-between mb-4">
                  <div className="font-medium text-gray-500 dark:text-gray-400">AI Accuracy</div>
                  <div className="font-bold text-blue-600">97.8%</div>
                </div>
                <div className="w-full bg-gray-200 dark:bg-gray-600 rounded-full h-2.5">
                  <div className="bg-blue-600 h-2.5 rounded-full" style={{ width: '97.8%' }}></div>
                </div>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </div>
    </section>
  );
};

export default About;