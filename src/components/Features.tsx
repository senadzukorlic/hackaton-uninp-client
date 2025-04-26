import React from 'react';
import { motion } from 'framer-motion';
import { Bot, Brain, Zap, Lock} from 'lucide-react';
import AnimatedSection from './AnimatedSection';

interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  color: string;
  delay: number;
}

const FeatureCard: React.FC<FeatureCardProps> = ({ icon, title, description, color, delay }) => {
  return (
    <AnimatedSection
      className={`bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 border-t-4 ${color} hover:shadow-md transition-shadow duration-300`}
      delay={delay}
    >
      <div className="mb-4">{icon}</div>
      <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">{title}</h3>
      <p className="text-gray-600 dark:text-gray-300">{description}</p>
    </AnimatedSection>
  );
};

const Features: React.FC = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
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

  const features = [
    {
      icon: <Bot size={30} className="text-blue-500" />,
      title: "Presonalizacija",
      description: "Prilagodi Sandru tako da najbolje ispunjava tvoje zahteve.",
      color: "border-blue-500",
      delay: 0.1
    },
    {
      icon: <Brain size={30} className="text-purple-500" />,
      title: "Mašinsko Učenje",
      description: "Sandra koristi algoritam mašinskog učenja da se prilagodi vašem stilu života.",
      color: "border-purple-500",
      delay: 0.2
    },
    {
      icon: <Zap size={30} className="text-yellow-500" />,
      title: "Razgovor u Realnom Vremenu",
      description: "Sandra poseduje mogućnost pričanja u realnom vremenu sa vama.",
      color: "border-yellow-500",
      delay: 0.5
    },
    {
      icon: <Lock size={30} className="text-red-500" />,
      title: "Sigurnost",
      description: "Sandra vam nudi pozive za hitne slučajeve.",
      color: "border-red-500",
      delay: 0.6
    }
  ];

  return (
    <section className="py-24 bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="text-center mb-16"
        >
          <motion.h2 
            variants={itemVariants}
            className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4"
          >
            Sandra ti olakšava <span className="text-blue-600">život</span>
          </motion.h2>
          <motion.p 
            variants={itemVariants}
            className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto"
          >
            Dopusti nam da ti pokažemo šta sandra može.
          </motion.p>
        </motion.div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <FeatureCard
              key={index}
              icon={feature.icon}
              title={feature.title}
              description={feature.description}
              color={feature.color}
              delay={feature.delay}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;