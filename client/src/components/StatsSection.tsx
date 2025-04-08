
import { useEffect, useRef } from 'react';

const stats = [
  { 
    value: '1M+', 
    label: 'Lines of Code Analyzed', 
    color: 'from-purple-500 to-purple-300' 
  },
  { 
    value: '200+', 
    label: 'Code Patterns Detected', 
    color: 'from-blue-500 to-blue-300' 
  },
  { 
    value: '50K+', 
    label: 'Optimizations Suggested', 
    color: 'from-green-500 to-green-300' 
  },
  { 
    value: '99.9%', 
    label: 'Issue Detection Accuracy', 
    color: 'from-yellow-500 to-yellow-300' 
  }
];

const StatsSection = () => {
  const statsRef = useRef<HTMLDivElement>(null);

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
    <div ref={statsRef} className="py-16 bg-black/50">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, index) => (
            <div 
              key={index} 
              className="glass-card p-6 text-center animate-on-scroll"
              style={{ animationDelay: `${index * 0.15}s` }}
            >
              <p className={`text-4xl font-bold mb-2 bg-gradient-to-r ${stat.color} bg-clip-text text-transparent`}>
                {stat.value}
              </p>
              <p className="text-gray-400">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default StatsSection;
