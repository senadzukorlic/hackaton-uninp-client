import React from 'react';
import { motion } from 'framer-motion';
import { Star, ChevronLeft, ChevronRight } from 'lucide-react';
import AnimatedSection from './AnimatedSection';

interface TestimonialProps {
  quote: string;
  author: string;
  role: string;
  company: string;
  rating: number;
  imageUrl: string;
}

const Testimonial: React.FC<TestimonialProps> = ({ 
  quote, author, role, company, rating, imageUrl 
}) => {
  return (
    <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700">
      <div className="flex space-x-1 mb-4">
        {[...Array(5)].map((_, i) => (
          <Star 
            key={i} 
            size={18} 
            className={i < rating ? "text-yellow-500 fill-yellow-500" : "text-gray-300 dark:text-gray-600"} 
          />
        ))}
      </div>
      <blockquote className="text-gray-700 dark:text-gray-300 mb-6 italic">
        "{quote}"
      </blockquote>
      <div className="flex items-center">
        <img
          src={imageUrl}
          alt={author}
          className="w-12 h-12 rounded-full object-cover mr-4"
        />
        <div>
          <div className="font-medium text-gray-900 dark:text-white">{author}</div>
          <div className="text-sm text-gray-500 dark:text-gray-400">{role}, {company}</div>
        </div>
      </div>
    </div>
  );
};

const TestimonialsSection: React.FC = () => {
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

  const testimonials = [
    {
      quote: "The AI-powered insights from this platform have transformed how we approach customer engagement. We've seen a 45% increase in conversion rates since implementation.",
      author: "Sarah Johnson",
      role: "Marketing Director",
      company: "TechCorp",
      rating: 5,
      imageUrl: "https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
    },
    {
      quote: "Implementing this AI solution has streamlined our data analysis workflows, saving us countless hours and providing insights we would have otherwise missed.",
      author: "Michael Chen",
      role: "Data Scientist",
      company: "Innovate Inc",
      rating: 5,
      imageUrl: "https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
    },
    {
      quote: "The natural language capabilities of this AI platform are truly impressive. It's like having an extra team member who works 24/7.",
      author: "Emily Rodriguez",
      role: "Product Manager",
      company: "NextGen Systems",
      rating: 4,
      imageUrl: "https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
    }
  ];

  return (
    <section className="py-24 bg-gradient-to-b from-white to-gray-50 dark:from-gray-800 dark:to-gray-900">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="text-center mb-16"
        >
          <motion.span 
            variants={itemVariants}
            className="inline-block px-4 py-1.5 bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-full text-sm font-medium mb-4"
          >
            Client Success Stories
          </motion.span>
          <motion.h2 
            variants={itemVariants}
            className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4"
          >
            Trusted by innovative companies
          </motion.h2>
          <motion.p 
            variants={itemVariants}
            className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto"
          >
            See how businesses across industries are leveraging our AI technology to drive growth and innovation.
          </motion.p>
        </motion.div>
        
        <div className="relative">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <AnimatedSection key={index} delay={index * 0.1} className="h-full">
                <Testimonial {...testimonial} />
              </AnimatedSection>
            ))}
          </div>
          
          <div className="flex justify-center mt-10">
            <div className="flex space-x-2">
              {[...Array(3)].map((_, i) => (
                <button
                  key={i}
                  className={`w-3 h-3 rounded-full ${i === 0 ? 'bg-blue-600' : 'bg-gray-300 dark:bg-gray-700'}`}
                  aria-label={`Go to slide ${i + 1}`}
                />
              ))}
            </div>
          </div>
          
          <div className="hidden md:block">
            <button className="absolute top-1/2 -left-4 transform -translate-y-1/2 w-10 h-10 bg-white dark:bg-gray-800 rounded-full shadow-md flex items-center justify-center text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700">
              <ChevronLeft size={20} />
            </button>
            <button className="absolute top-1/2 -right-4 transform -translate-y-1/2 w-10 h-10 bg-white dark:bg-gray-800 rounded-full shadow-md flex items-center justify-center text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700">
              <ChevronRight size={20} />
            </button>
          </div>
        </div>
        
        {/* Logos */}
        <div className="mt-20">
          <p className="text-center text-sm text-gray-500 dark:text-gray-400 mb-8">TRUSTED BY INNOVATIVE COMPANIES</p>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="flex items-center justify-center">
                <div className="h-8 w-24 bg-gray-300 dark:bg-gray-700 rounded opacity-50"></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;