export const discoverMediaPrompt = (label: string, genres: string) => {
  return {
    systemContent: "You are a helpful assistant. Your response should be in JSON format.",
    userContent: `Create a JSON list of 10 ${label}, each item must have at least one of the following genres: ${genres}. If there are more than three popular genres, ensure the results include at least two of the top three most frequent genres. Prioritize the top three genres based on their frequency and order the ${label} by genre popularity. Return a JSON object with a popular key listing the top genres and a media array containing objects with a name, id, and a description key for each ${label} title. Ensure the ${label} are relatively popular and diverse.`,
  };
};

export const failedSearchMessagePrompt = {
  systemContent: "You are a helpful assistant.",
  userContent:
    "Write this in a short, funny way focusing on AI getting it wrong - There was a problem getting the results from TMDB - please try again later",
};
