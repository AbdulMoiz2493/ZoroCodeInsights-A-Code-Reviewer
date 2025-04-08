
import { Check } from 'lucide-react';
import { Button } from '@/components/ui/button';

const plans = [
  {
    name: 'Free',
    price: '$0',
    description: 'Perfect for small projects and individual developers',
    features: [
      'Basic code analysis',
      'Up to 1,000 lines per month',
      'Common issue detection',
      'Basic AI optimization suggestions',
    ],
    buttonText: 'Get Started',
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
    mostPopular: true,
  },
  {
    name: 'Enterprise',
    price: 'Custom',
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
    mostPopular: false,
  },
];

const PricingSection = () => {
  return (
    <div className="py-16 md:py-24">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-primary to-purple-400 bg-clip-text text-transparent">
            Simple, Transparent Pricing
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Choose the plan that works best for you and your team
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {plans.map((plan, index) => (
            <div 
              key={index} 
              className={`glass-card overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl ${
                plan.mostPopular ? 'border-primary' : 'border-border'
              }`}
            >
              {plan.mostPopular && (
                <div className="bg-primary text-white text-center py-1 text-sm font-medium">
                  Most Popular
                </div>
              )}
              <div className="p-6">
                <h3 className="text-xl font-bold">{plan.name}</h3>
                <div className="mt-4 mb-6">
                  <span className="text-4xl font-bold">{plan.price}</span>
                  {plan.period && (
                    <span className="text-gray-400 ml-1">{plan.period}</span>
                  )}
                </div>
                <p className="text-gray-400 mb-6">{plan.description}</p>
                <ul className="space-y-3 mb-8">
                  {plan.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-start">
                      <Check className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                      <span className="text-sm">{feature}</span>
                    </li>
                  ))}
                </ul>
                <Button 
                  className={`w-full ${
                    plan.mostPopular 
                      ? 'bg-primary hover:bg-primary/90' 
                      : 'bg-secondary hover:bg-secondary/90'
                  }`}
                >
                  {plan.buttonText}
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PricingSection;
