// import { GEMENI_API_KEY } from "../constants/index";


// import {
//     GoogleGenerativeAI,
//     HarmCategory,
//     HarmBlockThreshold,
//   } from "@google/generative-ai";
  
//   const apiKey = GEMENI_API_KEY;
//   const genAI = new GoogleGenerativeAI(apiKey);
  
//   const model = genAI.getGenerativeModel({
//     model: "gemini-2.0-flash-exp",
//   });
  
//   const generationConfig = {
//     temperature: 1,
//     topP: 0.95,
//     topK: 40,
//     maxOutputTokens: 8192,
//     responseMimeType: "text/plain",
//   };
   
// export const chatSession = model.startChat({
//       generationConfig,
//       history: [

//       ],
//     });
  
//     // const result = await chatSession.sendMessage("INSERT_INPUT_HERE");
//     // console.log(result.response.text());
  


    

import { OpenAI } from "openai";
import { OPENAI_API_KEY } from "../constants/index";

const openai = new OpenAI({
  apiKey: OPENAI_API_KEY, 
  dangerouslyAllowBrowser: true
});

const model = "chatgpt-4o-latest"; // ya "gpt-3.5-turbo" agar faster aur cheaper chahiye

const generationConfig = {
  model,
  temperature: 1,
  top_p: 0.95,
  max_tokens: 8192,
};

export async function chatSession(userMessage) {
  const messages = [
    { role: "system", content: "You are a helpful assistant.for Q/A for the pdf, to help student to get learn faster and faster, please don't provide concise provide long answers, of the, use bold and italic using html, and please never provide your starter and end pragraph where you just tell any adjustments,  or here here's the answer, just like human directly provide html answer, with bold, italic thing in html format, so it'll look like a real human intelligent." },
    { role: "user", content: userMessage },
  ];

  const response = await openai.chat.completions.create({
    ...generationConfig,
    
    messages:messages || [],
  });

  return response.choices[0].message.content;
}

// Example usage
async function run() {
  const reply = await chatSession("Are we using gpt 4!");
  console.log(reply );
}

run();
