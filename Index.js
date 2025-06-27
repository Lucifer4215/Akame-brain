import express from "express";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import OpenAI from "openai";

dotenv.config();

const app = express();
app.use(bodyParser.json());

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

app.post("/akame", async (req, res) => {
  const userInput = req.body.message || "";

  try {
    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "system",
          content: "You are Akame, an emotionally aware AI who responds based on the user's mood.",
        },
        {
          role: "user",
          content: userInput,
        },
      ],
    });

    res.json({ reply: response.choices[0].message.content });
  } catch (err) {
    console.error("Akame error:", err.response?.data || err.message);
    res.status(500).json({ error: "Akame crashed" });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`✅ Akame is alive on port ${PORT}`);
});
