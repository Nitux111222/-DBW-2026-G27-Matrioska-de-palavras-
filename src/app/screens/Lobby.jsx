import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { GameLayout } from "../layouts/Layouts";
import { Button } from "../components/ui/Button";
import { Card, CardContent } from "../components/ui/Card";
import { Avatar } from "../components/ui/avatarRadix";
import { Badge } from "../components/ui/Badge";
import { Users, Copy, MessageSquare, Play, Crown, CheckCircle2, UserPlus, LogOut } from "lucide-react";
import { toast } from "sonner";
import { motion } from "motion/react";
import { socket } from "../../socket";

export function Lobby() {
  const { id } = useParams();
  const navigate = useNavigate();

  const isCreatingLobby = id === "new";

  const [roomCode, setRoomCode] = useState("");
  const [players, setPlayers] = useState([]);
  const [isHost, setIsHost] = useState(false);

  const username =
    JSON.parse(localStorage.getItem("user"))?.username || "Jogador";

  useEffect(() => {
    if (isCreatingLobby) {
      socket.emit("criarLobby", { username });
    } else {
      socket.emit("entrarLobby", {
        codigo: id,
        username,
      });
    }

    socket.on("lobbyCriada", ({ codigo, lobby }) => {
      setRoomCode(codigo);
      setPlayers(lobby.players);
      setIsHost(true);

      navigate(`/lobby/${codigo}`, { replace: true });
    });

    socket.on("lobbyAtualizada", (lobby) => {
      setRoomCode(lobby.codigo);
      setPlayers(lobby.players);

      const eu = lobby.players.find((player) => player.id === socket.id);
      setIsHost(eu?.isHost || false);
    });

    socket.on("erroLobby", (mensagem) => {
      toast.error(mensagem);
      navigate("/modes");
    });

    socket.on("jogoIniciado", ({ codigo }) => {
      navigate(`/game/${codigo}`);
    });

    return () => {
      socket.off("lobbyCriada");
      socket.off("lobbyAtualizada");
      socket.off("erroLobby");
      socket.off("jogoIniciado");
    };
  }, [id, isCreatingLobby, username, navigate]);

  const copyCode = () => {
    navigator.clipboard.writeText(roomCode);
    toast.success("Código copiado para a área de transferência!");
  };

  const handleStart = () => {
    socket.emit("comecarJogo", {
      codigo: roomCode,
    });
  };

  const handleReady = () => {
  socket.emit("toggleReady", {
    codigo: roomCode,
  });
};

  return(
    <GameLayout>
      <div className="flex-1 h-full">
        {/* Main Lobby Area */}
        <div className="flex-1 p-6 md:p-8 overflow-y-auto">
          <div className="max-w-4xl mx-auto space-y-8">
            
            {/* Header */}
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center text-blue-800">
                  <Users className="h-8 w-8" />
                </div>
                <div>
                  <h1 className="text-2xl font-bold text-slate-900">Sala de Espera</h1>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="text-sm text-slate-500">Código da sala:</span>
                    <Badge variant="secondary" className="font-mono text-sm px-2 py-0.5 tracking-widest bg-slate-200 text-slate-800">
                      {roomCode}
                    </Badge>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-3 w-full md:w-auto">
                <Button variant="outline" className="flex-1 md:flex-none" onClick={copyCode}>
                  <Copy className="h-4 w-4 mr-2" /> Copiar
                </Button>
                <Button variant="outline" className="flex-1 md:flex-none">
                  <UserPlus className="h-4 w-4 mr-2" /> Convidar
                </Button>
              </div>
            </div>

            {/* Players Grid */}
            <div>
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-bold text-slate-800">Jogadores ({players.length}/6)</h3>
                <span className="text-sm text-slate-500 font-medium">A aguardar por todos estarem prontos...</span>
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {players.map((player) => (
                  <motion.div
                    key={player.id}
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                  >
                    <Card className={`overflow-hidden border-2 transition-all ${player.isReady ? 'border-emerald-500 bg-emerald-50/30' : 'border-slate-200 bg-white'}`}>
                      <CardContent className="p-4 flex items-center gap-4">
                        <div className="relative">
                          <Avatar src={player.avatar} fallback={player.name} size="lg" />
                          {player.isHost && (
                            <div className="absolute -top-2 -right-2 bg-amber-500 text-white rounded-full p-1 shadow-sm border-2 border-white">
                              <Crown className="h-3 w-3" />
                            </div>
                          )}
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="font-semibold text-slate-900 truncate">{player.name}</p>
                          <div className="flex items-center mt-1">
                            {player.isReady ? (
                              <Badge variant="success" className="text-[10px] py-0">Pronto</Badge>
                            ) : (
                              <Badge variant="secondary" className="text-[10px] py-0 text-slate-500 bg-slate-200">A escolher...</Badge>
                            )}
                          </div>
                        </div>
                        {player.isReady && (
                          <CheckCircle2 className="h-6 w-6 text-emerald-500 flex-shrink-0" />
                        )}
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}

                {/* Empty slots */}
                {Array.from({ length: 6 - players.length }).map((_, i) => (
                  <Card key={`empty-${i}`} className="border-dashed border-2 border-slate-200 bg-slate-50/50 flex items-center justify-center p-6">
                    <div className="text-center text-slate-400">
                      <div className="w-14 h-14 rounded-full border-2 border-dashed border-slate-300 mx-auto mb-2 flex items-center justify-center">
                        <Users className="h-6 w-6 text-slate-300" />
                      </div>
                      <span className="text-sm font-medium">Lugar vazio</span>
                    </div>
                  </Card>
                ))}
              </div>
            </div>
            
            {/* Bottom Actions */}
            <div className="flex items-center justify-between border-t border-slate-200 pt-6 mt-auto">
              <Button variant="ghost" className="text-rose-500 hover:text-rose-600 hover:bg-rose-50" onClick={() => navigate('/modes')}>
                <LogOut className="mr-2 h-4 w-4" /> Sair da Sala
              </Button>
              
              {isHost ? (
                <Button size="lg" className="bg-blue-800 hover:bg-blue-900 px-8" onClick={handleStart}>
                  <Play className="mr-2 h-5 w-5 fill-current" /> Começar Jogo
                </Button>
              ) : (
                <Button
                 size="lg"
                variant="outline"
                className="border-emerald-500 text-emerald-600 hover:bg-emerald-50 px-8"
                onClick={handleReady}
                >
              <CheckCircle2 className="mr-2 h-5 w-5" /> Estou Pronto
              </Button>
              )}
            </div>

          </div>
        </div>
      </div>
    </GameLayout>
  );
}
