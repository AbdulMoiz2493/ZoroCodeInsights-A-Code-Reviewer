
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, Code, Shield, Database, Github } from 'lucide-react';
import { Button } from '@/components/ui/button';
import AnimateOnScroll from '@/components/AnimateOnScroll';

const About = () => {
  return (
    <div className="min-h-screen flex flex-col pt-16 bg-[#0d101e]">
      <AnimateOnScroll />
      
      <main className="flex-grow container mx-auto px-4 md:px-6 py-12">
        <motion.div 
          className="max-w-4xl mx-auto text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-3xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-[#9b47ff] to-[#c553ff] bg-clip-text text-transparent pb-2">
            About Zoro Code Insights
          </h1>
          <p className="text-gray-300 max-w-3xl mx-auto text-lg">
            We're on a mission to help developers write better, cleaner, and more efficient code.
          </p>
        </motion.div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-24">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
          >
            <h2 className="text-2xl md:text-3xl font-bold mb-6 text-white">Our Mission</h2>
            <p className="text-gray-300 mb-4">
              At Zoro Code Insights, we're committed to simplifying the code analysis process for developers. Our platform provides a robust, scalable solution that allows teams to focus on building great applications without worrying about code quality and performance issues.
            </p>
            <p className="text-gray-300 mb-6">
              Our AI-powered tools analyze your code for bugs, security vulnerabilities, performance bottlenecks, and style inconsistencies, providing actionable suggestions to improve your codebase.
            </p>
            <ul className="space-y-4">
              <li className="flex items-start">
                <div className="mr-4 mt-1 bg-[#9b47ff]/20 p-2 rounded-md">
                  <Code className="h-5 w-5 text-[#9b47ff]" />
                </div>
                <div>
                  <h3 className="font-semibold text-white mb-1">Real-time Code Analysis</h3>
                  <p className="text-gray-400">Get instant feedback on your code quality and performance</p>
                </div>
              </li>
              <li className="flex items-start">
                <div className="mr-4 mt-1 bg-[#9b47ff]/20 p-2 rounded-md">
                  <Shield className="h-5 w-5 text-[#9b47ff]" />
                </div>
                <div>
                  <h3 className="font-semibold text-white mb-1">Security-First Approach</h3>
                  <p className="text-gray-400">Identify and fix security vulnerabilities before they become problems</p>
                </div>
              </li>
              <li className="flex items-start">
                <div className="mr-4 mt-1 bg-[#9b47ff]/20 p-2 rounded-md">
                  <Database className="h-5 w-5 text-[#9b47ff]" />
                </div>
                <div>
                  <h3 className="font-semibold text-white mb-1">Performance Optimization</h3>
                  <p className="text-gray-400">Improve your code's efficiency with our time complexity analysis</p>
                </div>
              </li>
            </ul>
          </motion.div>
          
          <motion.div 
            className="flex items-center justify-center"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
          >
            <div className="relative w-full max-w-md">
              <div className="absolute -inset-0.5 bg-gradient-to-r from-[#9b47ff] to-[#c553ff] rounded-lg blur-lg opacity-75"></div>
              <div className="relative bg-[#0d1630] p-8 rounded-lg border border-[#1e2545]">
                <h3 className="text-xl font-bold text-white mb-4">Our Technology</h3>
                <p className="text-gray-300 mb-6">
                  We combine cutting-edge AI with proven static analysis techniques to provide the most comprehensive code insights available.
                </p>
                <ul className="space-y-3 mb-6">
                  <li className="flex items-center text-gray-300">
                    <div className="h-2 w-2 rounded-full bg-[#9b47ff] mr-3"></div>
                    <span>Advanced AI code analysis</span>
                  </li>
                  <li className="flex items-center text-gray-300">
                    <div className="h-2 w-2 rounded-full bg-[#9b47ff] mr-3"></div>
                    <span>Pattern recognition algorithms</span>
                  </li>
                  <li className="flex items-center text-gray-300">
                    <div className="h-2 w-2 rounded-full bg-[#9b47ff] mr-3"></div>
                    <span>Real-time collaboration</span>
                  </li>
                  <li className="flex items-center text-gray-300">
                    <div className="h-2 w-2 rounded-full bg-[#9b47ff] mr-3"></div>
                    <span>Secure MongoDB storage</span>
                  </li>
                  <li className="flex items-center text-gray-300">
                    <div className="h-2 w-2 rounded-full bg-[#9b47ff] mr-3"></div>
                    <span>Node.js backend architecture</span>
                  </li>
                </ul>
                <div className="flex items-center text-sm text-gray-400">
                  <Github className="h-4 w-4 mr-2" />
                  <span>Open source contributions welcome</span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
        
        
        
        <div className="max-w-3xl mx-auto text-center animate-on-scroll">
          <h2 className="text-3xl font-bold mb-6 bg-gradient-to-r from-[#9b47ff] to-[#c553ff] bg-clip-text text-transparent">
            Ready to try Zoro Code Insights?
          </h2>
          <p className="text-gray-300 text-lg mb-8">
            Experience the power of AI-driven code analysis and take your development to the next level.
          </p>
          <Button asChild className="bg-[#9b47ff] hover:bg-[#8a3ef0] text-white px-8 py-6 rounded-lg text-lg">
            <Link to="/analyze" className="flex items-center">
              <span>Analyze Your First Project</span>
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </Button>
        </div>
      </main>
    </div>
  );
};

export default About;
