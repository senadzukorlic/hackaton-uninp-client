import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import ThemeToggle from './ThemeToggle';
import Button from './Button';

const Header: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Zatvori mobilni meni kada se promeni ruta
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location]);
  
  const navigation = [
    { name: 'Početna', path: '/' },
    { name: 'Funkcionalnosti', path: '/features' },
    { name: 'Pricing', path: '/pricing' },
    { name: 'Kontakt', path: '/contact' },
    { name: 'Taskovi', path: '/TaskBoard' },
  ];
  
  return (
    <motion.header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'bg-white dark:bg-dark shadow-md' : 'bg-transparent'
      }`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex-shrink-0">
            <Link to="/" className="text-2xl font-bold text-primary-600 dark:text-primary-400">
              HackatonUNINP
            </Link>
          </div>
          
          <div className="hidden md:block">
            <div className="ml-10 flex items-center space-x-4">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  to={item.path}
                  className="px-3 py-2 rounded-md text-sm font-medium text-gray-900 dark:text-gray-100 hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
                >
                  {item.name}
                </Link>
              ))}
              <div className="ml-4">
                <Button variant="outline" size="sm" onClick={() => {
                  localStorage.getItem("token") ? navigate('/profile') : navigate("/auth")
                }}>
                  {localStorage.getItem("token") ? "Moj profil" : "Prijavi se"}
                </Button>
              </div>
              <div className="ml-2">
                <ThemeToggle />
              </div>
            </div>
          </div>
          
          <div className="flex md:hidden">
            <ThemeToggle />
            <button
              className="ml-2 p-2 rounded-md text-gray-900 dark:text-gray-100"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-expanded={isMobileMenuOpen}
              aria-label="Uključi/isključi mobilni meni"
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>
      
      {/* Mobilni meni */}
      {isMobileMenuOpen && (
        <motion.div
          className="md:hidden bg-white dark:bg-dark shadow-lg"
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
          transition={{ duration: 0.2 }}
        >
          <div className="px-2 pt-2 pb-3 space-y-1">
            {navigation.map((item) => (
              <Link
                key={item.name}
                to={item.path}
                className="block px-3 py-2 rounded-md text-base font-medium text-gray-900 dark:text-gray-100 hover:bg-gray-50 dark:hover:bg-gray-800"
              >
                {item.name}
              </Link>
            ))}
            <Link
              to="/auth"
              className="block px-3 py-2 rounded-md text-base font-medium text-primary-600 dark:text-primary-400"
            >
              Prijavi se
            </Link>
          </div>
        </motion.div>
      )}
    </motion.header>
  );
};

export default Header;