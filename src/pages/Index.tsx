

import { Button } from "@/components/ui/button";
import Navbar from "@/components/Navbar";
import { ArrowRight, Brain, ChartBarIcon, Shield, Linkedin, Calculator, PieChart, Info, Lock } from "lucide-react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import ModelSecurity from "@/components/ModelSecurity";
import ModelSecurityTester from "@/components/ModelSecurityTester";
import { useSecurityDataStore } from "@/store/securityDataStore";

const Index = () => {
  const navigate = useNavigate();
  const { showSecurityTester, toggleSecurityTester } = useSecurityDataStore();

  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      
      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false }}
          transition={{ duration: 0.6 }}
          className="container mx-auto text-center"
        >
          <div className="inline-block mb-4 px-4 py-1 bg-gray-100 rounded-full text-sm font-medium text-gray-800">
            Introducing Taxonomist
          </div>
          <h1 className="text-5xl font-bold text-primary mb-6 max-w-3xl mx-auto leading-tight">
            Smart Trend Analysis & Estimation System
          </h1>
          <p className="text-secondary text-xl mb-8 max-w-2xl mx-auto">
            Make data-driven decisions using our advanced estimation system that analyzes historical trends and patterns to predict future outcomes.
          </p>
          <div className="flex gap-4 justify-center">
            <Button 
              size="lg" 
              className="bg-gray-800 hover:bg-gray-700 text-white"
              onClick={() => navigate("/investment-allocation")}
            >
              <Calculator className="mr-2 h-4 w-4" />
              
              Investment Allocation
            </Button>
            <div className="flex gap-2">
              <Button 
                size="lg" 
                className="bg-blue-500 hover:bg-blue-600"
                onClick={() => navigate("/calculator")}
              >
                <PieChart className="mr-2 h-4 w-4" />
                GDP Calculator
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-blue-500 text-blue-500 hover:bg-blue-50"
                onClick={() => navigate("/learn-more")}
              >
                <Info className="mr-2 h-4 w-4" />
                Learn More
              </Button>
            </div>
          </div>
        </motion.div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false }}
            transition={{ duration: 0.6 }}
            className="text-3xl font-bold text-primary text-center mb-12"
          >
            Key Features
          </motion.h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: <Brain className="w-12 h-12 text-primary mb-4" />,
                title: "Trend Analysis",
                description: "Advanced algorithms analyze historical patterns to predict future trends."
              },
              {
                icon: <ChartBarIcon className="w-12 h-12 text-primary mb-4" />,
                title: "Data-Driven Predictions",
                description: "Make informed decisions based on comprehensive historical data analysis."
              },
              {
                icon: <Shield className="w-12 h-12 text-primary mb-4" />,
                title: "Reliable Estimates",
                description: "Get accurate estimations backed by robust statistical models."
              }
            ].map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: false }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                className="bg-white p-8 rounded-lg shadow-sm hover:shadow-md transition-shadow"
              >
                {feature.icon}
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-secondary">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* How Secure is Our Model? Section */}
      <section id="security" className="py-20 px-4 bg-gradient-to-b from-white to-gray-50">
        <div className="container mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false }}
            transition={{ duration: 0.6 }}
            className="text-center mb-8"
          >
            <div className="inline-flex items-center mb-4 px-4 py-1 bg-red-50 rounded-full text-sm font-medium text-red-600">
              <Lock className="mr-2 h-4 w-4" />
              Security Analysis
            </div>
            <h2 className="text-3xl font-bold text-primary">How Secure is Our Model?</h2>
            <p className="text-secondary text-lg mt-4 max-w-2xl mx-auto">
              Explore how our system detects and prevents data poisoning attacks to ensure reliable predictions and trend analysis.
            </p>
          </motion.div>
          
          <div className="text-center mb-8">
            <Button 
              size="lg" 
              onClick={toggleSecurityTester}
              className="bg-gray-800 text-white hover:bg-gray-700 transition-colors"
            >
              <Shield className="mr-2 h-4 w-4" />
              {showSecurityTester ? "Hide Security Analysis" : "View Security Analysis"}
            </Button>
          </div>
          
          {showSecurityTester && (
            <>
              <ModelSecurity />
              <ModelSecurityTester />
            </>
          )}
        </div>
      </section>

      {/* Team Section */}
      <section id="team" className="py-20">
        <div className="container mx-auto px-4">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false }}
            transition={{ duration: 0.6 }}
            className="text-3xl font-bold text-primary text-center mb-12"
          >
            Meet Our Team
          </motion.h2>
          <div className="grid md:grid-cols-4 gap-8">
            {[
              {
                name: "Jai Surya",
                role: "ML Engineer",
                image: "https://api.dicebear.com/7.x/initials/svg?seed=JS&backgroundColor=2D3648&textColor=ffffff",
                linkedin: "https://www.linkedin.com/in/jai-surya-1801abc/"
              },
              {
                name: "Karthick Raja",
                role: "UX/UI Designer",
                image: "https://api.dicebear.com/7.x/initials/svg?seed=KR&backgroundColor=2D3648&textColor=ffffff",
                linkedin: "http://linkedin.com/in/karthickraja777"
              },
              {
                name: "Oswald Shilo",
                role: "Frontend Developer",
                image: "https://api.dicebear.com/7.x/initials/svg?seed=OS&backgroundColor=2D3648&textColor=ffffff",
                linkedin: "https://www.linkedin.com/in/oswaldshilo/"
              },
              {
                name: "Nemaleshwar",
                role: "Backend Developer",
                image: "https://api.dicebear.com/7.x/initials/svg?seed=N&backgroundColor=2D3648&textColor=ffffff",
                linkedin: "https://www.linkedin.com/in/nemaleshwar/"
              }
            ].map((member, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: false }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                className="bg-white p-8 rounded-lg shadow-md hover:shadow-lg transition-shadow"
              >
                <img 
                  src={member.image} 
                  alt={member.name} 
                  className="w-32 h-32 rounded-full mx-auto mb-6 filter grayscale hover:grayscale-0 transition-all duration-300" 
                />
                <h3 className="text-xl font-semibold mb-2">{member.name}</h3>
                <p className="text-secondary mb-6">{member.role}</p>
                <Button 
                  variant="outline" 
                  className="w-full hover:bg-primary hover:text-white transition-colors"
                  onClick={() => window.open(member.linkedin, '_blank')}
                >
                  <Linkedin className="mr-2 h-4 w-4" />
                  Connect on LinkedIn
                </Button>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Index;
