import OpenAI from "openai";

const useOpenAI = (prompt, responseFormat = "text") => {
  const openai = new OpenAI({
    apiKey: process.env.REACT_APP_AI_API_KEY,
    dangerouslyAllowBrowser: true,
  });

  const completion = openai.chat.completions.create({
    model: "chatgpt-4o-latest",
    messages: [
      {
        role: "system",
        content: prompt.systemContent,
      },
      { role: "user", content: prompt.userContent },
    ],
    // @ts-ignore
    response_format: { type: responseFormat },
  });

  return completion;
};

export default useOpenAI;
