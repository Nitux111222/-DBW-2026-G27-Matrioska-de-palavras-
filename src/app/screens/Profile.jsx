import React from "react";
import { MainLayout } from "../layouts/Layouts";
import { Button } from "../components/ui/Button";
import { Input } from "../components/ui/Input";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "../components/ui/Card";
import { Avatar } from "../components/ui/avatarRadix";
import { Save, LogOut, Camera, Trophy, Clock, Star } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

export function Profile() {
  const navigate = useNavigate();

  const handleSave = () => {
    toast.success("Perfil atualizado com sucesso!");
  };

  const handleLogout = () => {
    navigate("/");
    toast.success("Sessão terminada");
  };

  return (
    <MainLayout isAuthenticated={true}>
      <div className="container mx-auto px-4 py-12 max-w-4xl">
        <h1 className="text-3xl font-bold text-slate-900 mb-8">Definições de Conta</h1>

        <div className="grid md:grid-cols-3 gap-8">
          <div className="md:col-span-1 space-y-6">
            <Card>
              <CardContent className="p-6 text-center flex flex-col items-center">
                <div className="relative mb-4 group cursor-pointer">
                  <Avatar 
                    src="https://images.unsplash.com/photo-1544717305-2782549b5136?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzdHVkZW50JTIwcG9ydHJhaXR8ZW58MXx8fHwxNzczMjE4NzU0fDA&ixlib=rb-4.1.0&q=80&w=1080" 
                    size="xl" 
                    className="border-4 border-slate-100"
                  />
                  <div className="absolute inset-0 bg-black/50 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <Camera className="h-8 w-8 text-white" />
                  </div>
                </div>
                <h3 className="text-xl font-bold text-slate-900">joaossilva</h3>
                <p className="text-sm text-slate-500 mb-4">Membro desde Out. 2025</p>
                
                <div className="w-full flex items-center justify-center gap-2 bg-blue-50 text-blue-800 py-2 rounded-lg font-semibold text-sm border border-blue-100">
                  <Star className="h-4 w-4 fill-current" /> Nível 4 Mestre
                </div>
              </CardContent>
            </Card>

            <Button variant="outline" className="w-full text-rose-500 border-rose-200 hover:bg-rose-50 hover:text-rose-600" onClick={handleLogout}>
              <LogOut className="mr-2 h-4 w-4" /> Terminar Sessão
            </Button>
          </div>

          <div className="md:col-span-2 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Dados Pessoais</CardTitle>
                <CardDescription>Atualiza as tuas informações de perfil.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-slate-700">Nome Próprio</label>
                    <Input defaultValue="João" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-slate-700">Apelido</label>
                    <Input defaultValue="Silva" />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-slate-700">Nome de Utilizador</label>
                  <Input defaultValue="joaossilva" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-slate-700">Email Académico</label>
                  <Input defaultValue="up202104523@edu.up.pt" disabled className="bg-slate-50 text-slate-500" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Segurança</CardTitle>
                <CardDescription>Altera a tua palavra-passe regularmente.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-slate-700">Palavra-passe Atual</label>
                  <Input type="password" placeholder="••••••••" />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-slate-700">Nova Palavra-passe</label>
                    <Input type="password" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-slate-700">Confirmar Nova</label>
                    <Input type="password" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <div className="flex justify-end gap-4">
              <Button variant="outline" onClick={() => navigate('/dashboard')}>Cancelar</Button>
              <Button onClick={handleSave} className="bg-blue-800 hover:bg-blue-900">
                <Save className="mr-2 h-4 w-4" /> Guardar Alterações
              </Button>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
