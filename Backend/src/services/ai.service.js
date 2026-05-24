const {GoogleGenAI} = require("@google/genai")
const {z} = require("zod")
const {zodToJsonSchema} = require("zod-to-json-schema")

const ai= new GoogleGenAI({
    apiKey : process.env.GOOGLE_GENAI_API_KEY
})


const interviewReportSchema = z.object({
    matchscore : z.number().description("A score between 0 and 100 indicating how well the candidate's profile matches the job description, based on factors like skills, experience, education etc."),

    technicalQuestions : z.array(z.object({
        question : z.string().description("The technical question can be asked in the interview"),
        intention : z.string().description("Intention of interviewer behind asking this question"),
        answer : z.string().description("How to answer the question, what points to cover, what approach to take etc.")
    })).description("List of technical questions that can be asked in the interview, along with the intention of interviewer behind asking those questions and how to answer those questions"),
    
    behavioralQuestions : z.array(z.object({
        question : z.string().description("The behavioral question can be asked in the interview"),
        intention : z.string().description("Intention of interviewer behind asking this question"), 
        answer : z.string().description("How to answer the question, what points to cover, what approach to take etc.")
    })).description("List of behavioral questions that can be asked in the interview, along with the intention of interviewer behind asking those questions and how to answer those questions"),
    
    skillGaps : z.array(z.object({
        skill : z.string().description("The skill that the candidate is lacking"),
        severity : z.enum(["low","medium","high"]).description("Severity of the skill gap, i.e., how important is it for the candidate to work on this skill gap")
    })).description("List of skill gaps that the candidate needs to work on, along with the severity of those skill gaps"),

    preparationPlan : z.array(z.object({
        day : z.number().description("Day number of the preparation plan, starting from 1"),
        focus : z.string().description("The main focus of this day in the preparation plan, e.g., data structures, system design, behavioral questions etc."),
        tasks : z.array(z.string()).description("List of tasks to be done on that day to prepare for the interview, e.g., read a specific chapter from a book, solve a set of problems on LeetCode, mock interview with a friend etc.")
    })).description("A day-wise preparation plan for the candidate to prepare for the interview, based on the technical questions, behavioral questions and skill gaps identified above")
})

async function generateInterviewReport({resume, selfDescription, jobDescription}){
    const response = await ai.models.generateContent({
        model : "gemini-2.5-flash",
        contents:"",
        config:{
            responseMimeType : "application/json",
            responseSchema : zodToJsonSchema(interviewReportSchema)
        }
    })
}

module.exports = {
    invokeGeminiAi
}
