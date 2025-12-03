import React, { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useLocalStorage } from "../hooks/useLocalStorage"; // Importe o hook

function Catalogo() {
  const navigate = useNavigate();

  // MUDANÇA 1: Usamos useLocalStorage em vez de useState para os livros
  // A chave será "my-books"
  const [books, setBooks] = useLocalStorage("my-books", []); 
  
  const [search, setSearch] = useLocalStorage("search", "");
  const [loading, setLoading] = useState(false); // Começa false pois já tenta carregar do storage
  const [error, setError] = useState("");

  const titleRef = useRef(null);
  const searchRef = useRef(null);

  const [newBook, setNewBook] = useState({ title: "", author: "", year: "" });

  // MUDANÇA 2: O useEffect agora só busca o JSON se a lista local estiver vazia
  useEffect(() => {
    if (books.length === 0) {
      setLoading(true);
      fetch("/books.json")
        .then((res) => {
          if (!res.ok) throw new Error("Erro ao carregar dados.");
          return res.json();
        })
        .then((data) => setBooks(data)) // Isso vai salvar automaticamente no LocalStorage
        .catch(() => setError("Erro ao carregar livros."))
        .finally(() => setLoading(false));
    }
  }, []); // Roda apenas na montagem

  useEffect(() => {
    searchRef.current?.focus();
  }, []);

  function handleAddBook(e) {
    e.preventDefault();
    if (!newBook.title || !newBook.author || !newBook.year) return;

    setBooks((prev) => [
      ...prev,
      { id: Date.now(), ...newBook }
    ]);
    setNewBook({ title: "", author: "", year: "" });
    titleRef.current.focus();
  }

  function handleRemove(id) {
    setBooks(books.filter((b) => b.id !== id));
  }

  const filtered = books.filter(
    (b) =>
      b.title.toLowerCase().includes(search.toLowerCase()) ||
      b.author.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div>
      <div>
        <strong>Buscar: </strong>
        <input
          ref={searchRef}
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      <hr />

      <h3>Novo Livro</h3>
      <form onSubmit={handleAddBook}>
        <input
          ref={titleRef}
          placeholder="Título"
          value={newBook.title}
          onChange={(e) => setNewBook({ ...newBook, title: e.target.value })}
        />
        <input
          placeholder="Autor"
          value={newBook.author}
          onChange={(e) => setNewBook({ ...newBook, author: e.target.value })}
        />
        <input
          placeholder="Ano"
          type="number"
          value={newBook.year}
          onChange={(e) => setNewBook({ ...newBook, year: e.target.value })}
        />
        <button type="submit">Adicionar</button>
      </form>

      <hr />

      {loading && <p>Carregando...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}

      <h3>Lista de Livros</h3>
      {filtered.length === 0 && !loading && <p>Nenhum livro encontrado.</p>}

      <ul style={{ listStyle: "none", padding: 0 }}>
        {filtered.map((book) => (
          <li 
            key={book.id} 
            style={{ 
              marginBottom: "15px", 
              borderBottom: "1px solid #ccc", 
              paddingBottom: "10px",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center"
            }}
          >
            <span>
               <strong>{book.title}</strong> — {book.author} ({book.year})
            </span>
            <div>
                <button onClick={() => navigate(`/livro/${book.id}`)}>
                    Detalhes
                </button>
                <button 
                    onClick={() => handleRemove(book.id)} 
                    style={{ marginLeft: "10px", backgroundColor: "#ffcccc", color: "#330000" }}
                >
                    Remover
                </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Catalogo;