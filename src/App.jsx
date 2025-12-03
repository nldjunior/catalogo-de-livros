import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import MainLayout from "./layouts/MainLayout";
import Home from "./pages/Home";
import Catalogo from "./pages/Catalogo";
import LivroDetalhe from "./pages/LivroDetalhe";
import NotFound from "./pages/NotFound";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Rota Pai com o Layout */}
        <Route path="/" element={<MainLayout />}>
          
          {/* Rota Index (Home) */}
          <Route index element={<Home />} />
          
          {/* Rota Catálogo */}
          <Route path="catalogo" element={<Catalogo />} />
          
          {/* Rota Dinâmica (Detalhes) */}
          <Route path="livro/:id" element={<LivroDetalhe />} />
          
          {/* Rota 404 - Qualquer coisa não definida cai aqui */}
          <Route path="*" element={<NotFound />} />
          
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;