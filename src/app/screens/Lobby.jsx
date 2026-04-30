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

export function Lobby() {
  const { id } = useParams();
  const navigate = useNavigate();
  const isHost = id === "new";
  const roomCode = isHost ? "AB49XY" : id?.toUpperCase() || "RANDOM";
  
  const [players, setPlayers] = useState([
    { id: 1, name: "joaossilva", avatar: "https://images.unsplash.com/photo-1544717305-2782549b5136?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzdHVkZW50JTIwcG9ydHJhaXR8ZW58MXx8fHwxNzczMjE4NzU0fDA&ixlib=rb-4.1.0&q=80&w=1080", isHost: true, isReady: true },
    { id: 2, name: "maria.costa", avatar: "https://images.unsplash.com/photo-1729824186570-4d4aede00043?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxoYXBweSUyMHN0dWRlbnQlMjBhdmF0YXJ8ZW58MXx8fHwxNzczMjU2MzM4fDA&ixlib=rb-4.1.0&q=80&w=1080", isHost: false, isReady: true },
    { id: 3, name: "tiago_mendes", avatar: "", isHost: false, isReady: false },
  ]);

  const copyCode = () => {
    navigator.clipboard.writeText(roomCode);
    toast.success("Código copiado para a área de transferência!");
  };

  const handleStart = () => {
    navigate(`/game/${roomCode}`);
  };

  return (
    <GameLayout>
      <div className="flex-1 flex flex-col md:flex-row h-full">
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
                <Button size="lg" variant="outline" className="border-emerald-500 text-emerald-600 hover:bg-emerald-50 px-8">
                  <CheckCircle2 className="mr-2 h-5 w-5" /> Estou Pronto
                </Button>
              )}
            </div>

          </div>
        </div>

        {/* Sidebar Chat */}
        <div className="w-full md:w-80 bg-white border-l border-slate-200 flex flex-col h-64 md:h-full">
          <div className="p-4 border-b border-slate-200 flex items-center gap-2 text-slate-800 font-semibold">
            <MessageSquare className="h-5 w-5 text-blue-800" /> Chat da Sala
          </div>
          
          <div className="flex-1 p-4 overflow-y-auto space-y-4 bg-slate-50 text-sm">
            <div className="text-center">
              <span className="text-xs bg-slate-200 text-slate-500 px-2 py-1 rounded-full">joaossilva criou a sala</span>
            </div>
            <div className="bg-white p-3 rounded-xl rounded-tl-sm shadow-sm border border-slate-100 max-w-[85%]">
              <span className="font-semibold text-xs text-blue-800 block mb-1">joaossilva</span>
              <p className="text-slate-700">Bem-vindos! Vamos esperar pelo Tiago.</p>
            </div>
            <div className="text-center">
              <span className="text-xs bg-slate-200 text-slate-500 px-2 py-1 rounded-full">maria.costa entrou na sala</span>
            </div>
            <div className="bg-blue-800 p-3 rounded-xl rounded-tr-sm shadow-sm max-w-[85%] ml-auto text-white">
              <span className="font-semibold text-xs text-blue-200 block mb-1">Tu</span>
              <p>Já estou pronto, bora!</p>
            </div>
          </div>
          
          <div className="p-3 bg-white border-t border-slate-200">
            <form className="flex gap-2" onSubmit={(e) => e.preventDefault()}>
              <input 
                type="text" 
                placeholder="Escreve uma mensagem..." 
                className="flex-1 text-sm bg-slate-100 rounded-full px-4 py-2 outline-none focus:ring-2 focus:ring-blue-800 focus:bg-white transition-all border border-transparent focus:border-blue-800"
              />
              <Button type="submit" size="icon" className="rounded-full flex-shrink-0 h-9 w-9">
                <Play className="h-4 w-4 ml-0.5" />
              </Button>
            </form>
          </div>
        </div>

      </div>
    </GameLayout>
  );
}
