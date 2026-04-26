import Groq from "groq-sdk";
import env from "../config/env.js";

const groq = new Groq({ apiKey: env.GROQ_API_KEY });

export const getAIAnalysis = async (profileData) => {
  const response = await groq.chat.completions.create({
    model: "llama-3.1-8b-instant",
    messages: [
      {
        role: "system",
        content: `You are an expert GitHub profile analyzer. 
You will receive a GitHub profile with repos data.
You MUST respond ONLY in this exact JSON format, no extra text, no markdown:
{
  "summary": "5-7 line overview of the developer",
  "score": <number from 1 to 10>,
  "topLanguage": "<most used programming language>",
  "bestProject": {
    "name": "<repo name>",
    "reason": "<why this is the best project in 3 line>"
  },
  "suggestions": [
    "<suggestion 1>",
    "<suggestion 2>",
    "<suggestion 3>"
  ],
  "recruiterView": "<what a recruiter would think in 1-2 lines>"
}`,
      },
      {
        role: "user",
        content: `Analyze this GitHub profile: ${JSON.stringify(profileData)}`,
      },
    ],
  });

  const raw = response.choices[0].message.content;

  // Safely parse JSON from AI
  try {
    return JSON.parse(raw);
  } catch {
    // Agar AI ne JSON sahi nahi diya toh fallback
    return { raw };
  }
};
