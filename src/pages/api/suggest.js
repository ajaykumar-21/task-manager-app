import axios from "axios";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method Not Allowed" });
  }

  try {
    const openaiRes = await axios.post(
      "https://api.openai.com/v1/chat/completions",
      {
        model: "gpt-3.5-turbo",
        messages: [
          {
            role: "system",
            content: "You are a helpful assistant that suggests tasks.",
          },
          {
            role: "user",
            content:
              "Suggest a simple and actionable task someone might add to their task manager.",
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
    return res.status(200).json({ suggestion });
  } catch (error) {
    console.error(
      "🔥 Suggestion API error:",
      error.response?.data || error.message
    );
    return res.status(500).json({ message: "Suggestion failed" });
  }
}
