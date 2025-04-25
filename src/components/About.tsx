import React from 'react';
import AnimatedSection from './AnimatedSection';

const About: React.FC = () => {
  return (
    <section id="about" className="py-20 bg-white dark:bg-dark">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center gap-12">
          <AnimatedSection className="flex-1">
            <div className="relative">
              <div className="w-full h-[400px] rounded-xl bg-gradient-to-br from-primary-400 to-primary-600 shadow-xl"></div>
              <div className="absolute -bottom-4 -right-4 w-40 h-40 bg-gray-100 dark:bg-gray-800 rounded-xl"></div>
              <div className="absolute -top-4 -left-4 w-24 h-24 bg-primary-200 dark:bg-primary-900 rounded-lg"></div>
            </div>
          </AnimatedSection>
          
          <AnimatedSection className="flex-1" delay={0.2}>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-6">
              About This Project
            </h2>
            <p className="text-gray-600 dark:text-gray-300 mb-6 text-lg">
              This modern React application showcases best practices for building 
              beautiful, responsive interfaces with a focus on user experience.
            </p>
            <p className="text-gray-600 dark:text-gray-300 mb-6 text-lg">
              Built with React 18, TypeScript, Tailwind CSS, and Framer Motion, 
              it demonstrates advanced concepts like theme management, animations, 
              and accessibility.
            </p>
            <div className="flex flex-wrap gap-3">
              <span className="px-3 py-1 bg-primary-100 dark:bg-primary-900/30 text-primary-600 dark:text-primary-400 rounded-full text-sm">React</span>
              <span className="px-3 py-1 bg-primary-100 dark:bg-primary-900/30 text-primary-600 dark:text-primary-400 rounded-full text-sm">TypeScript</span>
              <span className="px-3 py-1 bg-primary-100 dark:bg-primary-900/30 text-primary-600 dark:text-primary-400 rounded-full text-sm">Tailwind</span>
              <span className="px-3 py-1 bg-primary-100 dark:bg-primary-900/30 text-primary-600 dark:text-primary-400 rounded-full text-sm">Framer Motion</span>
              <span className="px-3 py-1 bg-primary-100 dark:bg-primary-900/30 text-primary-600 dark:text-primary-400 rounded-full text-sm">React Router</span>
            </div>
          </AnimatedSection>
        </div>
      </div>
    </section>
  );
};

export default About;