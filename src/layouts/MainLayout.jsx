import React from "react";
import { Outlet, Link } from "react-router-dom";
import { useTheme } from "../context/ThemeContext";

function MainLayout() {
  const { theme, toggleTheme } = useTheme();

  return (
    <div style={{ padding: "20px", minHeight: "100vh" }}>
      {/* Cabeçalho fixo para todas as telas */}
      <header style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px", borderBottom: "1px solid #ccc", paddingBottom: "10px" }}>
        <h1>Catálogo de Livros</h1>
        <div>
          <nav style={{ display: "inline-block", marginRight: "15px" }}>
            <Link to="/" style={{ marginRight: "10px" }}>Home</Link>
            <Link to="/catalogo">Catálogo</Link>
          </nav>
          <button onClick={toggleTheme}>
            Tema: {theme === "light" ? "Claro" : "Escuro"}
          </button>
        </div>
      </header>

      {/* O Outlet é onde as páginas filhas (Home, Catalogo, etc) serão renderizadas */}
      <main>
        <Outlet />
      </main>

      <footer style={{ marginTop: "50px", borderTop: "1px solid #ccc", paddingTop: "10px", textAlign: "center", fontSize: "0.8rem" }}>
        <p>© 2024 - Projeto SPA React</p>
      </footer>
    </div>
  );
}

export default MainLayout;