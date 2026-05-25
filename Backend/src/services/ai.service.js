const { GoogleGenAI } = require("@google/genai");

const ai = new GoogleGenAI({
    apiKey: process.env.GOOGLE_GENAI_API_KEY
});

// Helper function that returns the clean OpenAPI 3.0 schema Gemini natively expects
function getGeminiSchema() {
    return {
        type: "OBJECT",
        properties: {
            matchScore: {
                type: "NUMBER",
                description: "A score between 0 and 100 indicating how well the candidate's profile matches the job description, based on factors like skills, experience, education etc."
            },
            technicalQuestions: {
                type: "ARRAY",
                description: "List of technical questions that can be asked in the interview, along with the intention of interviewer behind asking those questions and how to answer those questions",
                items: {
                    type: "OBJECT",
                    properties: {
                        question: { type: "STRING", description: "The technical question can be asked in the interview" },
                        intention: { type: "STRING", description: "Intention of interviewer behind asking this question" },
                        answer: { type: "STRING", description: "How to answer the question, what points to cover, what approach to take etc." }
                    },
                    required: ["question", "intention", "answer"]
                }
            },
            behavioralQuestions: {
                type: "ARRAY",
                description: "List of behavioral questions that can be asked in the interview, along with the intention of interviewer behind asking those questions and how to answer those questions",
                items: {
                    type: "OBJECT",
                    properties: {
                        question: { type: "STRING", description: "The behavioral question can be asked in the interview" },
                        intention: { type: "STRING", description: "Intention of interviewer behind asking this question" },
                        answer: { type: "STRING", description: "How to answer the question, what points to cover, what approach to take etc." }
                    },
                    required: ["question", "intention", "answer"]
                }
            },
            skillGaps: {
                type: "ARRAY",
                description: "List of skill gaps that the candidate needs to work on, along with the severity of those skill gaps",
                items: {
                    type: "OBJECT",
                    properties: {
                        skill: { type: "STRING", description: "The skill that the candidate is lacking" },
                        severity: { type: "STRING", enum: ["low", "medium", "high"], description: "Severity of the skill gap, i.e., how important is it for the candidate to work on this skill gap" }
                    },
                    required: ["skill", "severity"]
                }
            },
            preparationPlan: {
                type: "ARRAY",
                description: "A day-wise preparation plan for the candidate to prepare for the interview, based on the technical questions, behavioral questions and skill gaps identified above",
                items: {
                    type: "OBJECT",
                    properties: {
                        day: { type: "NUMBER", description: "Day number of the preparation plan, starting from 1" },
                        focus: { type: "STRING", description: "The main focus of this day in the preparation plan, e.g., data structures, system design, behavioral questions etc." },
                        tasks: { 
                            type: "ARRAY", 
                            items: { type: "STRING" },
                            description: "List of tasks to be done on that day to prepare for the interview" 
                        }
                    },
                    required: ["day", "focus", "tasks"]
                }
            }
        },
        required: ["matchScore", "technicalQuestions", "behavioralQuestions", "skillGaps", "preparationPlan"]
    };
}

async function generateInterviewReport({ resume, selfDescription, jobDescription }) {
    
    const prompt = `Generate an interview report for a candidate based on the following details:
                   resume : ${resume}
                   selfDescription : ${selfDescription}
                   jobDescription : ${jobDescription}
    `;

    const response = await ai.models.generateContent({
        model: "gemini-2.5-flash", 
        contents: prompt,
        config: {
            responseMimeType: "application/json",
            responseSchema: getGeminiSchema() // Forces Gemini to use our structural rules
        }
    });

    return JSON.parse(response.text);
}

module.exports = {
    generateInterviewReport
};