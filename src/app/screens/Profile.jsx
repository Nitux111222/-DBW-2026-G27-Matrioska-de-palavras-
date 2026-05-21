import React from "react";
import { MainLayout } from "../layouts/Layouts";
import { Button } from "../components/ui/Button";
import { Input } from "../components/ui/Input";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "../components/ui/Card";
import { Avatar } from "../components/ui/avatarRadix";
import { Save, LogOut, Camera, Trophy, Clock, } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { useEffect, useState } from "react";

export function Profile() {
  const navigate = useNavigate();

  const [user, setUser] = useState(null);
  const [Pnome, setPnome] = useState("");
  const [Unome, setUnome] = useState("");
  const [username, setUsername] = useState("");

  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  useEffect(() => {
  const fetchUser = async () => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (!storedUser) return;

    const res = await fetch(`http://localhost:3000/api/user/${storedUser.id}`);
    const data = await res.json();

    setUser(data);
    setUsername(data.username);
    setPnome(data.Pnome);
    setUnome(data.Unome);
  };

  fetchUser();
}, []);

  const handleSave = async () => {
  try {
    const storedUser = JSON.parse(localStorage.getItem("user"));

    const res = await fetch(`http://localhost:3000/api/user/${storedUser.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username,
        Pnome: Pnome,
        Unome: Unome,
        currentPassword,
        newPassword
      }),
    });

    const updatedUser = await res.json();

    setUser(updatedUser);

    localStorage.setItem("user", JSON.stringify({
      ...storedUser,
      username: updatedUser.username
    }));

    toast.success("Perfil atualizado com sucesso!");

    navigate("/dashboard");
  } catch (err) {
    console.error(err);
    toast.error("Erro ao atualizar");
  }
};

  const handleLogout = () => {
  localStorage.removeItem("user"); 
  navigate("/");
  toast.success("Sessão terminada");
};

const pontosTotais = user?.pontosTotais || 0;
const recorde = user?.recorde || 0;
const jogosGanhos = user?.jogosGanhos || 0;
const respostasCorretas = user?.respostasCorretas || 0;
const respostasErradas = user?.respostasErradas || 0;
const tempoJogo = user?.tempoJogo || 0;

const totalRespostas = respostasCorretas + respostasErradas;

const percentagemCorretas =
  totalRespostas > 0
    ? Math.round((respostasCorretas / totalRespostas) * 100)
    : 0;

const percentagemErradas =
  totalRespostas > 0
    ? Math.round((respostasErradas / totalRespostas) * 100)
    : 0;

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
                <h3 className="text-xl font-bold text-slate-900">{Pnome} {Unome}</h3>
                <p className="text-sm text-slate-500 mb-4">Membro desde Out. 2025</p>
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
                    <Input value={Pnome} onChange={(e) => setPnome(e.target.value)} />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-slate-700">Apelido</label>
                    <Input value={Unome} onChange={(e) => setUnome(e.target.value)} />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-slate-700">Nome de Utilizador</label>
                  <Input value={username} onChange={(e) => setUsername(e.target.value)} />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-slate-700">Email Académico</label>
                  <Input
  value={user?.email || ""}
  disabled
  className="bg-slate-50 text-slate-500"
/>
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
                  <Input type="password" value={currentPassword} onChange={(e) => setCurrentPassword(e.target.value)} placeholder="••••••••" />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-slate-700">Nova Palavra-passe</label>
                    <Input type="password" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-slate-700">Confirmar Nova</label>
                    <Input type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
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
