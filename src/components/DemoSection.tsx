import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Send, Sparkles, RotateCw } from 'lucide-react';
import Button from './Button';
import AnimatedSection from './AnimatedSection';

const DemoSection: React.FC = () => {
  const [message, setMessage] = useState('');
  const [conversation, setConversation] = useState<{type: 'user' | 'ai', message: string}[]>([
    {
      type: 'ai',
      message: 'Hi there! I\'m your AI assistant. How can I help you today?'
    }
  ]);
  const [isLoading, setIsLoading] = useState(false);

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim()) return;

    const newMessage = { type: 'user' as const, message };
    setConversation([...conversation, newMessage]);
    setMessage('');
    setIsLoading(true);

    // Simulate AI response
    setTimeout(() => {
      const responses = [
        "I've analyzed your request and found several solutions that might work for your situation.",
        "Based on the latest data, I can provide you with insights on this topic.",
        "I've processed your input and can offer personalized recommendations.",
        "That's an interesting question. Let me provide you with a comprehensive answer.",
        "I understand what you're looking for. Here's what I can suggest based on my analysis."
      ];
      
      const randomResponse = responses[Math.floor(Math.random() * responses.length)];
      setConversation(prev => [...prev, { type: 'ai', message: randomResponse }]);
      setIsLoading(false);
    }, 1500);
  };

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
    <section className="py-24 bg-white dark:bg-gray-800">
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
            Interactive Demo
          </motion.span>
          <motion.h2 
            variants={itemVariants}
            className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4"
          >
            Experience our <span className="text-blue-600">AI</span> in action
          </motion.h2>
          <motion.p 
            variants={itemVariants}
            className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto"
          >
            Try out our conversational AI and see how it can understand and respond to your queries in real-time.
          </motion.p>
        </motion.div>
        
        <AnimatedSection className="max-w-4xl mx-auto">
          <div className="bg-gray-50 dark:bg-gray-900 rounded-2xl overflow-hidden shadow-lg border border-gray-100 dark:border-gray-700">
            {/* Header */}
            <div className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 px-6 py-4 flex items-center">
              <div className="w-3 h-3 rounded-full bg-red-500 mr-2"></div>
              <div className="w-3 h-3 rounded-full bg-yellow-500 mr-2"></div>
              <div className="w-3 h-3 rounded-full bg-green-500 mr-2"></div>
              <div className="flex-1 text-center text-sm font-medium text-gray-500 dark:text-gray-400">AI Assistant Demo</div>
            </div>
            
            {/* Conversation */}
            <div className="h-96 p-6 overflow-y-auto">
              {conversation.map((item, index) => (
                <div
                  key={index}
                  className={`mb-4 flex ${item.type === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[75%] rounded-2xl px-4 py-3 ${
                      item.type === 'user'
                        ? 'bg-blue-600 text-white rounded-tr-none'
                        : 'bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-white rounded-tl-none'
                    }`}
                  >
                    {item.type === 'ai' && (
                      <div className="flex items-center mb-1">
                        <Sparkles size={14} className="text-blue-600 dark:text-blue-400 mr-1" />
                        <span className="text-xs font-medium text-blue-600 dark:text-blue-400">AI Assistant</span>
                      </div>
                    )}
                    <p className="text-sm">{item.message}</p>
                  </div>
                </div>
              ))}
              
              {isLoading && (
                <div className="mb-4 flex justify-start">
                  <div className="max-w-[75%] rounded-2xl px-4 py-3 bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-white rounded-tl-none">
                    <div className="flex items-center mb-1">
                      <RotateCw size={14} className="text-blue-600 dark:text-blue-400 mr-1 animate-spin" />
                      <span className="text-xs font-medium text-blue-600 dark:text-blue-400">AI Assistant is typing...</span>
                    </div>
                    <div className="flex space-x-1.5">
                      <div className="w-2 h-2 rounded-full bg-gray-400 dark:bg-gray-500 animate-bounce" style={{ animationDelay: '0ms' }}></div>
                      <div className="w-2 h-2 rounded-full bg-gray-400 dark:bg-gray-500 animate-bounce" style={{ animationDelay: '200ms' }}></div>
                      <div className="w-2 h-2 rounded-full bg-gray-400 dark:bg-gray-500 animate-bounce" style={{ animationDelay: '400ms' }}></div>
                    </div>
                  </div>
                </div>
              )}
            </div>
            
            {/* Input */}
            <div className="p-4 border-t border-gray-200 dark:border-gray-700">
              <form onSubmit={handleSendMessage} className="flex items-center">
                <input
                  type="text"
                  value={message}
                  onChange={e => setMessage(e.target.value)}
                  className="flex-1 py-2 px-4 bg-gray-100 dark:bg-gray-700 rounded-l-lg border-0 focus:ring-2 focus:ring-blue-500 dark:text-white"
                  placeholder="Type your message here..."
                  disabled={isLoading}
                />
                <Button 
                  type="submit" 
                  className="rounded-l-none"
                  disabled={isLoading}
                >
                  <Send size={16} />
                </Button>
              </form>
            </div>
            
            {/* Features */}
            <div className="bg-gray-50 dark:bg-gray-900 px-6 py-4 border-t border-gray-200 dark:border-gray-700">
              <div className="grid grid-cols-3 gap-4 text-center">
                <div>
                  <div className="text-sm font-medium text-gray-900 dark:text-white">Natural Language</div>
                  <div className="text-xs text-gray-500 dark:text-gray-400">Advanced processing</div>
                </div>
                <div>
                  <div className="text-sm font-medium text-gray-900 dark:text-white">Real-time</div>
                  <div className="text-xs text-gray-500 dark:text-gray-400">Instant responses</div>
                </div>
                <div>
                  <div className="text-sm font-medium text-gray-900 dark:text-white">Personalized</div>
                  <div className="text-xs text-gray-500 dark:text-gray-400">Adaptive learning</div>
                </div>
              </div>
            </div>
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
};

export default DemoSection;