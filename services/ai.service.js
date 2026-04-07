import Groq from "groq-sdk"
import env from '../config/env.js'

const groq = new Groq({ apiKey: env.GROQ_API_KEY })

export const getPublicAnalysis = async (profileData) => {
    try {
        const response = await groq.chat.completions.create({
            model: "llama-3.1-8b-instant",
            messages: [
                {
                    role: "system",
                    content: "You are a professional Github analyzer. Give a short, crisp 3-4 line summary of the developer's profile."
                },
                {
                    role: "user",
                    content: `Analyze this Github profile and give a short summary: ${JSON.stringify(profileData)}`
                }
            ]
        })

        return response.choices[0].message.content

    } catch (error) {
        throw error
    }
}

export const getDetailedAnalysis = async (profileData) => {
    try {
        const response = await groq.chat.completions.create({
            model: "llama-3.1-8b-instant",
            messages: [
                {
                    role: "system",
                    content: `You are an expert GitHub profile analyzer. Analyze the profile and give detailed feedback covering:
                    1. Profile completeness
                    2. Tech stack based on repos
                    3. Areas of improvement
                    4. Recruiter perspective
                    5. Overall score out of 10`
                },
                {
                    role: "user",
                    content: `Analyze this GitHub profile in detail: ${JSON.stringify(profileData)}`
                }
            ]
        })

        return response.choices[0].message.content

    } catch (error) {
        throw error
    }
}