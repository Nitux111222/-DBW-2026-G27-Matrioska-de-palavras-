import React from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { Button } from "../components/ui/Button";
import { Avatar } from "../components/ui/avatarRadix";
import { Layers } from "lucide-react";

export function MainLayout({ children, isAuthenticated = false }) {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans text-slate-900">
      <header className="sticky top-0 z-50 w-full border-b border-slate-200 bg-white/80 backdrop-blur">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <Link to={location.pathname === "/" ? "/" : "/dashboard"} className="flex items-center gap-2 text-blue-800">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="h-6 w-6"
            >
              <path d="M15.5 11.5c1.5-1.5 2.5-3.5 2.5-5.5C18 3 15 2 12 2S6 3 6 6c0 2 1 4 2.5 5.5C6.5 13.5 5 17 5 20c0 1.5 3 2 7 2s7-.5 7-2c0-3-1.5-6.5-3.5-8.5z" />
              <circle cx="12" cy="7" r="2" />
            </svg>
            <span className="font-bold text-xl tracking-tight">Matrioska</span>
          </Link>

          <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-slate-600">
            <a href="/#concept" className="hover:text-blue-800 transition-colors">
              Conceito
            </a>
            <a href="/#modes" className="hover:text-blue-800 transition-colors">
              Modos de Jogo
            </a>
          </nav>

          <div className="flex items-center gap-3">
            {isAuthenticated ? (
              <div
                className="cursor-pointer hover:opacity-80 transition-opacity"
                onClick={() => navigate("/dashboard")}
              >
                <Avatar
                  src="https://images.unsplash.com/photo-1544717305-2782549b5136?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzdHVkZW50JTIwcG9ydHJhaXR8ZW58MXx8fHwxNzczMjE4NzU0fDA&ixlib=rb-4.1.0&q=80&w=1080"
                  size="md"
                  className="border-2 border-slate-200"
                  onClick={() => navigate("/profile")}
                />
              </div>
            ) : (
              <>
                <Button variant="ghost" onClick={() => navigate("/login")}>
                  Entrar
                </Button>
                <Button onClick={() => navigate("/register")}>
                  Criar Conta
                </Button>
              </>
            )}
          </div>
        </div>
      </header>

      <main className="flex-1 flex flex-col">{children}</main>

      <footer className="bg-white border-t border-slate-200 py-8">
        <div className="container mx-auto px-4 text-center text-slate-500 text-sm">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Layers className="h-5 w-5 text-blue-800/50" />
            <span className="font-semibold text-slate-700">Matrioska</span>
          </div>
          <p>Projeto de Desenvolvimento Baseado na Web</p>
          <p className="mt-2">© 2026 Matrioska. Todos os direitos reservados.</p>
        </div>
      </footer>
    </div>
  );
}

export function GameLayout({ children }) {
  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans text-slate-900">
      <header className="w-full border-b border-slate-200 bg-white">
        <div className="container mx-auto px-4 h-14 flex items-center justify-between">
          <Link to="/dashboard" className="flex items-center gap-2 text-blue-800">
            <Layers className="h-5 w-5" />
            <span className="font-bold text-lg tracking-tight">Matrioska</span>
          </Link>

          <div className="flex items-center gap-4">
            <span className="text-sm font-medium bg-blue-50 text-blue-800 px-3 py-1 rounded-full">
              Modo Online
            </span>
          </div>
        </div>
      </header>

      <main className="flex-1 flex flex-col h-[calc(100vh-56px)] overflow-hidden">
        {children}
      </main>
    </div>
  );
}