
import { useEffect, useRef } from 'react';

const testimonials = [
  {
    quote: "Zoro Code Insights has completely changed how we review code. The AI suggestions have helped us catch bugs that would have otherwise made it to production.",
    author: "Sarah Mitchell",
    role: "Senior Developer at TechCorp",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=120&h=120"
  },
  {
    quote: "The time complexity analysis is incredible. It's like having a performance expert review your code in seconds. We've seen a 30% improvement in our app's performance.",
    author: "James Wilson",
    role: "CTO at Startup Inc.",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=120&h=120"
  },
  {
    quote: "As a coding instructor, I recommend Zoro to all my students. It helps them understand the common pitfalls and best practices in real-time.",
    author: "Elena Rodriguez",
    role: "Lead Instructor at CodeAcademy",
    image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&q=80&w=120&h=120"
  }
];

const Testimonials = () => {
  const testimonialsRef = useRef<HTMLDivElement>(null);

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
    <div ref={testimonialsRef} className="py-16 md:py-24 bg-background">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-primary to-purple-400 bg-clip-text text-transparent">
            What Our Users Say
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Don't just take our word for it - hear from the developers who use Zoro Code Insights
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div 
              key={index} 
              className="glass-card p-6 animate-on-scroll"
              style={{ animationDelay: `${index * 0.15}s` }}
            >
              <p className="italic text-gray-300 mb-6">"{testimonial.quote}"</p>
              <div className="flex items-center">
                <img 
                  src={testimonial.image} 
                  alt={testimonial.author}
                  className="w-12 h-12 rounded-full object-cover mr-4" 
                />
                <div>
                  <p className="font-medium">{testimonial.author}</p>
                  <p className="text-sm text-gray-400">{testimonial.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Testimonials;
