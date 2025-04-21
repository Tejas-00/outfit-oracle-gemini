
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

const HomePage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-fashion-purple-light">
      <div className="container mx-auto px-4 py-12 max-w-6xl">
        {/* Header */}
        <header className="flex justify-between items-center mb-16">
          <div className="flex items-center">
            <h1 className="text-2xl font-heading font-bold text-fashion-purple-dark">Outfit Oracle</h1>
          </div>
          <nav>
            <ul className="flex space-x-8">
              <li><a href="#how-it-works" className="text-fashion-purple-medium hover:text-fashion-purple-dark transition-colors">How It Works</a></li>
              <li><a href="#about" className="text-fashion-purple-medium hover:text-fashion-purple-dark transition-colors">About</a></li>
              <li>
                <Link to="/style-form">
                  <Button variant="outline" className="border-fashion-purple hover:bg-fashion-purple-light">
                    Try Now
                  </Button>
                </Link>
              </li>
            </ul>
          </nav>
        </header>

        {/* Hero Section */}
        <section className="flex flex-col md:flex-row items-center gap-12 py-16">
          <div className="md:w-1/2">
            <h2 className="text-5xl md:text-6xl font-heading font-bold text-fashion-purple-darker leading-tight mb-6">
              Your Personal AI Stylist
            </h2>
            <p className="text-lg text-gray-700 mb-8">
              Discover perfect outfits tailored to your unique features and preferences.
              Outfit Oracle uses advanced AI to provide personalized fashion recommendations just for you.
            </p>
            <Link to="/style-form">
              <Button size="lg" className="bg-fashion-purple hover:bg-fashion-purple-medium text-white px-8 py-6 rounded-md flex items-center gap-2 text-lg">
                Get Started <ArrowRight size={18} />
              </Button>
            </Link>
          </div>
          <div className="md:w-1/2 bg-white p-6 rounded-lg shadow-xl">
            <img 
              src="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" 
              alt="AI Fashion Recommendation" 
              className="rounded-lg w-full h-auto" 
            />
          </div>
        </section>

        {/* How It Works Section */}
        <section id="how-it-works" className="py-16">
          <h2 className="text-4xl font-heading font-bold text-center mb-12 text-fashion-purple-darker">How It Works</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-lg shadow-md text-center">
              <div className="w-16 h-16 bg-fashion-accent-pink rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-fashion-purple-dark">1</span>
              </div>
              <h3 className="text-xl font-heading font-semibold mb-3 text-fashion-purple-dark">Share Your Features</h3>
              <p className="text-gray-700">Tell us about your skin tone, hair color, body type, and the occasion you're dressing for.</p>
            </div>
            
            <div className="bg-white p-8 rounded-lg shadow-md text-center">
              <div className="w-16 h-16 bg-fashion-accent-blue rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-fashion-purple-dark">2</span>
              </div>
              <h3 className="text-xl font-heading font-semibold mb-3 text-fashion-purple-dark">AI Styling</h3>
              <p className="text-gray-700">Our AI analyzes thousands of fashion combinations to find the perfect look for you.</p>
            </div>
            
            <div className="bg-white p-8 rounded-lg shadow-md text-center">
              <div className="w-16 h-16 bg-fashion-accent-green rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-fashion-purple-dark">3</span>
              </div>
              <h3 className="text-xl font-heading font-semibold mb-3 text-fashion-purple-dark">Get Recommendations</h3>
              <p className="text-gray-700">View your personalized outfit with detailed suggestions for tops, bottoms, shoes, and accessories.</p>
            </div>
          </div>
          
          <div className="text-center mt-12">
            <Link to="/style-form">
              <Button className="bg-fashion-purple hover:bg-fashion-purple-medium text-white">
                Try It Now
              </Button>
            </Link>
          </div>
        </section>
        
        {/* Meet Your AI Stylist Section */}
        <section id="about" className="py-16 bg-white rounded-2xl p-8 shadow-lg">
          <h2 className="text-4xl font-heading font-bold text-center mb-12 text-fashion-purple-darker">Meet Your AI Stylist</h2>
          
          <div className="flex flex-col md:flex-row items-center gap-12">
            <div className="md:w-1/2">
              <img 
                src="https://images.unsplash.com/photo-1649972904349-6e44c42644a7?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" 
                alt="AI Fashion Stylist" 
                className="rounded-lg w-full h-auto" 
              />
            </div>
            <div className="md:w-1/2">
              <h3 className="text-2xl font-heading font-semibold mb-4 text-fashion-purple-dark">Powered by Gemini AI</h3>
              <p className="text-lg text-gray-700 mb-6">
                Outfit Oracle uses Google's advanced Gemini AI technology to understand your unique characteristics and match them with current fashion trends.
              </p>
              <p className="text-lg text-gray-700 mb-6">
                Our AI has been trained on thousands of fashion combinations and understands how different colors, styles, and cuts work with various body types and features.
              </p>
              <p className="text-lg text-gray-700">
                The result? Personalized recommendations that enhance your natural features and make you look and feel your best.
              </p>
            </div>
          </div>
        </section>
        
        {/* CTA Section */}
        <section className="py-16 text-center">
          <h2 className="text-4xl font-heading font-bold mb-6 text-fashion-purple-darker">Ready to Transform Your Style?</h2>
          <p className="text-xl text-gray-700 mb-8 max-w-3xl mx-auto">
            Get personalized outfit recommendations based on your unique features and preferences.
          </p>
          <Link to="/style-form">
            <Button size="lg" className="bg-fashion-purple hover:bg-fashion-purple-medium text-white px-8 py-6 rounded-md flex items-center gap-2 text-lg mx-auto">
              Try It Now <ArrowRight size={18} />
            </Button>
          </Link>
        </section>
      </div>
      
      {/* Footer */}
      <footer className="bg-fashion-purple-darker text-white py-12">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div>
              <h2 className="text-2xl font-heading font-bold mb-2">Outfit Oracle</h2>
              <p className="text-fashion-neutral-light opacity-75">Your AI-powered personal stylist</p>
            </div>
            <div className="mt-6 md:mt-0">
              <p className="text-fashion-neutral-light opacity-75">© 2025 Outfit Oracle. All rights reserved.</p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default HomePage;
