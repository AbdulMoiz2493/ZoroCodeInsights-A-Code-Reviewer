
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';

const Hero = () => {
  return (
    <div className="relative overflow-hidden py-24 sm:py-32">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-purple-900/20 via-background to-background z-0"></div>
      
      <div className="container relative mx-auto px-4 md:px-6 z-10">
        <div className="flex flex-col items-center text-center max-w-3xl mx-auto">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight animate-fade-in">
            <span className="bg-gradient-to-r from-primary to-purple-400 bg-clip-text text-transparent">
              Zoro Code Insights
            </span>
          </h1>
          <p className="mt-6 text-lg md:text-xl text-gray-300 max-w-2xl animate-fade-in" style={{ animationDelay: "0.2s" }}>
            Analyze your code, identify issues, and get AI-powered optimizations to improve your coding practices. Elevate your code quality with powerful insights.
          </p>
          <div className="mt-10 flex flex-col sm:flex-row gap-4 w-full justify-center animate-fade-in" style={{ animationDelay: "0.4s" }}>
            <Button asChild className="bg-primary hover:bg-primary/90 text-white px-8 py-6 rounded-lg">
              <Link to="/analyze" className="flex items-center">
                <span>Analyze Your Code</span>
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
            <Button asChild variant="outline" className="border-primary text-primary hover:text-primary hover:bg-primary/10 px-8 py-6 rounded-lg">
              <Link to="/about">Learn More</Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
