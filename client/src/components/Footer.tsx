
import { Github } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-black/30 py-8 border-t border-border mt-auto">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <p className="text-sm text-gray-400">
              © {new Date().getFullYear()} Zoro Code Insights. All rights reserved.
            </p>
          </div>
          <div className="flex space-x-6">
            <a 
              href="https://github.com/AbdulMoiz2493/ZoroCodeInsights-A-Code-Reviewer" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-primary transition-colors"
            >
              <Github size={20} />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
