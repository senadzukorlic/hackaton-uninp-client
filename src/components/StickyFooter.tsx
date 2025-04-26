import React from 'react';
import { Home, Search, Bell, User, ListChecks, Mail, DollarSign, ParenthesesIcon } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useActive } from '../contexts/ActivateContext';
const StickyFooter: React.FC = () => {
  const navigate = useNavigate();
  const {setIsRunning, isRunning} = useActive()
  return (
    <footer className="fixed bottom-0 left-0 right-0 z-50 lg:bottom-4">
      <div className="bg-gradient-to-r from-[#1e1e2f] via-[#2d1b4d] to-[#1e1e2f] px-4 py-2 rounded-t-2xl shadow-[0_-4px_12px_rgba(0,0,0,0.25)] lg:max-w-5xl lg:mx-auto lg:rounded-2xl">
        <nav className="relative h-[60px] flex justify-around items-center gap-1">
          
          {/* Prvi deo navigacije - 3 dugmeta */}
          <div className="flex justify-around flex-1">
          <button onClick={() => navigate("/")} className="flex flex-col items-center text-white/70 hover:text-white hover:-translate-y-0.5 transition-all duration-200 p-2 relative z-10">
              <Home size={24} />
              <span className="text-xs mt-1">Home</span>
            </button>
            <button onClick={() => navigate("/parentcontrol")} className="flex flex-col items-center text-white/70 hover:text-white hover:-translate-y-0.5 transition-all duration-200 p-2 relative z-10">
              <ParenthesesIcon size={24} />
              <span className="text-xs mt-1">ParentControl</span>
            </button>

            

            <button onClick={() => navigate("/features")} className="flex flex-col items-center text-white/70 hover:text-white hover:-translate-y-0.5 transition-all duration-200 p-2 relative z-10">
              <Search size={24} />
              <span className="text-xs mt-1">Features</span>
            </button>
          </div>
          
          {/* Prazan prostor za središnje dugme */}
          <div className="w-[70px] flex-shrink-0"></div>
          
          {/* Drugi deo navigacije - 3 dugmeta */}
          <div className="flex justify-around flex-1">
            <button onClick={() => navigate("/TaskBoard")} className="flex flex-col items-center text-white/70 hover:text-white hover:-translate-y-0.5 transition-all duration-200 p-2 relative z-10">
              <ListChecks size={24} />
              <span className="text-xs mt-1">Tasks</span>
            </button>

            <button onClick={() => navigate("/contact")} className="flex flex-col items-center text-white/70 hover:text-white hover:-translate-y-0.5 transition-all duration-200 p-2 relative z-10">
              <Mail size={24} />
              <span className="text-xs mt-1">Contact</span>
            </button>

            <button onClick={() => navigate("/pricing")} className="flex flex-col items-center text-white/70 hover:text-white hover:-translate-y-0.5 transition-all duration-200 p-2 relative z-10">
              <DollarSign size={24} />
              <span className="text-xs mt-1">Pricing</span>
            </button>
          </div>

          {/* Center Assistant Button */}
          <div className="absolute left-1/2 top-0 -translate-x-1/2 -translate-y-1/2 z-20">
            <button onClick={() => {
              if(window.location.href != "http://localhost:5173/assistant") {
                navigate('/assistant')
              }
              setIsRunning(!isRunning);
            }} className={!isRunning ? "w-[60px] h-[60px] rounded-full bg-gradient-to-br from-purple-600 to-purple-800 flex items-center justify-center text-white shadow-[0_4px_15px_rgba(124,58,237,0.5)] hover:scale-110 hover:shadow-[0_6px_20px_rgba(124,58,237,0.7)] active:scale-95 transition-all duration-300 relative sm:w-[50px] sm:h-[50px]" : "w-[60px] h-[60px] rounded-full bg-gradient-to-br from-red-600 to-red-800 flex items-center justify-center text-white shadow-[0_4px_15px_rgba(124,58,237,0.5)] hover:scale-110 hover:shadow-[0_6px_20px_rgba(124,58,237,0.7)] active:scale-95 transition-all duration-300 relative sm:w-[50px] sm:h-[50px]"}>
              <span className="text-3xl font-bold relative z-[5] sm:text-2xl">S</span>
              <div className="absolute inset-0 rounded-full bg-[radial-gradient(circle_at_center,rgba(147,51,234,0.2),transparent_70%)] blur opacity-0 hover:opacity-100 transition-opacity duration-300" />
            </button>
          </div>

        </nav>
      </div>
    </footer>
  );
};

export default StickyFooter;
