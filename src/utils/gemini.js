import { GoogleGenerativeAI } from "@google/generative-ai";
import { GEMINI_API } from "./constants";

const geminiAI = new GoogleGenerativeAI(GEMINI_API);


export default geminiAI;
