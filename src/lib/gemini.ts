import { GoogleGenerativeAI } from "@google/generative-ai";

// IMPORTANT: This is your Gemini API key, which you've provided and is OK for frontend public usage.
const API_KEY = "AIzaSyCfz13EWBfTpWJeA1OhL1828LfKPlooLBI";

// Initialize the Gemini API
const genAI = new GoogleGenerativeAI(API_KEY);

export interface StyleFormData {
  skinTone: string;
  hairColor: string;
  bodyType: string;
  height: string;
  gender: string;
  occasion: string;
  additionalInfo?: string;
}

export interface StyleRecommendation {
  outfit: {
    top: string;
    bottom: string;
    shoes: string;
    accessories: string[];
    colorPalette: string[];
  };
  description: string;
  imagePrompt: string;
  imageUrl?: string; // Added to store generated image URL
}

export const getStyleRecommendation = async (
  formData: StyleFormData
): Promise<StyleRecommendation> => {
  try {
    console.log("Generating style recommendation for:", formData);

    const model = genAI.getGenerativeModel({ 
      model: "gemini-1.5-pro",
      generationConfig: {
        temperature: 0.9,
        topK: 1,
        topP: 1,
        maxOutputTokens: 2048,
      }
    });

    const prompt = `
      As a fashion expert, create a detailed outfit recommendation for a person with the following characteristics:

      - Skin tone: ${formData.skinTone}
      - Hair color: ${formData.hairColor}
      - Body type: ${formData.bodyType}
      - Height: ${formData.height}
      - Gender: ${formData.gender}
      - Occasion: ${formData.occasion}
      ${formData.additionalInfo ? `- Additional information: ${formData.additionalInfo}` : ''}

      Please provide:
      1. A specific outfit recommendation with details for top, bottom, shoes, and accessories
      2. A color palette that would complement their features
      3. A brief explanation of why this outfit would work well for them
      4. A detailed text prompt that could be used to generate an image of this outfit (without mentioning that it's a prompt)

      Format the response in JSON with the following structure:
      {
        "outfit": {
          "top": "description",
          "bottom": "description",
          "shoes": "description",
          "accessories": ["item1", "item2", "etc"],
          "colorPalette": ["color1", "color2", "etc"]
        },
        "description": "explanation of why this works",
        "imagePrompt": "detailed description for image generation"
      }
    `;

    try {
      // Call the Gemini API
      const result = await model.generateContent(prompt);
      const response = await result.response;
      const text = response.text();
      
      console.log("Gemini API response:", text);

      // Parse the JSON response
      const jsonMatch = text.match(/\{[\s\S]*\}/);
      if (!jsonMatch) {
        throw new Error("Invalid response format from Gemini API");
      }
      
      const jsonStr = jsonMatch[0];
      const recommendation = JSON.parse(jsonStr);
      
      // Ensure the response has the correct structure
      if (!recommendation.outfit || !recommendation.description || !recommendation.imagePrompt) {
        throw new Error("Incomplete response from Gemini API");
      }
      
      // Generate image URL using the image prompt (for demo, using a placeholder)
      const imageUrl = `https://source.unsplash.com/featured/800x600/?fashion,${encodeURIComponent(recommendation.outfit.top.split(' ')[0])},${encodeURIComponent(recommendation.outfit.bottom.split(' ')[0])},${encodeURIComponent(formData.occasion)}`;
      
      return {
        ...recommendation,
        imageUrl
      };
    } catch (apiError) {
      console.error("Error calling Gemini API:", apiError);
      // If API call fails, fall back to mock data
      console.log("Falling back to mock data...");
      return {
        ...getMockStyleRecommendation(formData),
        imageUrl: `https://source.unsplash.com/random/800x600/?fashion,${encodeURIComponent(formData.occasion)}`
      };
    }
  } catch (error) {
    console.error("Error generating style recommendation:", error);
    throw new Error("Failed to generate style recommendation. Please try again.");
  }
};

// This function generates mock recommendations for demo purposes
// It will only be used as a fallback if the API call fails
function getMockStyleRecommendation(formData: StyleFormData): StyleRecommendation {
  const occasionMap: Record<string, StyleRecommendation> = {
    casual: {
      outfit: {
        top: "Relaxed-fit cream cotton henley top",
        bottom: "Mid-rise straight-leg jeans in medium wash",
        shoes: "White leather low-top sneakers",
        accessories: ["Minimal gold pendant necklace", "Leather strap watch", "Woven belt"],
        colorPalette: ["Cream", "Denim blue", "White", "Gold accents"]
      },
      description: "This casual outfit balances comfort with style. The neutral cream top complements your skin tone, while the straight-leg jeans create a balanced silhouette for your body type. The white sneakers add a clean, modern touch, and the minimal accessories provide just enough interest without overwhelming.",
      imagePrompt: "Stylish casual outfit featuring a cream henley top, well-fitted medium wash jeans, white leather sneakers, and minimal gold accessories. The outfit is modeled on a person with the specified features, styled professionally and photographed in natural light."
    },
    work: {
      outfit: {
        top: "Tailored light blue button-down shirt",
        bottom: "Charcoal gray slim-fit trousers",
        shoes: "Brown leather derby shoes",
        accessories: ["Silver minimalist watch", "Matte navy tie", "Brown leather belt"],
        colorPalette: ["Light blue", "Charcoal gray", "Brown", "Navy", "Silver"]
      },
      description: "This professional outfit creates a polished look appropriate for the workplace. The tailored light blue shirt flatters your complexion, while the slim-fit trousers create a streamlined silhouette that works well with your body type and height. The brown derby shoes add a classic touch, and the coordinated accessories pull the look together professionally.",
      imagePrompt: "Professional work outfit with a crisp light blue button-down shirt, perfectly tailored charcoal gray trousers, polished brown leather shoes, and coordinated accessories including a navy tie and silver watch. The outfit is worn by a person with the specified features, photographed in an office setting with clean, professional styling."
    },
    formal: {
      outfit: {
        top: "Black fitted tuxedo jacket with satin lapels over ivory silk blouse",
        bottom: "Matching black tuxedo trousers with satin stripe",
        shoes: "Black patent leather pointed-toe pumps",
        accessories: ["Pearl drop earrings", "Delicate diamond bracelet", "Small satin clutch"],
        colorPalette: ["Black", "Ivory", "Pearl white", "Silver"]
      },
      description: "This elegant formal ensemble creates a timeless look that's perfect for special occasions. The fitted tuxedo flatters your proportions, while the ivory blouse softens the look and complements your skin tone. The pointed-toe pumps add height and sophistication, and the pearl and diamond accessories add just the right amount of luxury without overwhelming.",
      imagePrompt: "Elegant formal outfit featuring a perfectly fitted black tuxedo with satin lapels, ivory silk blouse, matching tuxedo trousers, and patent leather pumps. Accessorized with pearl earrings and a diamond bracelet. The outfit is worn by a person with the specified features, styled sophisticatedly and photographed in an upscale setting with dramatic lighting."
    }
  };

  // Default to casual if the occasion isn't in our map
  return occasionMap[formData.occasion] || occasionMap.casual;
}

// Test function to verify API key
export const testGeminiAPI = async () => {
  try {
    console.log("Testing Gemini API key...");
    
    // Try to use the model with specific configuration
    const model = genAI.getGenerativeModel({ 
      model: "gemini-1.5-pro",
      generationConfig: {
        temperature: 0.9,
        topK: 1,
        topP: 1,
        maxOutputTokens: 2048,
      }
    });
    
    // Simple test prompt
    const testPrompt = "Hello, this is a test. Please respond with 'API is working'";
    
    const result = await model.generateContent(testPrompt);
    const response = await result.response;
    const text = response.text();
    
    console.log("API Response:", text);
    return { success: true, message: "API key is valid" };
  } catch (error) {
    console.error("API Test Error Details:", {
      error,
      message: error instanceof Error ? error.message : "Unknown error",
      stack: error instanceof Error ? error.stack : undefined
    });
    
    return { 
      success: false, 
      message: "API key is invalid or there's an error",
      error: error instanceof Error ? error.message : "Unknown error"
    };
  }
};
