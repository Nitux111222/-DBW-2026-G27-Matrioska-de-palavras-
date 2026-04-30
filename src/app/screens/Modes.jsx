import React, { useState } from "react";
import { MainLayout } from "../layouts/Layouts";
import { Button } from "../components/ui/Button";
import { Input } from "../components/ui/Input";
import { Card, CardContent } from "../components/ui/Card";
import { Users, User, ArrowRight, Key, Globe } from "lucide-react";
import { useNavigate } from "react-router-dom";

export function Modes() {
  const navigate = useNavigate();
  const [roomCode, setRoomCode] = useState("");

  const handleJoinRoom = (e) => {
    e.preventDefault();
    if (roomCode.trim()) {
      navigate(`/lobby/${roomCode}`);
    }
  };

  return (
    <MainLayout isAuthenticated={true}>
      <div className="container mx-auto px-4 py-12 max-w-5xl">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-slate-900 mb-4">
            Escolhe o Modo de Jogo
          </h1>
          <p className="text-xl text-slate-600 max-w-2xl mx-auto">
            Decide como queres exercitar a tua agilidade mental hoje. Joga a sós
            ou contra outros utilizadores.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 mb-12">
          <Card
            className="hover:border-blue-400 hover:shadow-lg transition-all cursor-pointer group flex flex-col h-full"
            onClick={() => navigate("/game/solo")}
          >
            <div className="h-40 bg-gradient-to-br from-slate-100 to-blue-50 flex items-center justify-center relative overflow-hidden rounded-t-xl">
              <User className="h-24 w-24 text-blue-200 absolute -right-4 -bottom-4 group-hover:scale-110 transition-transform" />
              <div className="z-10 bg-white p-4 rounded-full shadow-md">
                <User className="h-8 w-8 text-blue-800" />
              </div>
            </div>

            <CardContent className="p-8 flex-1 flex flex-col">
              <h3 className="text-2xl font-bold mb-2 text-slate-900">
                Treino Solo
              </h3>
              <p className="text-slate-600 mb-8 flex-1">
                Joga sozinho sem pressão de adversários. Descobre todas as
                palavras escondidas na Palavra-Mestra para obteres a pontuação
                máxima.
              </p>
              <Button className="w-full group-hover:bg-blue-900 transition-colors">
                Começar Treino <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </CardContent>
          </Card>

          <Card
            className="hover:border-amber-400 hover:shadow-lg transition-all cursor-pointer group flex flex-col h-full"
            onClick={() => navigate("/lobby/random")}
          >
            <div className="h-40 bg-gradient-to-br from-amber-50 to-orange-50 flex items-center justify-center relative overflow-hidden rounded-t-xl">
              <Globe className="h-24 w-24 text-amber-200 absolute -right-4 -bottom-4 group-hover:scale-110 transition-transform" />
              <div className="z-10 bg-white p-4 rounded-full shadow-md">
                <Globe className="h-8 w-8 text-amber-600" />
              </div>
            </div>

            <CardContent className="p-8 flex-1 flex flex-col">
              <h3 className="text-2xl font-bold mb-2 text-slate-900">
                Multijogador Rápido
              </h3>
              <p className="text-slate-600 mb-8 flex-1">
                Junta-te a uma sala pública com jogadores de todo o mundo. Quem
                encontrar mais palavras no limite de tempo vence a ronda.
              </p>
              <Button className="w-full bg-amber-500 hover:bg-amber-600 text-slate-900 font-semibold group-hover:bg-amber-600 transition-colors">
                Procurar Oponentes <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </CardContent>
          </Card>
        </div>

        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-8 max-w-3xl mx-auto">
          <div className="flex items-center gap-4 mb-6">
            <div className="bg-slate-100 p-3 rounded-lg text-slate-700">
              <Users className="h-6 w-6" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-slate-900">
                Salas Privadas
              </h3>
              <p className="text-slate-600">
                Joga exclusivamente com os teus amigos
              </p>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div className="space-y-4 border-r-0 md:border-r border-slate-200 md:pr-8 pb-8 md:pb-0 border-b md:border-b-0">
              <h4 className="font-semibold text-slate-800">
                Entrar numa sala
              </h4>

              <form onSubmit={handleJoinRoom} className="flex gap-2">
                <div className="relative flex-1">
                  <Key className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                  <Input
                    placeholder="Código da sala..."
                    className="pl-9 font-mono uppercase"
                    value={roomCode}
                    onChange={(e) => setRoomCode(e.target.value.toUpperCase())}
                    maxLength={6}
                  />
                </div>

                <Button
                  type="submit"
                  variant="secondary"
                  disabled={roomCode.length < 3}
                >
                  Entrar
                </Button>
              </form>
            </div>

            <div className="space-y-4 md:pl-4">
              <h4 className="font-semibold text-slate-800">
                Ou cria a tua própria
              </h4>
              <p className="text-sm text-slate-600 mb-4">
                Serás o Host e poderás escolher as definições do jogo e
                partilhar o código.
              </p>
              <Button
                className="w-full"
                variant="outline"
                onClick={() => navigate("/lobby/new")}
              >
                Criar Sala Privada
              </Button>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}