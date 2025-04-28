import axios from "axios";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method Not Allowed" });
  }

  const { prompt } = req.body;

  if (!prompt) {
    return res.status(400).json({ message: "Missing prompt" });
  }

  try {
    const openaiRes = await axios.post(
      "https://api.openai.com/v1/chat/completions",
      {
        model: "gpt-3.5-turbo",
        messages: [
          {
            role: "system",
            content: "You are a helpful assistant.",
          },
          {
            role: "user",
            content: prompt,
          },
        ],
        max_tokens: 50,
        temperature: 0.7,
      },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
        },
      }
    );

    const suggestion = openaiRes.data.choices[0].message.content.trim();
    const cleanedSuggestion = suggestion.replace(/^"(.*)"$/, "$1");
    return res.status(200).json({ suggestion: cleanedSuggestion });
  } catch (error) {
    console.error(
      "🔥 Suggestion API error:",
      error.response?.data || error.message
    );
    return res.status(500).json({ message: "Suggestion failed" });
  }
}
