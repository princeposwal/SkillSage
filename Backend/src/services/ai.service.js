const { GoogleGenAI } = require("@google/genai");
const puppeteer = require("puppeteer");

const ai = new GoogleGenAI({
  apiKey: process.env.GOOGLE_GENAI_API_KEY,
});

// Helper function that returns the clean OpenAPI 3.0 schema Gemini natively expects
function getGeminiSchema() {
  return {
    type: "OBJECT",
    properties: {
      matchScore: {
        type: "NUMBER",
        description:
          "A score between 0 and 100 indicating how well the candidate's profile matches the job description, based on factors like skills, experience, education etc.",
      },
      technicalQuestions: {
        type: "ARRAY",
        description:
          "List of technical questions that can be asked in the interview, along with the intention of interviewer behind asking those questions and how to answer those questions",
        items: {
          type: "OBJECT",
          properties: {
            question: {
              type: "STRING",
              description:
                "The technical question can be asked in the interview",
            },
            intention: {
              type: "STRING",
              description:
                "Intention of interviewer behind asking this question",
            },
            answer: {
              type: "STRING",
              description:
                "How to answer the question, what points to cover, what approach to take etc.",
            },
          },
          required: ["question", "intention", "answer"],
        },
      },
      behavioralQuestions: {
        type: "ARRAY",
        description:
          "List of behavioral questions that can be asked in the interview, along with the intention of interviewer behind asking those questions and how to answer those questions",
        items: {
          type: "OBJECT",
          properties: {
            question: {
              type: "STRING",
              description:
                "The behavioral question can be asked in the interview",
            },
            intention: {
              type: "STRING",
              description:
                "Intention of interviewer behind asking this question",
            },
            answer: {
              type: "STRING",
              description:
                "How to answer the question, what points to cover, what approach to take etc.",
            },
          },
          required: ["question", "intention", "answer"],
        },
      },
      skillGaps: {
        type: "ARRAY",
        description:
          "List of skill gaps that the candidate needs to work on, along with the severity of those skill gaps",
        items: {
          type: "OBJECT",
          properties: {
            skill: {
              type: "STRING",
              description: "The skill that the candidate is lacking",
            },
            severity: {
              type: "STRING",
              enum: ["low", "medium", "high"],
              description:
                "Severity of the skill gap, i.e., how important is it for the candidate to work on this skill gap",
            },
          },
          required: ["skill", "severity"],
        },
      },
      preparationPlan: {
        type: "ARRAY",
        description:
          "A day-wise preparation plan for the candidate to prepare for the interview, based on the technical questions, behavioral questions and skill gaps identified above",
        items: {
          type: "OBJECT",
          properties: {
            day: {
              type: "NUMBER",
              description:
                "Day number of the preparation plan, starting from 1",
            },
            focus: {
              type: "STRING",
              description:
                "The main focus of this day in the preparation plan, e.g., data structures, system design, behavioral questions etc.",
            },
            tasks: {
              type: "ARRAY",
              items: { type: "STRING" },
              description:
                "List of tasks to be done on that day to prepare for the interview",
            },
          },
          required: ["day", "focus", "tasks"],
        },
      },
      title: {
        type: "STRING",
        description:
          "The title of the job for which the interview report is generated",
      },
    },
    required: [
      "matchScore",
      "technicalQuestions",
      "behavioralQuestions",
      "skillGaps",
      "preparationPlan",
      "title",
    ],
  };
}

async function generateInterviewReport({
  resume,
  selfDescription,
  jobDescription,
}) {
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
      responseSchema: getGeminiSchema(), // Forces Gemini to use our structural rules
    },
  });

  return JSON.parse(response.text);
}

async function generatePdfFromHtml(htmlContent) {
  // Explicitly launching in headless mode to guarantee stability across environments
const browser = await puppeteer.launch({
  executablePath: puppeteer.executablePath(),
  headless: true,
  args: [
    "--no-sandbox",
    "--disable-setuid-sandbox",
    "--disable-dev-shm-usage",
  ],
});
  console.log("Chrome path:", puppeteer.executablePath());
  const page = await browser.newPage();
  await page.setContent(htmlContent, { waitUntil: "networkidle0" });

  const pdfBuffer = await page.pdf({
    format: "A4",
    margin: {
      top: "20mm",
      bottom: "20mm",
      left: "15mm",
      right: "15mm",
    },
  });

  await browser.close();

  return pdfBuffer;
}

async function generateResumePdf({ resume, selfDescription, jobDescription }) {
  const prompt = `Generate resume for a candidate with the following details:
                        Resume: ${resume}
                        Self Description: ${selfDescription}
                        Job Description: ${jobDescription}

                        the response should be a JSON object with a single field "html" which contains the HTML content of the resume which can be converted to PDF using any library like puppeteer.
                        The resume should be tailored for the given job description and should highlight the candidate's strengths and relevant experience. The HTML content should be well-formatted and structured, making it easy to read and visually appealing.
                        The content of resume should be not sound like it's generated by AI and should be as close as possible to a real human-written resume.
                        You can highlight the content using some colors or different font styles but the overall design should be simple and professional.
                        The content should be ATS friendly, i.e. it should be easily parsable by ATS systems without losing important information.
                        The resume should not be so lengthy, it should ideally be 1-2 pages long when converted to PDF. Focus on quality rather than quantity and make sure to include all the relevant information that can increase the candidate's chances of getting an interview call for the given job description.
                    `;

  const response = await ai.models.generateContent({
    model: "gemini-2.5-flash",
    contents: prompt,
    config: {
      responseMimeType: "application/json",
      // Directly passing the native OpenAPI schema object
      responseSchema: {
        type: "OBJECT",
        properties: {
          html: {
            type: "STRING",
            description:
              "The complete, styled HTML layout of the candidate's resume designed to be compiled into a clean A4 PDF structural document.",
          },
        },
        required: ["html"],
      },
    },
  });

  const jsonContent = JSON.parse(response.text);

  const pdfBuffer = await generatePdfFromHtml(jsonContent.html);

  return pdfBuffer;
}

module.exports = { generateInterviewReport, generateResumePdf };
