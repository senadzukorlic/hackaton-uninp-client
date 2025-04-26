import React from 'react';
import { Link } from 'react-router-dom';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-2">
            <Link to="/" className="text-2xl font-bold text-primary-600 dark:text-primary-400 mb-4 inline-block">
              Sandra
            </Link>
            <p className="max-w-md">
              Tvoj personalizovani ai asistent, koji it pomaze u svakodnevnim taskovima.
            </p>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Links</h3>
            <ul className="space-y-2">
              <li><Link to="/" className="hover:text-primary-600 dark:hover:text-primary-400 transition-colors">Home</Link></li>
              <li><Link to="/#features" className="hover:text-primary-600 dark:hover:text-primary-400 transition-colors">Features</Link></li>
              <li><Link to="/#about" className="hover:text-primary-600 dark:hover:text-primary-400 transition-colors">About</Link></li>
              <li><Link to="/#contact" className="hover:text-primary-600 dark:hover:text-primary-400 transition-colors">Contact</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Legal</h3>
            <ul className="space-y-2">
              <li><a href="#" className="hover:text-primary-600 dark:hover:text-primary-400 transition-colors">Privacy Policy</a></li>
              <li><a href="#" className="hover:text-primary-600 dark:hover:text-primary-400 transition-colors">Terms of Service</a></li>
              <li><a href="#" className="hover:text-primary-600 dark:hover:text-primary-400 transition-colors">Cookie Policy</a></li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-200 dark:border-gray-700 mt-10 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p>&copy; 2025 ModernSPA. All rights reserved.</p>
          <div className="mt-4 md:mt-0 flex space-x-6">
            <a href="#" className="hover:text-primary-600 dark:hover:text-primary-400 transition-colors" aria-label="Twitter">Twitter</a>
            <a href="#" className="hover:text-primary-600 dark:hover:text-primary-400 transition-colors" aria-label="GitHub">GitHub</a>
            <a href="#" className="hover:text-primary-600 dark:hover:text-primary-400 transition-colors" aria-label="LinkedIn">LinkedIn</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;