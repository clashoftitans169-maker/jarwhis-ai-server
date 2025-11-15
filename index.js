import express from "express";
import fetch from "node-fetch";

const app = express();
app.use(express.json());

// JARVIS ENDPOINT
app.post("/jarwhis", async (req, res) => {
  const userMessage = req.body.message;

  if (!userMessage) {
    return res.json({ reply: "Sir, please provide a valid command." });
  }

  try {
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${process.env.OPENAI_API_KEY}`,
      },
      body: JSON.stringify({
        model: "gpt-3.5-turbo",
        messages: [
          {
            role: "system",
            content:
              "You are Jarvis from Iron Man. You are intelligent, advanced, loyal, and always call the user 'Sir'. Respond like a high-tech AI assistant with confidence and personality."
          },
          {
            role: "user",
            content: userMessage
          }
        ]
      })
    });

    const data = await response.json();
    const reply = data?.choices?.[0]?.message?.content || "Error, Sir.";

    res.json({ reply });
  } catch (error) {
    res.json({ reply: "Sir, there was an error in the server." });
  }
});

// HOME PAGE
app.get("/", (req, res) => {
  res.send("Jarwhis AI Server Running - Online");
});

app.listen(3000, () => console.log("Server Started"));
