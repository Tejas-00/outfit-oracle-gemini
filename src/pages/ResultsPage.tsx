import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowLeft, RefreshCw } from "lucide-react";
import { getStyleRecommendation, StyleFormData, StyleRecommendation } from "@/lib/gemini";
import { toast } from "sonner";

const ResultsPage = () => {
  const [recommendation, setRecommendation] = useState<StyleRecommendation | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [imageError, setImageError] = useState(false);

  useEffect(() => {
    const generateRecommendation = async () => {
      try {
        setLoading(true);
        setError(null);
        
        // Get form data from localStorage
        const formDataString = localStorage.getItem("styleFormData");
        
        if (!formDataString) {
          throw new Error("No style preferences found. Please fill out the form first.");
        }
        
        const formData: StyleFormData = JSON.parse(formDataString);
        
        // Get recommendation from Gemini API
        const result = await getStyleRecommendation(formData);
        setRecommendation(result);
      } catch (err) {
        console.error("Error generating recommendation:", err);
        setError(err instanceof Error ? err.message : "Something went wrong. Please try again.");
        toast.error("Failed to generate recommendation. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    generateRecommendation();
  }, []);

  const handleRegenerateClick = async () => {
    setLoading(true);
    try {
      const formDataString = localStorage.getItem("styleFormData");
      
      if (!formDataString) {
        throw new Error("No style preferences found. Please fill out the form first.");
      }
      
      const formData: StyleFormData = JSON.parse(formDataString);
      const result = await getStyleRecommendation(formData);
      setRecommendation(result);
      toast.success("New outfit generated!");
    } catch (err) {
      console.error("Error regenerating:", err);
      toast.error("Failed to generate a new outfit. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // Helper function to display the recommended outfit image
  const renderOutfitImage = () => {
    if (loading) {
      return (
        <div className="animate-pulse bg-gray-200 w-full h-80 rounded-lg"></div>
      );
    }

    if (!recommendation) {
      return (
        <div className="bg-fashion-purple-light w-full h-80 rounded-lg flex items-center justify-center">
          <p className="text-fashion-purple-dark font-semibold px-4 py-2 bg-white/80 rounded-md">
            No outfit recommendation available
          </p>
        </div>
      );
    }
    
    // If we have an imageUrl from the API and no error, use it
    if (recommendation.imageUrl && !imageError) {
      return (
        <div className="relative overflow-hidden rounded-lg aspect-[4/3] bg-fashion-purple-light">
          <img 
            src={recommendation.imageUrl}
            alt="Recommended outfit" 
            className="w-full h-full object-cover"
            onError={() => setImageError(true)}
          />
        </div>
      );
    }
    
    // Fallback to placeholder
    return (
      <div className="relative overflow-hidden rounded-lg aspect-[4/3] bg-fashion-purple-light">
        <img 
          src="https://source.unsplash.com/featured/800x600/?fashion,clothing"
          alt="Recommended outfit" 
          className="w-full h-full object-cover opacity-75"
        />
        <div className="absolute inset-0 flex items-center justify-center">
          <p className="text-center text-fashion-purple-dark font-semibold px-4 py-2 bg-white/80 rounded-md">
            Image based on your style preferences
          </p>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-fashion-purple-light py-12">
      <div className="container mx-auto px-4 max-w-5xl">
        <Link to="/style-form" className="inline-flex items-center text-fashion-purple-medium hover:text-fashion-purple-dark mb-8">
          <ArrowLeft size={16} className="mr-2" /> Back to Style Form
        </Link>
        
        <h1 className="text-4xl font-heading font-bold text-fashion-purple-dark text-center mb-8">
          Your Personalized Style Recommendation
        </h1>
        
        {error ? (
          <Card className="bg-white shadow-xl border-none p-8 text-center">
            <CardContent className="pt-6">
              <p className="text-red-500 mb-4">{error}</p>
              <Link to="/style-form">
                <Button>Return to Style Form</Button>
              </Link>
            </CardContent>
          </Card>
        ) : loading ? (
          <Card className="bg-white shadow-xl border-none p-8">
            <CardContent className="pt-6 flex flex-col items-center">
              <div className="animate-spin text-fashion-purple mb-4">
                <RefreshCw size={32} />
              </div>
              <p className="text-lg">Creating your perfect outfit...</p>
            </CardContent>
          </Card>
        ) : recommendation ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              {renderOutfitImage()}
              
              <div className="mt-6 flex justify-center">
                <Button 
                  onClick={handleRegenerateClick} 
                  variant="outline" 
                  className="flex items-center gap-2 border-fashion-purple text-fashion-purple hover:bg-fashion-purple-light"
                  disabled={loading}
                >
                  <RefreshCw size={16} />
                  Generate Another Outfit
                </Button>
              </div>
            </div>
            
            <div>
              <Card className="bg-white shadow-xl border-none h-full">
                <CardContent className="p-6">
                  <h2 className="text-2xl font-heading font-semibold text-fashion-purple-dark mb-6">Outfit Details</h2>
                  
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-lg font-medium text-fashion-purple-dark">Top</h3>
                      <p className="text-gray-700">{recommendation.outfit.top}</p>
                    </div>
                    
                    <div>
                      <h3 className="text-lg font-medium text-fashion-purple-dark">Bottom</h3>
                      <p className="text-gray-700">{recommendation.outfit.bottom}</p>
                    </div>
                    
                    <div>
                      <h3 className="text-lg font-medium text-fashion-purple-dark">Shoes</h3>
                      <p className="text-gray-700">{recommendation.outfit.shoes}</p>
                    </div>
                    
                    <div>
                      <h3 className="text-lg font-medium text-fashion-purple-dark">Accessories</h3>
                      <ul className="list-disc pl-5 text-gray-700">
                        {recommendation.outfit.accessories.map((item, index) => (
                          <li key={index}>{item}</li>
                        ))}
                      </ul>
                    </div>
                    
                    <div>
                      <h3 className="text-lg font-medium text-fashion-purple-dark">Color Palette</h3>
                      <div className="flex flex-wrap gap-2 mt-2">
                        {recommendation.outfit.colorPalette.map((color, index) => (
                          <div 
                            key={index} 
                            className="px-3 py-1 rounded-full bg-fashion-purple-light text-fashion-purple-dark text-sm"
                          >
                            {color}
                          </div>
                        ))}
                      </div>
                    </div>
                    
                    <div>
                      <h3 className="text-lg font-medium text-fashion-purple-dark">Why This Works For You</h3>
                      <p className="text-gray-700">{recommendation.description}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        ) : null}
        
        <div className="mt-12 text-center">
          <Link to="/">
            <Button variant="outline" className="border-fashion-purple text-fashion-purple hover:bg-fashion-purple-light">
              Back to Home
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ResultsPage;
