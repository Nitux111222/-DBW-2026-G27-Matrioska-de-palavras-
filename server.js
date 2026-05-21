import express from "express";
import mongoose from "mongoose";
import User from "./src/models/User.js";
import cors from "cors";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

// MongoDB
mongoose
  .connect("mongodb://2174424_db_user:VkO22g6qhcmhynnD@ac-4r4h2tc-shard-00-00.madioii.mongodb.net:27017,ac-4r4h2tc-shard-00-01.madioii.mongodb.net:27017,ac-4r4h2tc-shard-00-02.madioii.mongodb.net:27017/?ssl=true&replicaSet=atlas-d82z08-shard-0&authSource=admin&appName=DBWDataBase")
  .then(() => console.log("Connected to MongoDB successfully!"))
  .catch((err) => console.log("MongoDB connection error:", err));

// ROTA DE REGISTO
app.post("/api/register", async (req, res) => {
  try {
    const { username, email, password } = req.body;

    if (!username || !email || !password) {
      return res.status(400).json({ error: "Dados em falta" });
    }

    const hashed = await bcrypt.hash(password, 10);

    const user = new User({
      username,
      email,
      password: hashed,
    });

    await user.save();

    res.status(201).json({ message: "User criado com sucesso" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Login
app.post("/api/login", async (req, res) => {
  try {
    const { username, password } = req.body;

    const user = await User.findOne({ username });

    if (!user) {
      return res.status(400).json({ error: "User não encontrado" });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({ error: "Password incorreta" });
    }

    if (!user.password) {
      return res.status(400).json({ error: "Conta inválida" });
    }

    res.json({
      message: "Login com sucesso",
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
        pontosTotais: user.pontosTotais,
        recorde: user.recorde,
        jogosGanhos: user.jogosGanhos,
        respostasCorretas: user.respostasCorretas,
        respostasErradas: user.respostasErradas,
        tempoJogo: user.tempoJogo,
      },
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Palavras
app.get("/api/words", (req, res) => {
  res.json({
    success: true,
    data: ["Matrioska", "Palavras", "Jogo"],
  });
});


app.get("/api/me", async (req, res) => {
  try {
    const token = req.headers.authorization;

    const decoded = jwt.verify(token, "segredo_super_secreto");

    const user = await User.findById(decoded.id).select("-password");

    res.json(user);
  } catch (err) {
    res.status(401).json({ error: "Não autorizado" });
  }
});

app.get("/api/user/:id", async (req, res) => {
  const user = await User.findById(req.params.id).select("-password");
  res.json(user);
});

app.put("/api/user/:id", async (req, res) => {
  try {
    const { currentPassword, newPassword, ...rest } = req.body;

    const user = await User.findById(req.params.id);

    if (currentPassword && newPassword) {
      const isMatch = await bcrypt.compare(currentPassword, user.password);

      if (!isMatch) {
        return res.status(400).json({ error: "Password atual errada" });
      }

      const hashed = await bcrypt.hash(newPassword, 10);
      rest.password = hashed;
    }

    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      rest,
      { new: true }
    );

    res.json(updatedUser);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});



















// Ouvir
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});