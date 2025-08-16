import express from "express";
import cors from "cors";

const app = express();
app.use(express.json());
app.use(cors());

const port = process.env.PORT || 3001;
const votes = { cats: 0, dogs: 0 };

app.get("/health", (_req, res) => res.json({ ok: true }));
app.get("/results", (_req, res) => res.json(votes));
app.post("/vote", (req, res) => {
  const { choice } = req.body || {};
  if (!["cats", "dogs"].includes(choice)) return res.status(400).json({ error: "invalid choice" });
  votes[choice] += 1;
  res.json({ ok: true, votes });
});

app.listen(port, () => console.log(`API on :${port}`));
