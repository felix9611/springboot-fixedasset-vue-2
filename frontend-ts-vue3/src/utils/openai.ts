import { Configuration, OpenAIApi } from "openai";
const configuration = new Configuration({
    organization: "org-A5sAqY2P3pcoL9qLtqduQYv8",
    apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

export default openai

