import React from 'react';
import { motion } from 'framer-motion';
import { Bot, Brain, ServerIcon, Database, Zap, Lock, LineChart, MessageSquare } from 'lucide-react';
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
      title: "Advanced Conversational AI",
      description: "Natural language processing that understands context and delivers human-like interactions.",
      color: "border-blue-500",
      delay: 0.1
    },
    {
      icon: <Brain size={30} className="text-purple-500" />,
      title: "Machine Learning",
      description: "Adaptive algorithms that learn from interactions to deliver increasingly personalized experiences.",
      color: "border-purple-500",
      delay: 0.2
    },
    {
      icon: <ServerIcon size={30} className="text-indigo-500" />,
      title: "Cloud Infrastructure",
      description: "Scalable architecture designed to handle millions of requests with minimal latency.",
      color: "border-indigo-500",
      delay: 0.3
    },
    {
      icon: <Database size={30} className="text-green-500" />,
      title: "Advanced Data Processing",
      description: "Sophisticated data handling capabilities for massive datasets with real-time insights.",
      color: "border-green-500",
      delay: 0.4
    },
    {
      icon: <Zap size={30} className="text-yellow-500" />,
      title: "Real-time Analysis",
      description: "Instant processing of complex queries providing immediate, actionable intelligence.",
      color: "border-yellow-500",
      delay: 0.5
    },
    {
      icon: <Lock size={30} className="text-red-500" />,
      title: "Enterprise Security",
      description: "Bank-level encryption and compliance with major security standards and regulations.",
      color: "border-red-500",
      delay: 0.6
    },
    {
      icon: <LineChart size={30} className="text-teal-500" />,
      title: "Predictive Analytics",
      description: "Forecast trends and anticipate needs with advanced predictive modeling techniques.",
      color: "border-teal-500",
      delay: 0.7
    },
    {
      icon: <MessageSquare size={30} className="text-pink-500" />,
      title: "Multilingual Support",
      description: "Communicate seamlessly across languages with accurate, contextual translations.",
      color: "border-pink-500",
      delay: 0.8
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
            Powered by Cutting-Edge <span className="text-blue-600">AI Technology</span>
          </motion.h2>
          <motion.p 
            variants={itemVariants}
            className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto"
          >
            Our platform combines state-of-the-art artificial intelligence with intuitive design to deliver 
            an exceptional user experience.
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