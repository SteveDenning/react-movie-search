import OpenAI from "openai";

const useOpenAI = (content: string, responseFormat = "json_object") => {
  const openai = new OpenAI({
    apiKey: process.env.REACT_APP_AI_API_KEY,
    dangerouslyAllowBrowser: true,
  });

  const completion = openai.chat.completions.create({
    model: "chatgpt-4o-latest",
    messages: [
      {
        role: "system",
        content: "You are a helpful assistant. Your response should be in JSON format.",
      },
      { role: "user", content: content },
    ],
    // @ts-ignore
    response_format: { type: responseFormat },
  });

  return completion;
};

export default useOpenAI;
