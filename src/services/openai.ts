import OpenAI from "openai";

const useOpenAI = (content: string) => {
  const openai = new OpenAI({
    apiKey: process.env.REACT_APP_AI_API_KEY,
    dangerouslyAllowBrowser: true,
  });

  const completion = openai.chat.completions.create({
    model: "gpt-4-1106-preview",
    messages: [
      {
        role: "system",
        content: "You are a helpful assistant. Your response should be in JSON format.",
      },
      { role: "user", content: content },
    ],
    response_format: { type: "json_object" },
  });

  return completion;
};

export default useOpenAI;
