import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { MainLayout } from "../layouts/Layouts";
import { Button } from "../components/ui/Button";
import { Card, CardContent } from "../components/ui/Card";
import { Avatar } from "../components/ui/avatarRadix";
import { Badge } from "../components/ui/Badge";
import { Trophy, Clock, Medal, RotateCcw, Home, Play, CheckCircle2, XCircle } from "lucide-react";
import { motion } from "motion/react";

export function Results() {
  const { id } = useParams();
  const navigate = useNavigate();
  const isMultiplayer = id !== "solo";

  const masterWord = "SOLIDARIEDADE";
  const userScore = 840;
  const foundWordsCount = 12;
  const timeUsed = "2:00";
  
  const possibleWords = ["SOL", "LIDA", "IDA", "IDADE", "DAR", "REDE", "LIDER", "DOR", "RIR", "DIA", "LIDO", "DIREITO"];
  const foundWords = ["SOL", "LIDA", "IDA", "IDADE", "DAR", "REDE"];
  const missedWords = possibleWords.filter(w => !foundWords.includes(w));

  return (
    <MainLayout isAuthenticated={true}>
      <div className="container mx-auto px-4 py-12 max-w-5xl">
        <div className="text-center mb-12">
          <Badge variant="outline" className="mb-4 border-amber-500 text-amber-600 font-bold">Ronda Terminada</Badge>
          <h1 className="text-4xl font-black text-slate-900 mb-2">Resultados</h1>
          <p className="text-xl text-slate-600">Palavra-Mestra: <span className="font-bold text-blue-800 tracking-widest">{masterWord}</span></p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8 mb-12">
          
          {/* Left Column: Score Card */}
          <div className="lg:col-span-1 flex flex-col gap-6">
            <Card className="bg-gradient-to-br from-blue-900 to-blue-800 text-white border-none shadow-xl relative overflow-hidden">
              <div className="absolute top-0 right-0 p-8 opacity-10">
                <Trophy className="w-32 h-32" />
              </div>
              <CardContent className="p-8 relative z-10 text-center">
                <div className="mx-auto w-20 h-20 bg-white/10 backdrop-blur rounded-2xl flex items-center justify-center mb-6 border border-white/20">
                  <Trophy className="h-10 w-10 text-amber-400" />
                </div>
                <h2 className="text-slate-200 font-medium mb-1 uppercase tracking-wider text-sm">A tua pontuação</h2>
                <div className="text-6xl font-black mb-6">{userScore}</div>
                
                <div className="grid grid-cols-2 gap-4 border-t border-white/20 pt-6 mt-6">
                  <div>
                    <div className="text-3xl font-bold text-emerald-400">{foundWordsCount}</div>
                    <div className="text-xs text-blue-200 uppercase mt-1">Palavras</div>
                  </div>
                  <div>
                    <div className="text-3xl font-bold">{timeUsed}</div>
                    <div className="text-xs text-blue-200 uppercase mt-1">Tempo</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {isMultiplayer && (
              <Card className="border-amber-200 bg-amber-50">
                <CardContent className="p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <Medal className="h-6 w-6 text-amber-500" />
                    <h3 className="font-bold text-slate-900">Classificação da Sala</h3>
                  </div>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between bg-white p-3 rounded-xl border border-amber-200 shadow-sm relative overflow-hidden">
                      <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-amber-500"></div>
                      <div className="flex items-center gap-3 pl-3">
                        <div className="font-black text-amber-500 w-4">1</div>
                        <Avatar size="sm" src="https://images.unsplash.com/photo-1544717305-2782549b5136?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzdHVkZW50JTIwcG9ydHJhaXR8ZW58MXx8fHwxNzczMjE4NzU0fDA&ixlib=rb-4.1.0&q=80&w=1080" />
                        <span className="font-bold text-slate-900">Tu</span>
                      </div>
                      <span className="font-bold text-amber-600">{userScore}</span>
                    </div>
                    <div className="flex items-center justify-between p-2 pl-4">
                      <div className="flex items-center gap-3">
                        <div className="font-bold text-slate-400 w-4">2</div>
                        <Avatar size="sm" src="https://images.unsplash.com/photo-1729824186570-4d4aede00043?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxoYXBweSUyMHN0dWRlbnQlMjBhdmF0YXJ8ZW58MXx8fHwxNzczMjU2MzM4fDA&ixlib=rb-4.1.0&q=80&w=1080" />
                        <span className="font-medium text-slate-700">maria.costa</span>
                      </div>
                      <span className="font-bold text-slate-600">620</span>
                    </div>
                    <div className="flex items-center justify-between p-2 pl-4">
                      <div className="flex items-center gap-3">
                        <div className="font-bold text-slate-400 w-4">3</div>
                        <Avatar size="sm" fallback="tiago_mendes" />
                        <span className="font-medium text-slate-700">tiago_mendes</span>
                      </div>
                      <span className="font-bold text-slate-600">410</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}

            <div className="flex flex-col gap-3 mt-auto">
              {isMultiplayer ? (
                <Button size="lg" className="w-full bg-blue-800 hover:bg-blue-900" onClick={() => navigate(`/lobby/${id}`)}>
                  <RotateCcw className="mr-2 h-5 w-5" /> Nova Ronda na Sala
                </Button>
              ) : (
                <Button size="lg" className="w-full bg-blue-800 hover:bg-blue-900" onClick={() => navigate('/game/solo')}>
                  <Play className="mr-2 h-5 w-5 fill-current" /> Jogar Novamente
                </Button>
              )}
              <Button size="lg" variant="outline" className="w-full bg-white" onClick={() => navigate('/dashboard')}>
                <Home className="mr-2 h-5 w-5" /> Voltar ao Dashboard
              </Button>
            </div>
          </div>

          {/* Right Column: Words breakdown */}
          <div className="lg:col-span-2">
            <Card className="h-full border-slate-200 shadow-sm">
              <CardContent className="p-8">
                <h3 className="text-xl font-bold text-slate-900 mb-6 flex items-center">
                  <CheckCircle2 className="h-6 w-6 text-emerald-500 mr-2" />
                  Palavras Encontradas ({foundWords.length})
                </h3>
                <div className="flex flex-wrap gap-3 mb-10">
                  {foundWords.map(word => (
                    <div key={word} className="bg-emerald-50 border border-emerald-200 text-emerald-800 px-4 py-2 rounded-xl font-bold flex items-center gap-2">
                      {word} <span className="text-xs bg-emerald-200 px-1.5 py-0.5 rounded-md text-emerald-900">+{word.length*10}</span>
                    </div>
                  ))}
                </div>

                <div className="w-full h-px bg-slate-200 mb-8"></div>

                <h3 className="text-xl font-bold text-slate-900 mb-6 flex items-center">
                  <XCircle className="h-6 w-6 text-rose-400 mr-2" />
                  Palavras Que Faltaram ({missedWords.length})
                </h3>
                <div className="flex flex-wrap gap-3">
                  {missedWords.map((word, i) => (
                    <motion.div 
                      key={word} 
                      className="bg-slate-100 border border-slate-200 text-slate-500 px-4 py-2 rounded-xl font-medium"
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: i * 0.1 }}
                    >
                      {word}
                    </motion.div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

        </div>
      </div>
    </MainLayout>
  );
}
