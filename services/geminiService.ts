
import { GoogleGenAI, Type } from "@google/genai";
import { Language, ManualReference } from "../types";
import { MANUAL_DATA } from "../constants";

export interface AIResponse {
  text: string;
  references: ManualReference[];
}

export const askAIAboutManual = async (query: string, lang: Language = 'ja'): Promise<AIResponse> => {
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  
  const languageNames: Record<Language, string> = {
    ja: 'Japanese (やさしい日本語)',
    en: 'English',
    vi: 'Vietnamese (Tiếng Việt)',
    pt: 'Portuguese (Português)',
    tl: 'Tagalog',
    id: 'Indonesian (Bahasa Indonesia)',
    ne: 'Nepali (नेपाली)'
  };

  // Create a simplified version of the manual data for context
  const manualContext = MANUAL_DATA.map(section => ({
    sectionId: section.id,
    sectionTitle: section.title,
    pages: section.pages.map(page => ({
      pageId: page.id,
      pageTitle: page.title,
      pdfPage: page.pdfPage,
      content: page.content,
      steps: page.steps.map(step => ({
        title: step.title,
        description: step.description
      }))
    }))
  }));

  const response = await ai.models.generateContent({
    model: 'gemini-3-flash-preview',
    contents: `
User Question: "${query}"
Target Language: ${languageNames[lang]}

Manual Context:
${JSON.stringify(manualContext, null, 2)}

You are a help AI for an operation manual of a production management system in a plastic factory.
Follow these rules to answer the user:
1. Answer in ${languageNames[lang]}.
2. Use very simple and clear language that is easy for someone not fluent in the language to understand.
3. Avoid technical jargon.
4. Use bullet points or numbered lists for short explanations.
5. Use "1.", "2." for steps.
6. Use polite and encouraging language.
7. Identify which parts of the manual are relevant to the user's question.
8. Return the answer in JSON format with "text" (the explanation) and "references" (an array of relevant manual pages).
9. Each reference should have "sectionId", "pageId", "title" (in the target language), and "pdfPage".

Example JSON response:
{
  "text": "ログインの手順は...",
  "references": [
    {
      "sectionId": "startup",
      "pageId": "login",
      "title": "ログイン（はじめる）",
      "pdfPage": 6
    }
  ]
}
    `,
    config: {
      temperature: 0.7,
      topP: 0.95,
      responseMimeType: 'application/json',
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          text: { type: Type.STRING },
          references: {
            type: Type.ARRAY,
            items: {
              type: Type.OBJECT,
              properties: {
                sectionId: { type: Type.STRING },
                pageId: { type: Type.STRING },
                title: { type: Type.STRING },
                pdfPage: { type: Type.NUMBER }
              },
              required: ["sectionId", "pageId", "title"]
            }
          }
        },
        required: ["text", "references"]
      }
    }
  });

  try {
    return JSON.parse(response.text);
  } catch (e) {
    return {
      text: response.text,
      references: []
    };
  }
};
