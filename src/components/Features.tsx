import React from 'react';
import { Moon, Layout, Zap, Shield } from 'lucide-react';
import AnimatedSection from './AnimatedSection';

interface FeatureProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  delay: number;
}

const Feature: React.FC<FeatureProps> = ({ icon, title, description, delay }) => {
  return (
    <AnimatedSection 
      className="flex flex-col items-center p-6 bg-white dark:bg-gray-800 rounded-xl shadow-sm hover:shadow-md transition-shadow"
      delay={delay}
    >
      <div className="p-3 bg-primary-100 dark:bg-primary-900/30 text-primary-600 dark:text-primary-400 rounded-full mb-4">
        {icon}
      </div>
      <h3 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white">{title}</h3>
      <p className="text-gray-600 dark:text-gray-300 text-center">{description}</p>
    </AnimatedSection>
  );
};

const Features: React.FC = () => {
  const features = [
    {
      icon: <Moon size={24} />,
      title: 'Dark/Light Themes',
      description: 'Switch between beautifully designed themes with smooth transitions.',
      delay: 0
    },
    {
      icon: <Layout size={24} />,
      title: 'Responsive Design',
      description: 'Perfect experience on any device, from mobile to desktop.',
      delay: 0.1
    },
    {
      icon: <Zap size={24} />,
      title: 'Smooth Animations',
      description: 'Delightful micro-interactions and page transitions.',
      delay: 0.2
    },
    {
      icon: <Shield size={24} />,
      title: 'Secure Authentication',
      description: 'Simple and secure user authentication system.',
      delay: 0.3
    }
  ];

  return (
    <section id="features" className="py-20 bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <AnimatedSection className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Powerful Features
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Everything you need to build modern, performant React applications
          </p>
        </AnimatedSection>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <Feature key={index} {...feature} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;