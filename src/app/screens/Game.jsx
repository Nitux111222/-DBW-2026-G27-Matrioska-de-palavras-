import React, { useState, useEffect, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { GameLayout } from "../layouts/layouts";
import { Button } from "../components/ui/Button";
import { Input } from "../components/ui/Input";
import { Badge } from "../components/ui/Badge";
import { Avatar } from "../components/ui/avatarRadix";
import { Trophy, Clock, Target, AlertCircle, ArrowRight, Zap, CheckCircle2, XCircle } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { toast } from "sonner";
import { socket } from "../../socket";

const WORD_SETS = [
  {
    masterWord: "SOLIDARIEDADE",
    validWords: [
      "SOL",
      "LIDA",
      "IDA",
      "IDADE",
      "DAR",
      "REDE",
      "DIA",
      "LIDO",
      "DOR",
      "RIR",
    ],
  },
  {
    masterWord: "UNIVERSIDADE",
    validWords: [
      "UNI",
      "VERSO",
      "IDADE",
      "DIA",
      "VIDA",
      "VER",
      "SER",
      "REDE",
      "NAVE",
      "DADO",
    ],
  },
  {
    masterWord: "COMPUTADOR",
    validWords: [
      "COM",
      "DOR",
      "COR",
      "MUDO",
      "TUDO",
      "DADO",
      "RATO",
      "MAR",
      "ROMA",
      "MOTO",
    ],
  },
  {
    masterWord: "PROGRAMACAO",
    validWords: [
      "PRO",
      "ROMA",
      "GRAMA",
      "AMOR",
      "MAR",
      "COR",
      "MAPA",
      "RAMA",
      "PAGO",
      "GOMA",
    ],
  },
  {
    masterWord: "INFORMATICA",
    validWords: [
      "INFO",
      "FORMA",
      "FITA",
      "MATO",
      "RATO",
      "TICA",
      "MAR",
      "COR",
      "AR",
      "ATO",
    ],
  },
  {
    masterWord: "DESENVOLVIMENTO",
    validWords: [
      "DESENHO",
      "VENTO",
      "MENTE",
      "LENTO",
      "MONTE",
      "DENTE",
      "VENDE",
      "LEITE",
      "SOL",
      "VIDO",
    ],
  },
  {
    masterWord: "TECNOLOGIA",
    validWords: [
      "TECNO",
      "LOGIA",
      "GATO",
      "GOTA",
      "LAGO",
      "NOTA",
      "CENA",
      "TELA",
      "TACO",
      "GALO",
    ],
  },
  {
    masterWord: "APRENDIZAGEM",
    validWords: [
      "APRENDI",
      "DIZER",
      "PARE",
      "MARE",
      "GEMA",
      "ZEMA",
      "REDE",
      "DIA",
      "AR",
      "MAR",
    ],
  },
  {
    masterWord: "CRIATIVIDADE",
    validWords: [
      "CRIAR",
      "VIDA",
      "IDADE",
      "DIA",
      "ARTE",
      "TARDE",
      "RITA",
      "VIR",
      "DAR",
      "VER",
    ],
  },
  {
    masterWord: "RESPONSABILIDADE",
    validWords: [
      "RESPONDE",
      "SONDA",
      "SABER",
      "BOLA",
      "PESO",
      "REDE",
      "IDADE",
      "DIA",
      "SOL",
      "RISO",
    ],
  },
  {
    masterWord: "COMUNICACAO",
    validWords: [
      "COM",
      "COMUM",
      "NICA",
      "CANO",
      "MICA",
      "MAO",
      "ANO",
      "UMA",
      "CAMINHO",
      "MUNDO",
    ],
  },
  {
    masterWord: "ORGANIZACAO",
    validWords: [
      "ORGAO",
      "RAZAO",
      "GRANA",
      "ZONA",
      "NORA",
      "RING",
      "GIRA",
      "AR",
      "RIO",
      "ANO",
    ],
  },
  {
    masterWord: "ESTRUTURA",
    validWords: [
      "ESTAR",
      "TERRA",
      "RUA",
      "RATO",
      "ARTE",
      "TUA",
      "USAR",
      "RIR",
      "SER",
      "TER",
    ],
  },
  {
    masterWord: "ALGORITMO",
    validWords: [
      "ALGO",
      "RITMO",
      "GATO",
      "RATO",
      "MATO",
      "LAGO",
      "GALO",
      "ROMA",
      "MAR",
      "RIO",
    ],
  },
  {
    masterWord: "BIBLIOTECA",
    validWords: [
      "BIBLIO",
      "BOLA",
      "BICO",
      "BOCA",
      "BELA",
      "TELA",
      "TACO",
      "CABE",
      "BAILE",
      "LEI",
    ],
  },
  {
    masterWord: "PENSAMENTO",
    validWords: [
      "PENSA",
      "MENTE",
      "MONTE",
      "PESO",
      "SOMA",
      "NOME",
      "MESA",
      "TEMA",
      "TEMPO",
      "SONO",
    ],
  },
  {
    masterWord: "CONHECIMENTO",
    validWords: [
      "CONHECE",
      "MENTE",
      "MONTE",
      "CONTO",
      "NOME",
      "CENHO",
      "TENHO",
      "CINTO",
      "MOTE",
      "TINO",
    ],
  },
  {
    masterWord: "MATEMATICA",
    validWords: [
      "MATE",
      "META",
      "TEMA",
      "MATA",
      "TICA",
      "MICA",
      "CAMA",
      "CIMA",
      "AMEM",
      "ATE",
    ],
  },
  {
    masterWord: "ARQUITETURA",
    validWords: [
      "ARTE",
      "RUA",
      "TERRA",
      "QUER",
      "TARDE",
      "RATO",
      "AR",
      "TER",
      "RIR",
      "TUA",
    ],
  },
  {
    masterWord: "DESAFIADOR",
    validWords: [
      "DESAFIO",
      "DIA",
      "DAR",
      "DOR",
      "FARO",
      "RISO",
      "SODA",
      "FORA",
      "SAIR",
      "AR",
    ],
  },
  {
    masterWord: "AVENTURA",
    validWords: [
      "VENTO",
      "NAVE",
      "TERRA",
      "RUA",
      "ARTE",
      "VARA",
      "VENA",
      "TUA",
      "TER",
      "VER",
    ],
  },
  {
    masterWord: "LABORATORIO",
    validWords: [
      "LABOR",
      "RATO",
      "BOLA",
      "ROTA",
      "LATA",
      "BOTA",
      "RITA",
      "RIO",
      "AR",
      "BAR",
    ],
  },
  {
    masterWord: "EXPERIENCIA",
    validWords: [
      "PERNA",
      "PENA",
      "CENA",
      "NAVE",
      "PARE",
      "RECE",
      "CAIR",
      "AR",
      "IR",
      "VER",
    ],
  },
];

export function Game() {
  const { id } = useParams();
  const navigate = useNavigate();
  const isMultiplayer = id !== "solo";
  const getWordIndexFromRoomCode = (code) => {
  let total = 0;

  for (let i = 0; i < code.length; i++) {
    total += code.charCodeAt(i);
  }

  return total % WORD_SETS.length;
};

const selectedWordSet = React.useMemo(() => {
  if (id === "solo") {
    const randomIndex = Math.floor(Math.random() * WORD_SETS.length);
    return WORD_SETS[randomIndex];
  }

  const index = getWordIndexFromRoomCode(id || "");
  return WORD_SETS[index];
}, [id]);

const MASTER_WORD = selectedWordSet.masterWord;
const VALID_WORDS = selectedWordSet.validWords;

  const [timeLeft, setTimeLeft] = useState(120);
  const [currentInput, setCurrentInput] = useState("");
 const [foundWords, setFoundWords] = useState([]);
const [score, setScore] = useState(0);
const [wrongAnswers, setWrongAnswers] = useState(0);
const [feedback, setFeedback] = useState({ type: null, message: "" });
const inputRef = useRef(null);

  const [ranking, setRanking] = useState([]);

 useEffect(() => {
  inputRef.current?.focus();

  const timer = setInterval(() => {
    setTimeLeft((prev) => {
      if (prev <= 1) {
        clearInterval(timer);

        sessionStorage.setItem(
          "lastGameResult",
          JSON.stringify({
            id,
            masterWord: MASTER_WORD,
            score,
            foundWords,
            wrongAnswers,
            possibleWords: VALID_WORDS,
            timeUsed: "2:00",
          })
        );

        const storedUser = JSON.parse(localStorage.getItem("user"));

        if (storedUser) {
          fetch(`http://localhost:3000/api/user/${storedUser.id}`, {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              pontosTotais: (storedUser.pontosTotais || 0) + score,
              recorde: Math.max(storedUser.recorde || 0, score),
              respostasCorretas:
                (storedUser.respostasCorretas || 0) + foundWords.length,
              respostasErradas:
                (storedUser.respostasErradas || 0) + wrongAnswers,
              tempoJogo: (storedUser.tempoJogo || 0) + 2,
            }),
          })
            .then((res) => res.json())
            .then((updatedUser) => {
              localStorage.setItem(
                "user",
                JSON.stringify({
                  ...storedUser,
                  ...updatedUser,
                })
              );
            })
            .catch((err) => {
              console.error("Erro ao atualizar estatísticas:", err);
            });
        }

        navigate(`/results/${id}`);
        return 0;
      }

      return prev - 1;
    });
  }, 1000);

  return () => clearInterval(timer);
}, [
  id,
  navigate,
  MASTER_WORD,
  VALID_WORDS,
  score,
  foundWords,
  wrongAnswers,
]);

  useEffect(() => {
  if (!isMultiplayer) return;

  socket.emit("pedirRanking", {
    codigo: id,
  });

  socket.on("rankingAtualizado", (rankingAtualizado) => {
    setRanking(rankingAtualizado);
  });

  return () => {
    socket.off("rankingAtualizado");
  };
}, [isMultiplayer, id]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const word = currentInput.trim().toUpperCase();
    if (!word) return;

    if (foundWords.some((w) => w.word === word)) {
      setFeedback({ type: "error", message: "Palavra já encontrada!" });
      setCurrentInput("");
      setTimeout(() => setFeedback({ type: null, message: "" }), 2000);
      return;
    }

    if (VALID_WORDS.includes(word)) {
  const points = word.length * 10;

  setFoundWords((prev) => [{ word, points }, ...prev]);

  setScore((prev) => {
    const novoScore = prev + points;

    if (isMultiplayer) {
      socket.emit("atualizarPontuacao", {
        codigo: id,
        score: novoScore,
      });
    }

    return novoScore;
  });

  setFeedback({ type: "success", message: `+${points} pontos!` });
} else {
  setWrongAnswers((prev) => prev + 1);
  setFeedback({ type: "error", message: "Palavra inválida!" });
}

    setCurrentInput("");
    setTimeout(() => setFeedback({ type: null, message: "" }), 2000);
  };

  const formatTime = (seconds) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m}:${s.toString().padStart(2, "0")}`;
  };

  const getHighlightedIndices = () => {
    if (!currentInput) return [];
    const inputUpper = currentInput.toUpperCase();
    let indices = [];
    let searchStart = 0;

    for (let char of inputUpper) {
      const index = MASTER_WORD.indexOf(char, searchStart);
      if (index !== -1) {
        indices.push(index);
        searchStart = index + 1;
      }
    }
    return indices;
  };

  const highlightedIndices = getHighlightedIndices();

  const user = JSON.parse(localStorage.getItem("user"));

  const rankingParaMostrar = isMultiplayer
    ? ranking
    : [
        {
          id: "solo",
          name: user?.username || "Tu",
          score,
        },
      ];

  return (
    <GameLayout>
      <div className="flex-1 flex flex-col md:flex-row bg-slate-50 relative overflow-hidden h-full">
        <div className="flex-1 flex flex-col items-center justify-center p-4 sm:p-8 relative z-10 overflow-y-auto">
          <div className="w-full max-w-2xl flex items-center justify-between mb-8 bg-white p-4 rounded-2xl shadow-sm border border-slate-200">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-blue-100 flex items-center justify-center text-blue-800">
                <Trophy className="h-5 w-5" />
              </div>
              <div>
                <span className="text-xs text-slate-500 font-bold uppercase">
                  Pontuação
                </span>
                <div className="text-xl font-black text-slate-900 leading-none">
                  {score}
                </div>
              </div>
            </div>

            <div
              className={`flex items-center gap-3 px-6 py-2 rounded-xl border-2 ${
                timeLeft <= 10
                  ? "border-rose-500 bg-rose-50 text-rose-600 animate-pulse"
                  : "border-slate-200 bg-slate-50 text-slate-700"
              }`}
            >
              <Clock className="h-5 w-5" />
              <span className="text-2xl font-black tabular-nums tracking-wider">
                {formatTime(timeLeft)}
              </span>
            </div>

            <div className="flex items-center gap-3 text-right">
              <div>
                <span className="text-xs text-slate-500 font-bold uppercase">
                  Palavras
                </span>
                <div className="text-xl font-black text-slate-900 leading-none">
                  {foundWords.length}
                </div>
              </div>
              <div className="w-10 h-10 rounded-xl bg-emerald-100 flex items-center justify-center text-emerald-800">
                <Target className="h-5 w-5" />
              </div>
            </div>
          </div>

          <div className="mb-12 text-center">
            <div className="text-sm font-bold uppercase tracking-[0.2em] text-slate-400 mb-6 flex items-center justify-center gap-2">
              <Zap className="h-4 w-4 text-amber-500" />
              Palavra-Mestra
              <Zap className="h-4 w-4 text-amber-500" />
            </div>

            <div className="flex flex-wrap justify-center gap-1 sm:gap-2 max-w-3xl">
              {MASTER_WORD.split("").map((letter, i) => (
                <motion.div
                  key={i}
                  className={`
                    w-10 h-14 sm:w-16 sm:h-20 sm:text-4xl text-2xl font-black flex items-center justify-center rounded-xl sm:rounded-2xl border-b-4 transition-all duration-200
                    ${
                      highlightedIndices.includes(i)
                        ? "bg-blue-800 text-white border-blue-950 scale-110 shadow-lg -translate-y-2"
                        : "bg-white text-slate-800 border-slate-300 shadow-sm"
                    }
                  `}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.05 }}
                >
                  {letter}
                </motion.div>
              ))}
            </div>
          </div>

          <div className="w-full max-w-lg mb-8 relative">
            <form onSubmit={handleSubmit} className="relative">
              <input
                ref={inputRef}
                type="text"
                value={currentInput}
                onChange={(e) => setCurrentInput(e.target.value)}
                placeholder="Escreve uma subpalavra..."
                className={`w-full text-center text-2xl sm:text-3xl font-bold py-6 px-16 rounded-3xl border-4 shadow-xl outline-none transition-all uppercase placeholder:normal-case placeholder:font-medium placeholder:text-xl
                  ${
                    feedback.type === "error"
                      ? "border-rose-500 bg-rose-50 text-rose-700"
                      : feedback.type === "success"
                      ? "border-emerald-500 bg-emerald-50 text-emerald-700"
                      : "border-blue-800 bg-white text-blue-900 focus:ring-4 focus:ring-blue-800/20"
                  }
                `}
                autoComplete="off"
                spellCheck={false}
              />

              <AnimatePresence>
                {feedback.type && (
                  <motion.div
                    initial={{ opacity: 0, y: -20, scale: 0.8 }}
                    animate={{ opacity: 1, y: -40, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    className={`absolute left-1/2 -translate-x-1/2 -top-6 whitespace-nowrap px-4 py-2 rounded-full font-bold shadow-lg text-sm flex items-center gap-2 z-20
                      ${
                        feedback.type === "success"
                          ? "bg-emerald-500 text-white"
                          : "bg-rose-500 text-white"
                      }
                    `}
                  >
                    {feedback.type === "success" ? (
                      <CheckCircle2 className="h-4 w-4" />
                    ) : (
                      <XCircle className="h-4 w-4" />
                    )}
                    {feedback.message}
                  </motion.div>
                )}
              </AnimatePresence>

              <button
                type="submit"
                className="absolute right-3 top-1/2 -translate-y-1/2 w-12 h-12 bg-blue-800 text-white rounded-2xl flex items-center justify-center hover:bg-blue-900 transition-colors shadow-md"
              >
                <ArrowRight className="h-6 w-6" />
              </button>
            </form>
            <p className="text-center text-slate-500 mt-4 text-sm font-medium">
              Carrega em Enter para submeter a palavra.
            </p>
          </div>
        </div>

        <div className="w-full md:w-80 bg-white border-l border-slate-200 flex flex-col h-64 md:h-full z-20 shadow-[-10px_0_30px_-15px_rgba(0,0,0,0.1)]">
          <div className="flex border-b border-slate-200 bg-slate-50/50">
            <button className="flex-1 py-4 font-bold text-blue-800 border-b-2 border-blue-800 bg-white">
              Palavras ({foundWords.length})
            </button>
            {isMultiplayer && (
              <button className="flex-1 py-4 font-semibold text-slate-500 hover:text-slate-800 transition-colors">
                Oponentes
              </button>
            )}
          </div>

          <div className="flex-1 overflow-y-auto p-4 flex flex-col gap-2">
            <AnimatePresence>
              {foundWords.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full text-slate-400 p-6 text-center">
                  <AlertCircle className="h-12 w-12 mb-4 opacity-20" />
                  <p>As palavras que encontrares aparecerão aqui.</p>
                </div>
              ) : (
                foundWords.map((item, idx) => (
                  <motion.div
                    key={`${item.word}-${idx}`}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="flex items-center justify-between bg-emerald-50 border border-emerald-100 p-3 rounded-xl"
                  >
                    <span className="font-bold text-slate-800 tracking-wider">
                      {item.word}
                    </span>
                    <Badge variant="success" className="bg-emerald-500">
                      +{item.points}
                    </Badge>
                  </motion.div>
                ))
              )}
            </AnimatePresence>
          </div>

          {isMultiplayer && (
  <div className="border-t border-slate-200 bg-slate-50 p-4">
    <h4 className="text-xs font-bold text-slate-500 uppercase mb-3">
      Ranking Atual
    </h4>

    <div className="space-y-3">
      {rankingParaMostrar.length === 0 ? (
        <p className="text-sm text-slate-400 text-center">
          A aguardar pontuações...
        </p>
      ) : (
        rankingParaMostrar.map((player, index) => {
          const souEu = player.id === socket.id;

          return (
            <div
              key={player.id}
              className={`flex items-center justify-between p-2 rounded-lg ${
                souEu
                  ? "bg-white border border-slate-200 shadow-sm relative overflow-hidden"
                  : "opacity-70"
              }`}
            >
              {souEu && (
                <div className="absolute left-0 top-0 bottom-0 w-1 bg-blue-500"></div>
              )}

              <div className="flex items-center gap-2 pl-2">
                <Avatar
                  size="sm"
                  src={player.avatar || ""}
                  fallback={player.name}
                />

                <span className="text-sm font-semibold text-slate-700 truncate max-w-[100px]">
                  {index + 1}. {souEu ? "Tu" : player.name}
                </span>
              </div>

              <span
                className={`font-bold ${
                  souEu ? "text-blue-800" : "text-slate-600"
                }`}
              >
                {player.score} pt
              </span>
            </div>
          );
        })
      )}
    </div>
  </div>
)}
        </div>
      </div>
    </GameLayout>
  );
}