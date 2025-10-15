
import { GoogleGenAI, Modality } from "@google/genai";
import { GenerationParams, PackageTier } from '../types';
import { PACKAGES } from '../constants';

const API_KEY = process.env.API_KEY;
if (!API_KEY) {
  console.error("API_KEY environment variable not set.");
}
const ai = new GoogleGenAI({ apiKey: API_KEY! });
const model = 'gemini-2.5-flash-image';

export const fileToBase64 = (file: File): Promise<string> =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve((reader.result as string).split(',')[1]);
    reader.onerror = (error) => reject(error);
  });

const generatePrompt = (params: GenerationParams, variation: number): any[] => {
    const { brandName, tagline, style, logoBase64, logoMimeType } = params;
    
    let promptText = `Create a professional, modern, and eye-catching marketing image for a brand named "${brandName}".
The main tagline or text to feature is: "${tagline}".
The desired style is: "${style}".
The image should be suitable for a high-impact social media post.
Ensure the text is legible and well-integrated into the design.
The overall mood should be energetic and professional.`;

    if (variation > 0) {
      promptText += `\nThis is variation ${variation + 1}. Please provide a distinctly different layout or color scheme from previous versions.`;
    }

    const parts: any[] = [];
    if (logoBase64 && logoMimeType) {
        parts.push({
            inlineData: {
                data: logoBase64,
                mimeType: logoMimeType,
            },
        });
        promptText += "\nIncorporate the provided logo naturally into the design.";
    }
    
    parts.push({ text: promptText });
    return parts;
};

export const generateMarketingImages = async (params: GenerationParams): Promise<string[]> => {
    const selectedPackage = PACKAGES.find(p => p.id === params.packageTier);
    if (!selectedPackage) {
        throw new Error("Invalid package selected");
    }

    const imagePromises: Promise<string>[] = [];

    for (let i = 0; i < selectedPackage.imageCount; i++) {
        imagePromises.push(
            (async () => {
                try {
                    const response = await ai.models.generateContent({
                        model: model,
                        contents: [{ parts: generatePrompt(params, i) }],
                        config: {
                            responseModalities: [Modality.IMAGE],
                        },
                    });
                    
                    for (const part of response.candidates[0].content.parts) {
                        if (part.inlineData) {
                            return `data:${part.inlineData.mimeType};base64,${part.inlineData.data}`;
                        }
                    }
                    throw new Error('No image data found in response');
                } catch (error) {
                    console.error('Error generating image:', error);
                    throw new Error(`Failed to generate image variation ${i + 1}`);
                }
            })()
        );
    }

    return Promise.all(imagePromises);
};
