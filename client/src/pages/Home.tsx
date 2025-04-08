
import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, Check, Zap, Code, Shield, Terminal } from 'lucide-react';
import { Button } from '@/components/ui/button';
import AnimateOnScroll from '@/components/AnimateOnScroll';

const Home = () => {
  useEffect(() => {
    // Initialize animations on page load
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

  const features = [
    {
      icon: Code,
      title: "Advanced Code Analysis",
      description: "Identify bugs, security risks, and performance issues with our AI-powered code analysis engine."
    },
    {
      icon: Zap,
      title: "Time Complexity Insights",
      description: "Get detailed time complexity analysis of your code and suggestions for optimization."
    },
    {
      icon: Shield,
      title: "Security Scanning",
      description: "Detect potential security vulnerabilities and get recommendations for fixing them."
    },
    {
      icon: Terminal,
      title: "Code Refactoring",
      description: "Receive AI-generated refactoring suggestions to improve your code's readability and maintainability."
    }
  ];

  const plans = [
    {
      name: 'Free',
      price: '$0',
      period: '/month',
      description: 'Perfect for small projects and individual developers',
      features: [
        'Basic code analysis',
        'Up to 1,000 lines per month',
        'Common issue detection',
        'Basic AI optimization suggestions',
      ],
      buttonText: 'Get Started',
      buttonLink: '/analyze',
      mostPopular: false,
    },
    {
      name: 'Pro',
      price: '$19',
      period: '/month',
      description: 'Ideal for professional developers and small teams',
      features: [
        'Advanced code analysis',
        'Unlimited lines of code',
        'Time complexity optimization',
        'Advanced AI suggestions',
        'API access',
        'Priority support',
      ],
      buttonText: 'Go Pro',
      buttonLink: '/analyze',
      mostPopular: true,
    },
    {
      name: 'Enterprise',
      price: 'Custom',
      period: '',
      description: 'For large teams with advanced requirements',
      features: [
        'Everything in Pro',
        'Custom integrations',
        'Dedicated support',
        'Team collaboration features',
        'Advanced security features',
        'Custom reporting',
      ],
      buttonText: 'Contact Us',
      buttonLink: '/about',
      mostPopular: false,
    },
  ];

  const stats = [
    { value: '99.9%', label: 'Accuracy', color: 'from-[#9b47ff] to-[#c553ff]' },
    { value: '50K+', label: 'Code Analyses', color: 'from-[#4778ff] to-[#53c5ff]' },
    { value: '24/7', label: 'Support', color: 'from-[#47ff9b] to-[#53ffc5]' },
    { value: '5s', label: 'Avg. Response', color: 'from-[#ff9b47] to-[#ffc553]' }
  ];

  return (
    <div className="min-h-screen flex flex-col bg-[#0d101e]">
      <AnimateOnScroll />
      
      <main className="flex-grow pt-16">
        {/* Hero Section */}
        <div className="relative overflow-hidden py-24 sm:py-32 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-[#1e1f45] via-[#0d101e] to-[#0d101e]">
          <div className="absolute inset-0 bg-grid-white/[0.05] bg-[size:60px_60px] z-0"></div>
          <div className="container relative mx-auto px-4 md:px-6 z-10">
            <motion.div 
              className="flex flex-col items-center text-center max-w-4xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight">
                <span className="bg-gradient-to-r from-[#9b47ff] to-[#c553ff] bg-clip-text text-transparent">
                  Zoro Code Insights
                </span>
              </h1>
              <p className="mt-6 text-lg md:text-xl text-gray-300 max-w-3xl">
                AI-powered code analysis that helps you write better, cleaner, and more efficient code. 
                Identify issues, optimize performance, and elevate your coding practices.
              </p>
              <div className="mt-10 flex flex-col sm:flex-row gap-4 w-full justify-center">
                <Button asChild className="bg-[#9b47ff] hover:bg-[#8a3ef0] text-white px-8 py-6 rounded-lg text-lg">
                  <Link to="/analyze" className="flex items-center">
                    <span>Analyze Your Code</span>
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Link>
                </Button>
                <Button asChild variant="outline" className="border-[#9b47ff] text-[#9b47ff] hover:text-[#9b47ff] hover:bg-[#9b47ff]/10 px-8 py-6 rounded-lg text-lg">
                  <Link to="/about">Learn More</Link>
                </Button>
              </div>
            </motion.div>
          </div>
        </div>
        
        {/* Features Section */}
        <div className="py-16 md:py-24">
          <div className="container mx-auto px-4 md:px-6">
            <div className="text-center mb-16 animate-on-scroll">
              <h2 className="text-3xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-[#9b47ff] to-[#c553ff] bg-clip-text text-transparent">
                Powerful Features
              </h2>
              <p className="text-gray-400 max-w-2xl mx-auto text-lg">
                Discover how Zoro Code Insights can help you write better, cleaner, and more efficient code
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {features.map((feature, index) => (
                <div 
                  key={index} 
                  className="border border-[#1e2545] bg-[#0d1630]/50 backdrop-blur-sm rounded-xl p-6 animate-on-scroll hover:border-[#9b47ff]/50 transition-all duration-300"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className="w-12 h-12 rounded-full flex items-center justify-center bg-gradient-to-r from-[#9b47ff] to-[#c553ff] mb-4">
                    <feature.icon className="h-6 w-6 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-white mb-2">{feature.title}</h3>
                  <p className="text-gray-400">
                    {feature.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
        
        {/* Stats Section */}
        <div className="py-16 bg-[#0a0d1a]">
          <div className="container mx-auto px-4 md:px-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {stats.map((stat, index) => (
                <div 
                  key={index} 
                  className="border border-[#1e2545] bg-[#0d1630]/30 backdrop-blur-sm rounded-xl p-6 text-center animate-on-scroll"
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
        
        {/* CTA Section */}
        <div className="py-16 md:py-24 bg-gradient-to-b from-[#0d101e] to-[#0a0d1a]">
          <div className="container mx-auto px-4 md:px-6 text-center">
            <div className="max-w-3xl mx-auto animate-on-scroll">
              <h2 className="text-3xl md:text-4xl font-bold mb-6 bg-gradient-to-r from-[#9b47ff] to-[#c553ff] bg-clip-text text-transparent">
                Ready to optimize your code?
              </h2>
              <p className="text-gray-300 text-lg mb-8">
                Start using Zoro Code Insights today and take your code quality to the next level.
              </p>
              <Button asChild className="bg-[#9b47ff] hover:bg-[#8a3ef0] text-white px-8 py-6 rounded-lg text-lg">
                <Link to="/analyze" className="flex items-center">
                  <span>Analyze Your Code Now</span>
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
        
        {/* Pricing Section */}
        <div className="py-16 md:py-24">
          <div className="container mx-auto px-4 md:px-6">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-[#9b47ff] to-[#c553ff] bg-clip-text text-transparent animate-on-scroll pb-2">
                Simple, Transparent Pricing
              </h2>
              <p className="text-gray-400 max-w-2xl mx-auto text-lg animate-on-scroll" style={{ animationDelay: '0.1s' }}>
                Choose the plan that works best for you and your team
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {plans.map((plan, index) => (
                <div 
                  key={index} 
                  className={`border ${plan.mostPopular ? 'border-[#9b47ff]' : 'border-[#1e2545]'} bg-[#0d1630]/30 backdrop-blur-sm rounded-xl overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:shadow-[#9b47ff]/10 animate-on-scroll`}
                  style={{ animationDelay: `${index * 0.15}s` }}
                >
                  {plan.mostPopular && (
                    <div className="bg-[#9b47ff] text-white text-center py-1 text-sm font-medium">
                      Most Popular
                    </div>
                  )}
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-white">{plan.name}</h3>
                    <div className="mt-4 mb-6">
                      <span className="text-4xl font-bold text-white">{plan.price}</span>
                      {plan.period && (
                        <span className="text-gray-400 ml-1">{plan.period}</span>
                      )}
                    </div>
                    <p className="text-gray-400 mb-6">{plan.description}</p>
                    <ul className="space-y-3 mb-8">
                      {plan.features.map((feature, featureIndex) => (
                        <li key={featureIndex} className="flex items-start">
                          <Check className="h-5 w-5 text-[#47ff9b] mr-2 flex-shrink-0 mt-0.5" />
                          <span className="text-sm text-gray-300">{feature}</span>
                        </li>
                      ))}
                    </ul>
                    <Button 
                      asChild
                      className={`w-full ${
                        plan.mostPopular 
                          ? 'bg-[#9b47ff] hover:bg-[#8a3ef0]' 
                          : 'bg-[#1e2545] hover:bg-[#2a3158]'
                      }`}
                    >
                      <Link to={plan.buttonLink}>
                        {plan.buttonText}
                      </Link>
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Technology Stack Section */}
        <div className="py-16 md:py-24 bg-[#0a0d1a]">
          <div className="container mx-auto px-4 md:px-6">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-[#9b47ff] to-[#c553ff] bg-clip-text text-transparent animate-on-scroll pb-2">
                Our Technology Stack
              </h2>
              <p className="text-gray-400 max-w-3xl mx-auto text-lg animate-on-scroll" style={{ animationDelay: '0.1s' }}>
                Powered by industry-leading technologies for maximum reliability and performance
              </p>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                { name: "AI Analysis", desc: "Intelligent Code Parsing" },
                { name: "Node.js", desc: "Runtime Environment" },
                { name: "MongoDB", desc: "Persistent Storage" },
                { name: "Socket.io", desc: "Real-time Collaboration" }
              ].map((tech, index) => (
                <div 
                  key={index} 
                  className="border border-[#1e2545] bg-[#0d1630]/30 backdrop-blur-sm rounded-xl p-6 text-center animate-on-scroll"
                  style={{ animationDelay: `${index * 0.15}s` }}
                >
                  <h3 className="text-xl font-bold text-white mb-2">{tech.name}</h3>
                  <p className="text-gray-400">{tech.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Home;
