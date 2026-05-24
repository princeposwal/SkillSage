const moongoose = require('mongoose');


/**
 * - job description schema : String
 * - resume text : String
 * - Self description : String
 * 
 * - matchScore : Number 
 * 
 * - Technical questions:[
 *          {
 *             question : "",
 *             intention: "",
 *             answer : "",
 *          }
 * ]
 * 
 * - Behavioral questions:[
 *          {
 *             question : "",
 *             intention: "",
 *             answer : "",
 *          }
 * ]
 * 
 * 
 * - Skill gaps : [{
 *            skill : "",
 *            severity : {
 *               type : String,
 *              enum : ["low","medium","high"]     //There are some skill gaps that are not critical but can be improved, and there are some skill gaps that are critical and need to be addressed immediately.
 *      }
 * }]
 * - Preperation plan :[{
 *           day : Number,
 *           focus : String,     
 *           tasks : [String]                       
 * }]
 */


// Creating sub schema for technical questions as we want our original schema to be clean and readable
const technicalQuestionSchema = new moongoose.Schema({
            question : {
                type : String,
                required : [true, "Technical question is required"]
            },
            intention : {
                type : String,
                required : [true, "Intention of technical question is required"]
            },
            answer : {
                type : String,
                required : [true, "Answer of technical question is required"]
            }
},
{
    _id : false
})


const behavioralQuestionSchema = new moongoose.Schema({
            question : {
                type : String,
                required : [true, "Technical question is required"]
            },
            intention : {
                type : String,
                required : [true, "Intention of technical question is required"]
            },
            answer : {
                type : String,
                required : [true, "Answer of technical question is required"]
            }
},
{
    _id : false
})

const skillGapSchema = new moongoose.Schema({
            skill : {
                type : String,
                required : [true, "Skill is required"]
            },
            severity : {
                type : String,
                enum : ["low","medium","high"],
                required : [true, "Severity is required"]
            }
},{
    _id : false
})

const preparationPlanSchema = new moongoose.Schema({
            day : {
                type : Number,
                required : [true, "Day is required"]
            },
            focus : {
                type : String,
                required : [true, "Focus is required"]
            },
            tasks : [{
                type : String,
                required : [true, "Task is required"]
            }]
})

//main schema for interview report
const interviewReportSchema = new moongoose.Schema({
    jobDescription : {
        type : String,
        required : [true, "Job description is required"]
    },
    resume : {
        type : String,
        // here required is optional because user can generate report based on self description , hence resume is optional
    },
    selfDescription : {
        type : String
    },
    matchScore : {
        type : Number ,
        min : 0,
        max : 100
    },    
    technicalQuestions : [technicalQuestionSchema],
    behavioralQuestions : [behavioralQuestionSchema],
    skillGaps : [skillGapSchema],
    preparationPlan : [preparationPlanSchema]
},{
    timestamps : true
})

const InterviewReportModel = moongoose.model("InterviewReport",interviewReportSchema);

module.exports = InterviewReportModel;