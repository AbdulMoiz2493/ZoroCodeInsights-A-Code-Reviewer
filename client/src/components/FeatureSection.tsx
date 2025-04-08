
import { useEffect, useRef } from 'react';
import { AlertTriangle, Clock, Zap, Code } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const features = [
  {
    title: 'Static Code Analysis',
    description: 'Identify bugs, security issues, and code smells with advanced static analysis that checks your code for potential problems before they cause issues.',
    icon: AlertTriangle,
    color: 'from-yellow-600 to-yellow-400'
  },
  {
    title: 'Time Complexity Insights',
    description: 'Understand the efficiency of your algorithms with time complexity analysis and suggestions for improving performance.',
    icon: Clock,
    color: 'from-blue-600 to-blue-400'
  },
  {
    title: 'AI-Powered Recommendations',
    description: 'Get smart suggestions from our AI to optimize your code, improve readability, and follow best practices.',
    icon: Zap,
    color: 'from-purple-600 to-purple-400'
  },
  {
    title: 'Real-time Collaboration',
    description: 'Share your code reviews with team members and collaborate in real-time to improve code quality together.',
    icon: Code,
    color: 'from-green-600 to-green-400'
  }
];

const FeatureSection = () => {
  const featuresRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
          }
        });
      },
      {
        root: null,
        rootMargin: '0px',
        threshold: 0.1,
      }
    );

    const elements = document.querySelectorAll('.animate-on-scroll');
    elements.forEach((el) => observer.observe(el));

    return () => {
      elements.forEach((el) => observer.unobserve(el));
    };
  }, []);

  return (
    <div ref={featuresRef} className="py-16 md:py-24 bg-background">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-primary to-purple-400 bg-clip-text text-transparent">
            Powerful Features
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Discover how Zoro Code Insights can help you write better, cleaner, and more efficient code
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {features.map((feature, index) => (
            <Card 
              key={index} 
              className="border border-border bg-black/30 backdrop-blur-sm animate-on-scroll"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <CardHeader className="pb-2">
                <div className="w-12 h-12 rounded-full flex items-center justify-center bg-gradient-to-r mb-4" style={{backgroundImage: `linear-gradient(to right, var(--${feature.color})`}}>
                  <feature.icon className="h-6 w-6 text-white" />
                </div>
                <CardTitle className="text-xl">{feature.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-400">
                  {feature.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FeatureSection;
