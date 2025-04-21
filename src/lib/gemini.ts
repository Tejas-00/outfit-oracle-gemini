
import { GoogleGenerativeAI } from "@google/generative-ai";

// IMPORTANT: This is your Gemini API key, which you've provided and is OK for frontend public usage.
const API_KEY = "AIzaSyBbi_NV6uc5pWixErFT3Pg1035SPbsNR44";

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
}

export const getStyleRecommendation = async (
  formData: StyleFormData
): Promise<StyleRecommendation> => {
  try {
    console.log("Generating style recommendation for:", formData);

    // This is a placeholder function that would normally call the Gemini API
    // For demo purposes, we'll return a mock response

    // In a real implementation, you would:
    // 1. Create a prompt using the form data
    // 2. Send the prompt to the Gemini API
    // 3. Parse the response and return a StyleRecommendation

    const model = genAI.getGenerativeModel({ model: "gemini-pro" });

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

    // For demo purposes, we'll return a mock response instead of calling the API
    // In a real implementation, you would uncomment this code and use the actual API response
    /*
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();

    // Parse the JSON response
    const recommendation = JSON.parse(text);
    return recommendation;
    */

    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 2000));

    // Return mock data based on the form input
    return getMockStyleRecommendation(formData);
  } catch (error) {
    console.error("Error generating style recommendation:", error);
    throw new Error("Failed to generate style recommendation. Please try again.");
  }
};

// This function generates mock recommendations for demo purposes
// In a real application, this would be replaced by the actual Gemini API call
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

