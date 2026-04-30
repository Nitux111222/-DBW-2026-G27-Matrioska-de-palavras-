import React, { useState } from "react";
import { MainLayout } from "../layouts/Layouts";
import { Card, CardContent } from "../components/ui/Card";
import { Avatar } from "../components/ui/avatarRadix";
import { Badge } from "../components/ui/Badge";
import { Trophy, Medal, Star, Flame, Crown } from "lucide-react";

const mockLeaderboard = [
  { rank: 1, name: "joaossilva", score: 12450, avatar: "https://images.unsplash.com/photo-1544717305-2782549b5136?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzdHVkZW50JTIwcG9ydHJhaXR8ZW58MXx8fHwxNzczMjE4NzU0fDA&ixlib=rb-4.1.0&q=80&w=1080", trend: "up" },
  { rank: 2, name: "ana.loureiro", score: 11900, avatar: "", trend: "up" },
  { rank: 3, name: "pedro_gomes", score: 10540, avatar: "", trend: "down" },
  { rank: 4, name: "maria.costa", score: 9800, avatar: "https://images.unsplash.com/photo-1729824186570-4d4aede00043?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxoYXBweSUyMHN0dWRlbnQlMjBhdmF0YXJ8ZW58MXx8fHwxNzczMjU2MzM4fDA&ixlib=rb-4.1.0&q=80&w=1080", trend: "same" },
  { rank: 5, name: "rui_silva12", score: 8750, avatar: "", trend: "up" },
  { rank: 6, name: "ines.martins", score: 8200, avatar: "", trend: "down" },
  { rank: 7, name: "tiago_mendes", score: 7900, avatar: "", trend: "same" },
  { rank: 8, name: "sofia_r", score: 7650, avatar: "", trend: "up" },
  { rank: 9, name: "carlos.p", score: 7100, avatar: "", trend: "down" },
  { rank: 10, name: "catarina_l", score: 6800, avatar: "", trend: "up" },
];

export function Leaderboard() {
  const [activeTab, setActiveTab] = useState("global");

  return (
    <MainLayout isAuthenticated={true}>
      <div className="container mx-auto px-4 py-12 max-w-4xl">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-black text-slate-900 mb-4 flex items-center justify-center gap-4">
            <Trophy className="h-10 w-10 text-amber-500" />
            Ranking dos Mestres
          </h1>
          <p className="text-xl text-slate-600">Descobre quem são os melhores descascadores de palavras.</p>
        </div>

        {/* Filters/Tabs */}
        <div className="flex justify-center mb-12">
          <div className="bg-slate-200/50 p-1.5 rounded-full inline-flex">
            <button 
              className={`px-8 py-2.5 rounded-full font-bold text-sm transition-all ${activeTab === 'global' ? 'bg-white text-blue-900 shadow-sm' : 'text-slate-600 hover:text-slate-900'}`}
              onClick={() => setActiveTab('global')}
            >
              Global (Sempre)
            </button>
            <button 
              className={`px-8 py-2.5 rounded-full font-bold text-sm transition-all ${activeTab === 'weekly' ? 'bg-white text-blue-900 shadow-sm' : 'text-slate-600 hover:text-slate-900'}`}
              onClick={() => setActiveTab('weekly')}
            >
              Semanal
            </button>
            <button 
              className={`px-8 py-2.5 rounded-full font-bold text-sm transition-all ${activeTab === 'friends' ? 'bg-white text-blue-900 shadow-sm' : 'text-slate-600 hover:text-slate-900'}`}
              onClick={() => setActiveTab('friends')}
            >
              Amigos
            </button>
          </div>
        </div>

        {/* Top 3 Podium */}
        <div className="flex flex-col md:flex-row items-end justify-center gap-4 md:gap-8 mb-16 px-4">
          {/* 2nd Place */}
          <div className="flex flex-col items-center order-2 md:order-1">
            <Avatar src={mockLeaderboard[1].avatar} fallback={mockLeaderboard[1].name} className="w-20 h-20 mb-4 border-4 border-slate-300 shadow-md relative z-10" />
            <div className="bg-slate-200 w-full min-w-[140px] md:w-32 h-32 rounded-t-2xl flex flex-col items-center justify-start pt-4 shadow-inner relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-t from-slate-300/50 to-transparent"></div>
              <Medal className="h-8 w-8 text-slate-400 mb-1 relative z-10" />
              <div className="font-bold text-slate-700 relative z-10">{mockLeaderboard[1].name}</div>
              <div className="text-sm font-black text-slate-500 relative z-10">{mockLeaderboard[1].score} pt</div>
            </div>
          </div>

          {/* 1st Place */}
          <div className="flex flex-col items-center order-1 md:order-2 z-20">
            <div className="relative">
              <Crown className="h-10 w-10 text-amber-400 absolute -top-8 left-1/2 -translate-x-1/2 z-20 drop-shadow-md" />
              <Avatar src={mockLeaderboard[0].avatar} fallback={mockLeaderboard[0].name} className="w-24 h-24 mb-4 border-4 border-amber-400 shadow-xl relative z-10" />
            </div>
            <div className="bg-gradient-to-b from-amber-300 to-amber-500 w-full min-w-[140px] md:w-36 h-40 rounded-t-2xl flex flex-col items-center justify-start pt-4 shadow-lg text-amber-950 relative overflow-hidden">
              <div className="absolute inset-0 bg-white/10"></div>
              <Trophy className="h-10 w-10 text-amber-100 mb-1 relative z-10 drop-shadow-sm" />
              <div className="font-black relative z-10">{mockLeaderboard[0].name}</div>
              <div className="text-sm font-black text-amber-900 bg-white/30 px-2 py-0.5 rounded-full mt-1 relative z-10">{mockLeaderboard[0].score} pt</div>
            </div>
          </div>

          {/* 3rd Place */}
          <div className="flex flex-col items-center order-3 md:order-3">
            <Avatar src={mockLeaderboard[2].avatar} fallback={mockLeaderboard[2].name} className="w-16 h-16 mb-4 border-4 border-amber-700 shadow-md relative z-10" />
            <div className="bg-amber-800 w-full min-w-[140px] md:w-28 h-24 rounded-t-2xl flex flex-col items-center justify-start pt-4 shadow-inner text-amber-100 relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
              <Medal className="h-6 w-6 text-amber-600 mb-1 relative z-10" />
              <div className="font-bold relative z-10 text-sm">{mockLeaderboard[2].name}</div>
              <div className="text-xs font-black text-amber-300 relative z-10">{mockLeaderboard[2].score} pt</div>
            </div>
          </div>
        </div>

        {/* List */}
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
          <div className="p-4 bg-slate-50 border-b border-slate-200 grid grid-cols-12 gap-4 text-xs font-bold text-slate-500 uppercase tracking-wider">
            <div className="col-span-2 md:col-span-1 text-center">Pos</div>
            <div className="col-span-7 md:col-span-8">Jogador</div>
            <div className="col-span-3 text-right pr-4">Pontuação</div>
          </div>
          <div className="divide-y divide-slate-100">
            {mockLeaderboard.slice(3).map((player) => (
              <div key={player.rank} className="p-4 flex items-center grid grid-cols-12 gap-4 hover:bg-slate-50 transition-colors">
                <div className="col-span-2 md:col-span-1 flex justify-center font-bold text-slate-400">
                  {player.rank}
                </div>
                <div className="col-span-7 md:col-span-8 flex items-center gap-3">
                  <Avatar src={player.avatar} fallback={player.name} size="sm" />
                  <span className="font-semibold text-slate-900">{player.name}</span>
                  {player.rank <= 10 && <Badge variant="outline" className="hidden md:inline-flex border-blue-200 text-blue-600 bg-blue-50 text-[10px] py-0">Top 10</Badge>}
                </div>
                <div className="col-span-3 text-right pr-4 font-black text-slate-700">
                  {player.score.toLocaleString()}
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </MainLayout>
  );
}
