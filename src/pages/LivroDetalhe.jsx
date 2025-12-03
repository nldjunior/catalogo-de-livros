import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
// 1. Importamos o hook do tema para saber se está escuro ou claro
import { useTheme } from "../context/ThemeContext"; 

function LivroDetalhe() {
  const { id } = useParams();
  const navigate = useNavigate();
  // 2. Pegamos o tema atual ('light' ou 'dark')
  const { theme } = useTheme(); 
  
  const [livro, setLivro] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Busca no LocalStorage
    const dadosSalvos = localStorage.getItem("my-books");
    
    if (dadosSalvos) {
      const listaLivros = JSON.parse(dadosSalvos);
      // Conversão para String para garantir a comparação
      const encontrado = listaLivros.find((b) => String(b.id) === String(id));
      
      if (encontrado) {
        setLivro(encontrado);
        setLoading(false);
        return;
      }
    }

    // Busca no JSON (fallback)
    fetch("/books.json")
        .then(res => res.json())
        .then(data => {
            const encontrado = data.find((b) => String(b.id) === String(id));
            setLivro(encontrado);
        })
        .catch(err => console.error(err))
        .finally(() => setLoading(false));

  }, [id]);

  if (loading) return <p style={{ padding: "20px" }}>Carregando detalhes...</p>;

  if (!livro) {
    return (
      <div style={{ padding: "20px" }}>
        <h2>Livro não encontrado</h2>
        <button onClick={() => navigate("/catalogo")}>Voltar ao Catálogo</button>
      </div>
    );
  }

  // 3. Definimos estilos dinâmicos baseados no tema
  const cardStyle = {
    border: theme === "light" ? "1px solid #ccc" : "1px solid #555",
    padding: "30px",
    borderRadius: "8px",
    boxShadow: "0 4px 8px rgba(0,0,0,0.2)",
    // Se for light, fundo branco. Se for dark, fundo cinza escuro (mas diferente do fundo da página)
    backgroundColor: theme === "light" ? "#fff" : "#333", 
    color: theme === "light" ? "#000" : "#fff",
    transition: "all 0.3s ease"
  };

  const sinopseStyle = {
    marginTop: "20px", 
    padding: "15px", 
    // Fundo da sinopse muda para não ficar invisível no escuro
    backgroundColor: theme === "light" ? "rgba(0,0,0, 0.05)" : "rgba(255,255,255, 0.1)", 
    borderRadius: "5px"
  };

  return (
    <div style={{ padding: "20px", maxWidth: "600px", margin: "0 auto" }}>
      <button 
        onClick={() => navigate(-1)} 
        style={{ marginBottom: "20px", cursor: "pointer", padding: "8px 15px" }}
      >
        &larr; Voltar
      </button>

      {/* Aplicamos o estilo dinâmico aqui */}
      <div style={cardStyle}>
        <h1 style={{ marginTop: 0 }}>{livro.title}</h1>
        
        <hr style={{ borderColor: theme === "light" ? "#ccc" : "#555" }} />
        
        <div style={{ lineHeight: "1.8" }}>
            <p><strong>Autor:</strong> {livro.author}</p>
            <p><strong>Ano de Lançamento:</strong> {livro.year}</p>
            <p style={{ fontSize: "0.8em", opacity: 0.7 }}>ID: {livro.id}</p>
        </div>

        {/* Aplicamos o estilo da sinopse aqui */}
        <div style={sinopseStyle}>
            <h3>Sobre a obra</h3>
            <p>
              O livro <strong>"{livro.title}"</strong>, escrito por {livro.author}, 
              é uma excelente adição ao seu catálogo pessoal.
            </p>
        </div>
      </div>
    </div>
  );
}

export default LivroDetalhe;