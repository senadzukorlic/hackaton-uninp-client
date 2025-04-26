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
      title: "Napredna konverzaciona veštačka inteligencija",
      description: "Obrada prirodnog jezika koja razume kontekst i pruža interakcije slične ljudskim.",
      color: "border-blue-500",
      delay: 0.1
    },
    {
      icon: <Brain size={30} className="text-purple-500" />,
      title: "Mašinsko učenje",
      description: "Prilagodljivi algoritmi koji uče iz interakcija kako bi pružili sve personalizovanija iskustva.",
      color: "border-purple-500",
      delay: 0.2
    },
    {
      icon: <ServerIcon size={30} className="text-indigo-500" />,
      title: "Cloud infrastruktura",
      description: "Skalabilna arhitektura dizajnirana za obradu miliona zahteva uz minimalnu latenciju.",
      color: "border-indigo-500",
      delay: 0.3
    },
    {
      icon: <Database size={30} className="text-green-500" />,
      title: "Napredna obrada podataka",
      description: "Sofisticirane mogućnosti rukovanja podacima za ogromne skupove podataka sa uvidima u realnom vremenu.",
      color: "border-green-500",
      delay: 0.4
    },
    {
      icon: <Zap size={30} className="text-yellow-500" />,
      title: "Analiza u realnom vremenu",
      description: "Trenutna obrada složenih upita koja pruža trenutne, korisne informacije.",
      color: "border-yellow-500",
      delay: 0.5
    },
    {
      icon: <Lock size={30} className="text-red-500" />,
      title: "Sigurnost na nivou preduzeća",
      description: "Enkripcija na nivou banaka i usklađenost sa glavnim standardima i propisima o sigurnosti.",
      color: "border-red-500",
      delay: 0.6
    },
    {
      icon: <LineChart size={30} className="text-teal-500" />,
      title: "Prediktivna analitika",
      description: "Predviđajte trendove i anticipirajte potrebe uz napredne tehnike prediktivnog modeliranja.",
      color: "border-teal-500",
      delay: 0.7
    },
    {
      icon: <MessageSquare size={30} className="text-pink-500" />,
      title: "Višejezička podrška",
      description: "Komunicirajte bez problema na različitim jezicima uz tačne, kontekstualne prevode.",
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
            Pokreće ga najsavremenija <span className="text-blue-600">veštačka inteligencija</span>
          </motion.h2>
          <motion.p 
            variants={itemVariants}
            className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto"
          >
            Naša platforma kombinuje najsavremeniju veštačku inteligenciju sa intuitivnim dizajnom kako bi pružila izuzetno korisničko iskustvo.
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