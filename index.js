import express from "express";
import fetch from "node-fetch";

const app = express();
app.use(express.json());

app.post("/jarwhis", async (req, res) => {
  const userMessage = req.body.message;

  if (!userMessage) {
    return res.json({ reply: "Please send a message." });
  }

  try {
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${process.env.OPENAI_API_KEY}`
      },
      body: JSON.stringify({
        model: "gpt-3.5-turbo",
        messages: [{ role: "user", content: userMessage }]
      })
    });

    const data = await response.json();
    const reply = data.choices?.[0]?.message?.content || "Error!";

    res.json({ reply });
  } catch (error) {
    res.json({ reply: "Server error!" });
  }
});

app.get("/", (req, res) => {
  res.send("Jarwhis AI Server Running!");
});

app.listen(3000, () => console.log("Server Started"));
