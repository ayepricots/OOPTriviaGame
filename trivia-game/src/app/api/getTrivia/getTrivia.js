import { exec } from "child_process";
import path from "path";

export default function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { category } = req.body;

  const pythonScript = path.join(process.cwd(), "scripts", "generate_trivia.py");

  exec(`python3 ${pythonScript} ${category}`, (error, stdout, stderr) => {
    if (error) {
      console.error("Python error:", stderr);
      return res.status(500).json({ error: "Failed to generate trivia" });
    }

    try {
      const questions = JSON.parse(stdout);
      res.status(200).json(questions);
    } catch (parseError) {
      console.error("JSON Parse error:", parseError);
      res.status(500).json({ error: "Invalid response from Python script" });
    }
  });
}
