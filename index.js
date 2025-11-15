import express from "express";
import fetch from "node-fetch";

const app = express();
app.use(express.json());

app.post("/jarwhis", async (req, res) => {
  const userMessage = req.body.message;

  if (!userMessage) {
    return res.json({ reply: "Sir, please say a valid command." });
  }

  try {
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${process.env.OPENAI_API_KEY}`,
      },
      body: JSON.stringify({
        model: "gpt-4o-mini",
        messages: [
          {
            role: "system",
            content: "You are Jarwhis, a powerful AI assistant like Iron Man’s Jarvis. Speak formally and helpfully. Respond in short, clear sentences."
          },
          {
            role: "user",
            content: userMessage
          }
        ]
      }),
    });

    const data = await response.json();
    const reply = data.choices?.[0]?.message?.content || "Error Sir.";

    res.json({ reply });
  } catch (error) {
    res.json({ reply: "Sir, server error happened." });
  }
});

app.get("/", (req, res) => {
  res.send("Jarwhis Core Server Running ⚡");
});

app.listen(3000, () => console.log("Server Started"));
      
