# Catálogo de Livros – React + Hooks

Projeto feito por Nildo Junior.

---

## 🚀 Como rodar o projeto

1. Instale as dependências:
```bash
npm install
```

2. Execute o projeto em modo de desenvolvimento:
```bash
npm run dev
```

3. Acesse no navegador:
```bash
http://localhost:5173
```

# Decisões do projeto
1. A lista inicial de livros é carregada de public/books.json usando useEffect.
2. O campo de busca usa useRef para focar automaticamente ao abrir a página.
3. A busca filtra por título ou autor em tempo real.
4. O tema Claro/Escuro foi implementado com Context API e persistido com o hook customizado useLocalStorage.
5. O hook useLocalStorage também é usado para manter o valor da busca salvo.
6. O formulário é controlado com useState, e impede adicionar livros com campos vazios.
