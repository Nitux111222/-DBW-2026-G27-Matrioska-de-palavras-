import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "../components/ui/Button";
import { Input } from "../components/ui/Input";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "../components/ui/Card";
import { Layers, ArrowLeft } from "lucide-react";
import { toast } from "sonner";

export function Login() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();

    if (!username || !password) {
      setError("Por favor preenche todos os campos.");
      return;
    }

    setIsLoading(true);
    setError("");

    setTimeout(() => {
      setIsLoading(false);

      if (username === "admin" && password === "admin") {
        toast.success("Bem-vindo de volta!");
        navigate("/dashboard");
      } else {
        setError("Credenciais incorretas. Tenta admin/admin para testar.");
      }
    }, 800);
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8 relative overflow-hidden">
      <div className="absolute -top-40 -right-40 w-96 h-96 bg-blue-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob"></div>
      <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-amber-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-2000"></div>

      <div className="sm:mx-auto sm:w-full sm:max-w-md relative z-10">
        <Link
          to="/"
          className="flex items-center justify-center gap-2 text-blue-800 mb-8 hover:opacity-80 transition-opacity"
        >
          <Layers className="h-8 w-8" />
          <span className="font-bold text-3xl tracking-tight">Matrioska</span>
        </Link>

        <Card className="shadow-lg border-slate-200">
          <CardHeader className="space-y-1 text-center">
            <CardTitle className="text-2xl">Iniciar Sessão</CardTitle>
            <CardDescription>
              Introduz as tuas credenciais para entrar no jogo
            </CardDescription>
          </CardHeader>

          <form onSubmit={handleLogin}>
            <CardContent className="space-y-4">
              {error && (
                <div className="bg-rose-50 text-rose-600 text-sm p-3 rounded-md border border-rose-200">
                  {error}
                </div>
              )}

              <div className="space-y-2">
                <label
                  className="text-sm font-medium leading-none text-slate-700"
                  htmlFor="username"
                >
                  Nome de Utilizador
                </label>
                <Input
                  id="username"
                  placeholder="ex: joaossilva"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  disabled={isLoading}
                />
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <label
                    className="text-sm font-medium leading-none text-slate-700"
                    htmlFor="password"
                  >
                    Palavra-passe
                  </label>
                  <a
                    href="#"
                    className="text-xs text-blue-600 hover:text-blue-800 hover:underline"
                  >
                    Esqueceste-te da password?
                  </a>
                </div>

                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  disabled={isLoading}
                />
              </div>
            </CardContent>

            <CardFooter className="flex flex-col space-y-4">
              <Button className="w-full" type="submit" disabled={isLoading}>
                {isLoading ? "A entrar..." : "Entrar na Conta"}
              </Button>

              <div className="text-center text-sm text-slate-500">
                Ainda não tens conta?{" "}
                <Link
                  to="/register"
                  className="text-blue-600 hover:text-blue-800 font-semibold hover:underline"
                >
                  Regista-te aqui
                </Link>
              </div>
            </CardFooter>
          </form>
        </Card>

        <div className="mt-8 text-center">
          <Link
            to="/"
            className="inline-flex items-center text-sm text-slate-500 hover:text-slate-900"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Voltar à página inicial
          </Link>
        </div>
      </div>
    </div>
  );
}