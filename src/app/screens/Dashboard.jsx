import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { MainLayout } from "../layouts/Layouts";
import { Button } from "../components/ui/Button";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/Card";
import { Avatar } from "../components/ui/avatarRadix";
import { Badge } from "../components/ui/Badge";
import { Brain, Trophy, Clock, CheckCircle2, XCircle, Users, Play, Settings, Plus, Key } from "lucide-react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

const performanceData = [
  { id: '1', name: 'Seg', pontos: 450 },
  { id: '2', name: 'Ter', pontos: 520 },
  { id: '3', name: 'Qua', pontos: 480 },
  { id: '4', name: 'Qui', pontos: 610 },
  { id: '5', name: 'Sex', pontos: 590 },
  { id: '6', name: 'Sáb', pontos: 840 },
  { id: '7', name: 'Dom', pontos: 780 },
];

export function Dashboard() {
  const navigate = useNavigate();

  return (
    <MainLayout isAuthenticated={true}>
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row gap-8">
          
          {/* Sidebar / Profile Card */}
          <div className="w-full md:w-80 flex-shrink-0 flex flex-col gap-6">
            <Card className="bg-white border-slate-200 shadow-sm overflow-hidden">
              <div className="h-24 bg-blue-800 relative">
                <Button 
                  size="icon" 
                  variant="ghost" 
                  className="absolute top-2 right-2 text-white/80 hover:text-white hover:bg-white/20"
                  onClick={() => navigate('/profile')}
                >
                  <Settings className="h-5 w-5" />
                </Button>
              </div>
              <CardContent className="px-6 pb-6 pt-0 relative">
                <div className="flex justify-center -mt-12 mb-4">
                  <Avatar 
                    src="https://images.unsplash.com/photo-1544717305-2782549b5136?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzdHVkZW50JTIwcG9ydHJhaXR8ZW58MXx8fHwxNzczMjE4NzU0fDA&ixlib=rb-4.1.0&q=80&w=1080" 
                    size="xl" 
                    className="border-4 border-white shadow-sm"
                  />
                </div>
                <div className="text-center mb-6">
                  <h2 className="text-xl font-bold text-slate-900">joaossilva</h2>
                  <p className="text-sm text-slate-500">Mestre da Matrioska Nível 4</p>
                </div>

                <div className="grid grid-cols-2 gap-4 text-center">
                  <div className="bg-slate-50 rounded-lg p-3 border border-slate-100">
                    <div className="text-2xl font-bold text-blue-800">12.4k</div>
                    <div className="text-xs text-slate-500 uppercase font-semibold mt-1">Pontos Totais</div>
                  </div>
                  <div className="bg-amber-50 rounded-lg p-3 border border-amber-100">
                    <div className="text-2xl font-bold text-amber-600">840</div>
                    <div className="text-xs text-slate-500 uppercase font-semibold mt-1">Recorde</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-lg">Ações Rápidas</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button className="w-full justify-start bg-blue-800 hover:bg-blue-900" onClick={() => navigate('/game/solo')}>
                  <Play className="mr-2 h-4 w-4" /> Jogar Solo
                </Button>
                <Button className="w-full justify-start bg-amber-500 hover:bg-amber-600 text-slate-900 font-medium" onClick={() => navigate('/modes')}>
                  <Users className="mr-2 h-4 w-4" /> Entrar em Sala
                </Button>
                <Button variant="outline" className="w-full justify-start border-slate-300" onClick={() => navigate('/lobby/new')}>
                  <Plus className="mr-2 h-4 w-4" /> Criar Sala Privada
                </Button>
                
              </CardContent>
            </Card>
          </div>

          {/* Main Content */}
          <div className="flex-1 flex flex-col gap-6">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-bold text-slate-900">Olá, João! 👋</h1>
                <p className="text-slate-600 mt-1">Pronto para mais um desafio de palavras?</p>
              </div>
            </div>

            <h3 className="text-xl font-semibold text-slate-800 mt-4">As Tuas Estatísticas</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <Card className="bg-white">
                <CardContent className="p-6 flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-600 flex-shrink-0">
                    <CheckCircle2 className="h-6 w-6" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-slate-500">Respostas Corretas</p>
                    <h4 className="text-2xl font-bold text-slate-900">1,245</h4>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-white">
                <CardContent className="p-6 flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-rose-100 flex items-center justify-center text-rose-600 flex-shrink-0">
                    <XCircle className="h-6 w-6" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-slate-500">Erros / Inválidas</p>
                    <h4 className="text-2xl font-bold text-slate-900">238</h4>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-white">
                <CardContent className="p-6 flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 flex-shrink-0">
                    <Clock className="h-6 w-6" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-slate-500">Tempo de Jogo</p>
                    <h4 className="text-2xl font-bold text-slate-900">14h 20m</h4>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-white">
                <CardContent className="p-6 flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-amber-100 flex items-center justify-center text-amber-600 flex-shrink-0">
                    <Trophy className="h-6 w-6" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-slate-500">Partidas Ganhas</p>
                    <h4 className="text-2xl font-bold text-slate-900">42</h4>
                  </div>
                </CardContent>
              </Card>
            </div>

            <h3 className="text-xl font-semibold text-slate-800 mt-4">Evolução do Jogador</h3>
            <Card className="bg-white">
              <CardContent className="p-6">
                <div className="w-full min-w-0" style={{ height: 300 }}>
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={performanceData} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
                      <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                      <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#64748b' }} dy={10} />
                      <YAxis axisLine={false} tickLine={false} tick={{ fill: '#64748b' }} dx={-10} />
                      <Tooltip 
                        contentStyle={{ borderRadius: '8px', border: '1px solid #e2e8f0', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                        cursor={{ stroke: '#cbd5e1', strokeWidth: 1, strokeDasharray: '4 4' }}
                      />
                      <Line type="monotone" dataKey="pontos" stroke="#1e40af" strokeWidth={3} dot={{ r: 4, strokeWidth: 2, fill: '#fff' }} activeDot={{ r: 6, fill: '#1e40af', stroke: '#fff', strokeWidth: 2 }} isAnimationActive={false} />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

          </div>
        </div>
      </div>
    </MainLayout>
  );
}
