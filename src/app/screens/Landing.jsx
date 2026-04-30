import React from "react";
import { MainLayout } from "../layouts/Layouts";
import { Button } from "../components/ui/Button";
import { Card, CardContent } from "../components/ui/Card";
import { Badge } from "../components/ui/Badge";
import { Layers, Search, Brain, Users, ArrowRight, Play } from "lucide-react";
import { motion } from "motion/react";
import { useNavigate } from "react-router-dom";

export function Landing() {
  const navigate = useNavigate();

  return (
    <MainLayout>
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-blue-900 text-white pt-24 pb-32">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1710276965349-5f61f9c96aeb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhY2FkZW1pYyUyMHB1enpsZSUyMGJhY2tncm91bmR8ZW58MXx8fHwxNzczMjU2MzM4fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral')] bg-cover bg-center opacity-10"></div>
        <div className="absolute inset-0 bg-gradient-to-b from-blue-900/50 to-blue-900"></div>
        
        <div className="container relative mx-auto px-4 flex flex-col items-center text-center">
          <Badge variant="outline" className="mb-6 text-blue-100 border-blue-400">Novo Jogo Universitário</Badge>
          <motion.h1 
            className="text-5xl md:text-7xl font-extrabold tracking-tight mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            Matrioska
          </motion.h1>
          <motion.p 
            className="text-xl md:text-2xl text-blue-100 max-w-2xl mb-10"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            Descasca as palavras. Um jogo multijogador de agilidade mental e linguística onde a Palavra-Mestra guarda os teus pontos.
          </motion.p>
          <motion.div 
            className="flex flex-col sm:flex-row gap-4 w-full justify-center max-w-md"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <Button size="lg" className="w-full bg-amber-500 hover:bg-amber-600 text-slate-900 font-bold" onClick={() => navigate('/login')}>
              <Play className="mr-2 h-5 w-5 fill-current" />
              Jogar Agora
            </Button>
            <Button size="lg" variant="outline" className="w-full text-white border-white bg-transparent hover:bg-white hover:text-blue-900" onClick={() => navigate('/register')}>
              Criar Conta
            </Button>
          </motion.div>
        </div>
      </section>

      {/* Concept Section */}
      <section id="concept" className="py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl font-bold text-slate-900 mb-4">O Conceito: Palavra-Mestra</h2>
            <p className="text-lg text-slate-600">
              Recebes uma palavra longa e o teu objetivo é encontrar o maior número de subpalavras escondidas na sua grafia original, mantendo a sequência direta ou indireta.
            </p>
          </div>

          <div className="flex flex-col lg:flex-row items-center gap-16">
            <div className="flex-1 w-full">
              <div className="bg-slate-50 p-8 rounded-3xl border border-slate-200 shadow-sm relative">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white px-6 py-2 rounded-full border border-slate-200 shadow-sm text-sm font-semibold text-slate-500">
                  Exemplo de Jogo
                </div>
                
                <div className="text-center mb-10 mt-4">
                  <div className="text-xs font-bold uppercase tracking-widest text-blue-500 mb-2">Palavra-Mestra</div>
                  <div className="flex justify-center gap-1 sm:gap-2">
                    {['S','O','L','I','D','A','R','I','E','D','A','D','E'].map((letter, i) => (
                      <div key={i} className="w-8 h-10 sm:w-12 sm:h-14 bg-white border-2 border-slate-300 rounded-lg flex items-center justify-center text-xl sm:text-2xl font-bold text-slate-800 shadow-sm">
                        {letter}
                      </div>
                    ))}
                  </div>
                </div>

                <div className="space-y-4 relative">
                  <div className="absolute left-6 top-0 bottom-0 w-px bg-slate-300"></div>
                  
                  {['SOL', 'LIDA', 'IDA', 'IDADE', 'DAR', 'REDE'].map((word, i) => (
                    <motion.div 
                      key={word}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.1 }}
                      viewport={{ once: true }}
                      className="ml-12 relative"
                    >
                      <div className="absolute -left-6 top-1/2 -translate-y-1/2 w-4 h-px bg-slate-300"></div>
                      <div className="bg-white border border-slate-200 px-4 py-2 rounded-lg shadow-sm inline-flex items-center gap-3">
                        <span className="font-bold text-slate-700 tracking-wider">{word}</span>
                        <Badge variant="success" className="text-[10px] py-0">+{word.length * 10} pts</Badge>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>

            <div className="flex-1 space-y-8">
              <div className="flex gap-4">
                <div className="flex-shrink-0 w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center text-blue-800">
                  <Search className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-slate-900 mb-2">Descoberta Linguística</h3>
                  <p className="text-slate-600">Treina o teu cérebro para reconhecer padrões e vocabulário oculto nas palavras mais comuns do dia a dia.</p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="flex-shrink-0 w-12 h-12 bg-emerald-100 rounded-xl flex items-center justify-center text-emerald-800">
                  <Brain className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-slate-900 mb-2">Agilidade Mental</h3>
                  <p className="text-slate-600">O tempo não para. Pensa rápido, escreve mais rápido ainda e encontra as palavras que os teus adversários não veem.</p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="flex-shrink-0 w-12 h-12 bg-amber-100 rounded-xl flex items-center justify-center text-amber-800">
                  <Layers className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-slate-900 mb-2">As Camadas da Matrioska</h3>
                  <p className="text-slate-600">Como a famosa boneca russa, cada palavra contém outra palavra mais pequena, que por sua vez contém outra.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Modes Section */}
      <section id="modes" className="py-24 bg-slate-50 border-t border-slate-200">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl font-bold text-slate-900 mb-4">Como preferes jogar?</h2>
            <p className="text-lg text-slate-600">
              Treina as tuas capacidades a sós ou desafia amigos para descobrirem quem é o mestre da Matrioska.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <Card className="hover:border-blue-400 transition-colors overflow-hidden group cursor-pointer" onClick={() => navigate('/login')}>
              <div className="h-48 bg-blue-50 flex items-center justify-center relative">
                <Brain className="h-20 w-20 text-blue-200 absolute" />
                <div className="z-10 bg-white p-4 rounded-full shadow-md">
                  <Brain className="h-8 w-8 text-blue-800" />
                </div>
              </div>
              <CardContent className="p-8">
                <h3 className="text-2xl font-bold mb-2">Treino Individual</h3>
                <p className="text-slate-600 mb-6">Joga ao teu próprio ritmo. Tenta bater os teus próprios recordes e subir no ranking global de pontos.</p>
                <div className="flex items-center text-blue-800 font-semibold group-hover:translate-x-2 transition-transform">
                  Modo Solo <ArrowRight className="ml-2 h-4 w-4" />
                </div>
              </CardContent>
            </Card>

            <Card className="hover:border-amber-400 transition-colors overflow-hidden group cursor-pointer" onClick={() => navigate('/login')}>
              <div className="h-48 bg-amber-50 flex items-center justify-center relative">
                <Users className="h-20 w-20 text-amber-200 absolute" />
                <div className="z-10 bg-white p-4 rounded-full shadow-md">
                  <Users className="h-8 w-8 text-amber-600" />
                </div>
              </div>
              <CardContent className="p-8">
                <h3 className="text-2xl font-bold mb-2">Multijogador em Tempo Real</h3>
                <p className="text-slate-600 mb-6">Cria uma sala privada com os teus colegas de faculdade e competem na mesma palavra em simultâneo.</p>
                <div className="flex items-center text-amber-600 font-semibold group-hover:translate-x-2 transition-transform">
                  Jogar com Amigos <ArrowRight className="ml-2 h-4 w-4" />
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </MainLayout>
  );
}
