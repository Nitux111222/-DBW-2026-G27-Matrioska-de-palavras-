import express from "express";
import mongoose from "mongoose";
import User from "./src/models/User.js";
import cors from "cors";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import http from "http";
import { Server } from "socket.io";

const app = express();
const PORT = 3000;

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});

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


// =======================
// SOCKET.IO - LOBBIES
// =======================

const lobbies = {};

function gerarCodigoLobby() {
  let codigo;

  do {
    codigo = Math.random().toString(36).substring(2, 8).toUpperCase();
  } while (lobbies[codigo]);

  return codigo;
}

io.on("connection", (socket) => {
  console.log("Jogador conectado:", socket.id);

  socket.on("criarLobby", ({ username }) => {
    const codigo = gerarCodigoLobby();

    lobbies[codigo] = {
      codigo,
      hostId: socket.id,
      players: [
        {
          id: socket.id,
          name: username || "Jogador",
          isHost: true,
          isReady: true,
          score: 0,
        },
      ],
    };

    socket.join(codigo);

    socket.emit("lobbyCriada", {
      codigo,
      lobby: lobbies[codigo],
    });

    console.log(`Lobby criada: ${codigo}`);
  });

  socket.on("entrarLobby", ({ codigo, username }) => {
    if (!codigo) {
      socket.emit("erroLobby", "Código da lobby inválido");
      return;
    }

    const codigoFormatado = codigo.toUpperCase();
    const lobby = lobbies[codigoFormatado];

    if (!lobby) {
      socket.emit("erroLobby", "Lobby não encontrada");
      return;
    }

    if (lobby.players.length >= 6) {
      socket.emit("erroLobby", "Lobby cheia");
      return;
    }

    const jogadorJaExiste = lobby.players.some(
      (player) => player.id === socket.id
    );

    if (!jogadorJaExiste) {
      lobby.players.push({
        id: socket.id,
        name: username || "Jogador",
        isHost: false,
        isReady: false,
        score: 0,
      });
    }

    socket.join(codigoFormatado);

    io.to(codigoFormatado).emit("lobbyAtualizada", lobby);

    console.log(`${username || "Jogador"} entrou na lobby ${codigoFormatado}`);
  });

  socket.on("toggleReady", ({ codigo }) => {
    const lobby = lobbies[codigo];

    if (!lobby) return;

    const player = lobby.players.find((p) => p.id === socket.id);

    if (!player) return;

    if (!player.isHost) {
      player.isReady = !player.isReady;
    }

    io.to(codigo).emit("lobbyAtualizada", lobby);
  });

  socket.on("comecarJogo", ({ codigo }) => {
    const lobby = lobbies[codigo];

    if (!lobby) return;

    if (lobby.hostId !== socket.id) {
      socket.emit("erroLobby", "Só o host pode começar o jogo");
      return;
    }

    const todosProntos = lobby.players.every((player) => player.isReady);

    if (!todosProntos) {
      socket.emit("erroLobby", "Nem todos os jogadores estão prontos");
      return;
    }

    lobby.players = lobby.players.map((player) => ({
  ...player,
  score: 0,
}));

const rankingInicial = [...lobby.players].sort((a, b) => b.score - a.score);

io.to(codigo).emit("jogoIniciado", {
  codigo,
});

io.to(codigo).emit("rankingAtualizado", rankingInicial);

console.log(`Jogo iniciado na lobby ${codigo}`);
  });~

  socket.on("pedirRanking", ({ codigo }) => {
  const lobby = lobbies[codigo];

  if (!lobby) return;

  const ranking = [...lobby.players].sort((a, b) => b.score - a.score);

  socket.emit("rankingAtualizado", ranking);
});

  socket.on("atualizarPontuacao", ({ codigo, score }) => {
  const lobby = lobbies[codigo];

  if (!lobby) return;

  const player = lobby.players.find((p) => p.id === socket.id);

  if (!player) return;

  player.score = score;

  const ranking = [...lobby.players].sort((a, b) => b.score - a.score);

  io.to(codigo).emit("rankingAtualizado", ranking);
});

  socket.on("disconnect", () => {
    console.log("Jogador desconectado:", socket.id);

    for (const codigo in lobbies) {
      const lobby = lobbies[codigo];

      const estavaNaLobby = lobby.players.some(
        (player) => player.id === socket.id
      );

      if (!estavaNaLobby) continue;

      lobby.players = lobby.players.filter(
        (player) => player.id !== socket.id
      );

      if (lobby.players.length === 0) {
        delete lobbies[codigo];
        console.log(`Lobby ${codigo} removida`);
        continue;
      }

      if (lobby.hostId === socket.id) {
        lobby.hostId = lobby.players[0].id;
        lobby.players[0].isHost = true;
        lobby.players[0].isReady = true;
      }

      io.to(codigo).emit("lobbyAtualizada", lobby);
    }
  });
});

// Ouvir servidor com Express + Socket.IO
server.listen(PORT, "0.0.0.0", () => {
  console.log(`Server running on http://localhost:${PORT}`);
});