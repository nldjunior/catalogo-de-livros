import React from "react";
import { useEffect, useState, useRef } from "react";
import { useLocalStorage } from "./hooks/useLocalStorage";
import { useTheme } from "./context/ThemeContext";

function App() {
  const { theme, toggleTheme } = useTheme();

  const [books, setBooks] = useState([]);
  const [search, setSearch] = useLocalStorage("search", "");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const titleRef = useRef(null);
  const searchRef = useRef(null);

  const [newBook, setNewBook] = useState({
    title: "",
    author: "",
    year: ""
  });

  useEffect(() => {
    fetch("/books.json")
      .then((res) => {
        if (!res.ok) throw new Error("Erro ao carregar dados.");
        return res.json();
      })
      .then((data) => setBooks(data))
      .catch(() =>
        setError("Ocorreu um problema ao carregar os livros. Tente novamente mais tarde.")
      )
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    searchRef.current?.focus();
  }, []);

  function handleAddBook(e) {
    e.preventDefault();

    if (!newBook.title || !newBook.author || !newBook.year) return;

    setBooks((prev) => [
      ...prev,
      {
        id: Date.now(),
        ...newBook
      }
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
    <div style={{ padding: "20px" }}>
      <h1>
        Catálogo de Livros
        <button onClick={toggleTheme}>
          Tema: {theme === "light" ? "Claro" : "Escuro"}
        </button>
      </h1>

      <hr />

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
      {error && (
        <p style={{ color: "red" }}>
          {error}
        </p>
      )}

      <h3>Lista</h3>

      {filtered.length === 0 && !loading && !error && (
        <p
          style={{
            marginTop: "10px",
            opacity: 0.8
          }}
        >
          Nenhum livro encontrado.
        </p>
      )}

      <ul>
        {filtered.map((book) => (
          <li key={book.id}>
            {book.title} — {book.author} ({book.year})
            <button onClick={() => handleRemove(book.id)}>Remover</button>
          </li>
        ))}
      </ul>

      <hr />

      <p>Total: {books.length} | Filtrados: {filtered.length}</p>
    </div>
  );
}

export default App;
