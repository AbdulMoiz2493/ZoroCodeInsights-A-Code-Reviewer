import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react'; // Import Menu and X icons
import { motion, AnimatePresence } from 'framer-motion';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  
  // Close menu when route changes
  useEffect(() => {
    setIsMenuOpen(false);
  }, [location.pathname]);
  
  // Handle scroll effects
  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 10;
      setScrolled(isScrolled);
    };

    window.addEventListener('scroll', handleScroll);
    
    // Prevent scrolling when menu is open
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      document.body.style.overflow = '';
    };
  }, [isMenuOpen]);
  
  const isActive = (path: string) => {
    return location.pathname === path || (path === '/' && location.pathname === '/home');
  };

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Analyze Code', path: '/analyze' },
    { name: 'About', path: '/about' },
  ];

  return (
    <>
      <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled 
          ? 'py-3 bg-[#0d101e]/95 backdrop-blur-md border-b border-[#1e2545]' 
          : 'py-4 bg-[#0d101e]/90 backdrop-blur-md border-b border-[#1e2545]'
      }`}>
        <div className="container mx-auto px-4 md:px-6">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <Link to="/" className="flex items-center transition-transform hover:scale-105">
              <span className="text-2xl font-bold bg-gradient-to-r from-[#9b47ff] to-[#c553ff] bg-clip-text text-transparent">
                Zoro
              </span>
              <span className="text-2xl font-medium ml-1 text-white">Code Insights</span>
            </Link>
            
            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-4">
              {navLinks.map((link) => (
                <Link 
                  key={link.name}
                  to={link.path} 
                  className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                    isActive(link.path)
                      ? 'bg-[#9b47ff] text-white' 
                      : 'text-gray-300 hover:bg-[#1e2545] hover:text-white'
                  }`}
                >
                  {link.name}
                </Link>
              ))}
            </div>
            
            {/* Mobile Menu Button with Icon Animation */}
            <div className="md:hidden">
              <button 
                onClick={() => setIsMenuOpen(!isMenuOpen)} 
                className="relative z-50 p-2 focus:outline-none"
                aria-label={isMenuOpen ? "Close menu" : "Open menu"}
              >
                <div className="relative w-6 h-6">
                  {/* Menu Icon (visible when menu is closed) */}
                  <motion.div
                    className="absolute inset-0"
                    animate={{
                      rotate: isMenuOpen ? 45 : 0,
                      opacity: isMenuOpen ? 0 : 1,
                    }}
                    transition={{ duration: 0.3 }}
                  >
                    <Menu size={24} className="text-white" />
                  </motion.div>
                  
                  {/* X Icon (visible when menu is open) */}
                  <motion.div
                    className="absolute inset-0"
                    animate={{
                      rotate: isMenuOpen ? 0 : -45,
                      opacity: isMenuOpen ? 1 : 0,
                    }}
                    transition={{ duration: 0.3 }}
                  >
                    <X size={24} className="text-white" />
                  </motion.div>
                </div>
              </button>
            </div>
          </div>
        </div>
      </header>
      
      {/* Mobile Menu Overlay with Animations */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div 
            className="fixed inset-0 z-40 md:hidden bg-[#0d101e]/95 backdrop-blur-md flex flex-col"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            {/* Top bar with logo and close button */}
            <div className="flex items-center justify-between p-4 border-b border-[#1e2545]">
              <Link to="/" className="flex items-center" onClick={() => setIsMenuOpen(false)}>
                <span className="text-2xl font-bold bg-gradient-to-r from-[#9b47ff] to-[#c553ff] bg-clip-text text-transparent">
                  Zoro
                </span>
                <span className="text-2xl font-medium ml-1 text-white">Code Insights</span>
              </Link>
              
              {/* Close button with X icon */}
              <button
                onClick={() => setIsMenuOpen(false)}
                className="p-2 text-white focus:outline-none"
                aria-label="Close menu"
              >
                <X size={24} />
              </button>
            </div>
            
            {/* Menu items */}
            <div className="flex flex-col items-center justify-center flex-1">
              {navLinks.map((link, index) => (
                <motion.div
                  key={link.name}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ 
                    duration: 0.3, 
                    delay: 0.1 + index * 0.1 
                  }}
                  className="w-64 my-3"
                >
                  <Link 
                    to={link.path} 
                    className={`px-6 py-3 rounded-md text-lg font-medium w-full flex items-center justify-center transition-all ${
                      isActive(link.path)
                        ? 'bg-[#9b47ff] text-white' 
                        : 'text-white hover:bg-[#1e2545]'
                    }`}
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {link.name}
                  </Link>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;