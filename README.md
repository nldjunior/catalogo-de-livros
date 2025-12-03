# 📚 Catálogo de Livros - Minha SPA com React

Olá! Este é o projeto final da 2ª unidade. A ideia aqui foi pegar aquele catálogo simples que fiz antes e transformá-lo em uma **Single Page Application (SPA)** completa e funcional.

---

## 🛠 O que eu usei para construir

Para colocar tudo de pé, utilizei as seguintes tecnologias:

* **React (Vite):** A base de tudo.
* **React Router DOM (v6):** Para criar a navegação entre as páginas sem recarregar o site.
* **CSS Variables:** Para criar o sistema de temas (Light/Dark) de um jeito leve, sem precisar de bibliotecas pesadas.
* **Context API:** Para que o tema escolhido funcione na aplicação inteira.
* **LocalStorage:** Para garantir que você não perca seus livros cadastrados ao fechar a aba.

---

## Como rodar


1.  **Baixe o projeto** (clone ou download do zip).
2.  Abra o terminal na pasta do projeto.
3.  Instale as dependências com o comando:
    ```bash
    npm install
    ```
4.  Inicie o servidor local:
    ```bash
    npm run dev
    ```
5.  Abrir o link que aparecer (geralmente `http://localhost:5173`).

---

## 📝Código 

Aqui explico como apliquei cada conceito que foi pedido na aula:

### 1. Rotas e Navegação (React Router)
Em vez de usar condicionais para mostrar/esconder telas, configurei o roteamento no arquivo `src/App.jsx`.
* Criei uma estrutura onde o `MainLayout` abraça as outras páginas.
* Até a rota de "Página não encontrada" (404) foi configurada para evitar erros.

### 2. Navegação via Código (`useNavigate`)
Usei esse hook para criar redirecionamentos mais inteligentes, e não apenas links estáticos.
* **No Home:** O botão "Acessar Catálogo" te leva para a lista via função.
* **Nos Detalhes:** Ao clicar para ver um livro, uso o navigate para montar a URL.
* **Botão Voltar:** Implementei um `Maps(-1)` que age como o botão de "voltar" do navegador, melhorando muito a usabilidade.

### 3. URLs Dinâmicas (`useParams`)
Para que cada livro tenha sua própria página, usei rotas dinâmicas (`/livro/:id`).
* No arquivo `LivroDetalhe.jsx`, o hook `useParams` lê o ID que está na URL e busca exatamente aquele livro na memória ou no JSON para exibir as informações.

### 4. Layout Inteligente (`Outlet`)
Para não repetir código (como o Cabeçalho e o Rodapé) em todos os arquivos, criei o `MainLayout.jsx`.
* Ele segura a estrutura fixa do site e usa o `<Outlet />` para "encaixar" o conteúdo da página que o usuário está acessando no momento.

### 5. Hook Personalizado (`useLocalStorage`)
Para deixar o código do componente mais limpo, isolei a lógica de salvar dados no `src/hooks/useLocalStorage.js`.
* Ele é usado tanto para lembrar o **Tema** que você escolheu quanto para salvar a **Lista de Livros** novos que você cadastra.

---
