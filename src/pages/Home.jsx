import React from "react";
import { useNavigate } from "react-router-dom";

function Home() {
  const navigate = useNavigate();

  function irParaCatalogo() {
    navigate("/catalogo");
  }

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h2>Bem-vindo ao Gerenciador de Livros</h2>
      <p>Organize suas leituras de forma simples e eficiente.</p>
      <br />
      <button onClick={irParaCatalogo} style={{ padding: "10px 20px", fontSize: "16px", cursor: "pointer" }}>
        Acessar Catálogo
      </button>
    </div>
  );
}

export default Home;