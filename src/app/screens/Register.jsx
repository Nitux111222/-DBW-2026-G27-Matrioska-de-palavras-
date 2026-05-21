import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "../components/ui/Button";
import { Input } from "../components/ui/Input";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "../components/ui/Card";
import { Avatar } from "../components/ui/avatarRadix";
import { Layers, ArrowLeft, Upload } from "lucide-react";
import { toast } from "sonner";

export function Register() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });

    if (errors[e.target.id]) {
      setErrors({ ...errors, [e.target.id]: "" });
    }
  };

  const handleRegister = async (e) => {
  e.preventDefault();
  const newErrors = {};

  if (!formData.username) newErrors.username = "Obrigatório";
  if (!formData.email) newErrors.email = "Obrigatório";
  if (!formData.password) newErrors.password = "Obrigatório";
  if (formData.password !== formData.confirmPassword) {
    newErrors.confirmPassword = "As passwords não coincidem";
  }

  if (Object.keys(newErrors).length > 0) {
    setErrors(newErrors);
    return;
  }

  setIsLoading(true);

  try {
    const res = await fetch("http://localhost:3000/api/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: formData.username,
        email: formData.email,
        password: formData.password,
      }),
    });

    const data = await res.json();

    if (!res.ok) throw new Error(data.error);

    toast.success("Conta criada com sucesso!");
    navigate("/login");
  } catch (err) {
    toast.error(err.message);
  } finally {
    setIsLoading(false);
  }
};

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8 relative overflow-hidden">
      <div className="absolute -top-40 -left-40 w-96 h-96 bg-blue-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob"></div>
      <div className="absolute top-40 -right-40 w-96 h-96 bg-emerald-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-4000"></div>

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
            <CardTitle className="text-2xl">Criar Conta</CardTitle>
            <CardDescription>
              Junta-te aos teus colegas e começa a descascar palavras
            </CardDescription>
          </CardHeader>

          <form onSubmit={handleRegister}>
            <CardContent className="space-y-4">
              <div className="flex flex-col items-center justify-center mb-6">
                <div className="relative group cursor-pointer">
                  <Avatar
                    size="lg"
                    className="h-20 w-20 border-2 border-slate-200 border-dashed bg-slate-50"
                  />
                  <div className="absolute inset-0 flex items-center justify-center bg-black/40 rounded-full opacity-0 group-hover:opacity-100 transition-opacity">
                    <Upload className="h-6 w-6 text-white" />
                  </div>
                </div>
                <span className="text-xs text-slate-500 mt-2">
                  Adicionar foto de perfil
                </span>
              </div>

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
                  value={formData.username}
                  onChange={handleChange}
                  className={errors.username ? "border-rose-500" : ""}
                />
                {errors.username && (
                  <p className="text-xs text-rose-500">{errors.username}</p>
                )}
              </div>

              <div className="space-y-2">
                <label
                  className="text-sm font-medium leading-none text-slate-700"
                  htmlFor="email"
                >
                  Email Universitário
                </label>
                <Input
                  id="email"
                  type="email"
                  placeholder="ex: up123456789@up.pt"
                  value={formData.email}
                  onChange={handleChange}
                  className={errors.email ? "border-rose-500" : ""}
                />
                {errors.email && (
                  <p className="text-xs text-rose-500">{errors.email}</p>
                )}
              </div>

              <div className="space-y-2">
                <label
                  className="text-sm font-medium leading-none text-slate-700"
                  htmlFor="password"
                >
                  Palavra-passe
                </label>
                <Input
                  id="password"
                  type="password"
                  value={formData.password}
                  onChange={handleChange}
                  className={errors.password ? "border-rose-500" : ""}
                />
                {errors.password && (
                  <p className="text-xs text-rose-500">{errors.password}</p>
                )}
              </div>

              <div className="space-y-2">
                <label
                  className="text-sm font-medium leading-none text-slate-700"
                  htmlFor="confirmPassword"
                >
                  Confirmar Palavra-passe
                </label>
                <Input
                  id="confirmPassword"
                  type="password"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  className={errors.confirmPassword ? "border-rose-500" : ""}
                />
                {errors.confirmPassword && (
                  <p className="text-xs text-rose-500">
                    {errors.confirmPassword}
                  </p>
                )}
              </div>
            </CardContent>

            <CardFooter className="flex flex-col space-y-4">
              <Button
                className="w-full bg-emerald-600 hover:bg-emerald-700"
                type="submit"
                disabled={isLoading}
              >
                {isLoading ? "A criar conta..." : "Criar Conta"}
              </Button>

              <div className="text-center text-sm text-slate-500">
                Já tens uma conta?{" "}
                <Link
                  to="/login"
                  className="text-blue-600 hover:text-blue-800 font-semibold hover:underline"
                >
                  Inicia sessão
                </Link>
              </div>
            </CardFooter>
          </form>
        </Card>
      </div>
    </div>
  );
}