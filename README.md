<div align="center">
  # Productivity Suites ⚡
  
  **Um conjunto unificado de ferramentas de produtividade e utilitários.**
  
  [![Rust](https://img.shields.io/badge/Rust-1.70+-orange.svg)](https://www.rust-lang.org/)
  [![Axum](https://img.shields.io/badge/Axum-0.8-blue.svg)](https://github.com/tokio-rs/axum)
  [![React](https://img.shields.io/badge/React-18-61DAFB.svg?logo=react)](https://react.dev/)
  [![MongoDB](https://img.shields.io/badge/MongoDB-Native-47A248.svg?logo=mongodb)](https://www.mongodb.com/)
  
  <br/>
</div>

<br/>

**Productivity Suites** é uma plataforma full-stack desenvolvida com um backend de altíssimo desempenho em **Rust** (usando o framework Axum) e um frontend interativo em **React**. Ela unifica várias micro-ferramentas do dia a dia em uma única aplicação rápida e resiliente.

O projeto foi modernizado recentemente para abandonar integrações lentas com binários externos (C) e rodar puramente na arquitetura assíncrona do Rust, oferecendo performance máxima e proteção contra negação de serviço.

---

## ✨ Funcionalidades Principais

* 🔗 **Encurtador de Links**: Crie URLs curtas, rastreáveis e redirecionamento rápido integrado ao MongoDB.
* 🔐 **Analisador de Senhas**: Avalie a força da sua senha instantaneamente com regras baseadas em comprimento e variedade de caracteres (implementado 100% nativamente em Rust).
* 🎙️ **Transcritor de Áudio**: Faça upload de áudios e gerencie transcrições.
* 🎨 **Interface Unificada**: Frontend em React (via Vite) distribuído diretamente pelo próprio binário do Rust de forma estática!

---

## 🚀 Como Executar o Projeto (Para Devs)

### Pré-requisitos
- **Rust** (cargo, rustc).
- **Node.js** (npm) para construir o frontend.
- **MongoDB** (Rodando localmente na porta padrão ou via configuração no `.env`).

### Passo 1: Preparar o Frontend

O servidor Rust é configurado para servir os arquivos estáticos compilados do React. Portanto, precisamos "buildar" o frontend primeiro.

```bash
cd frontend
npm install
npm run build
cd ..
```

### Passo 2: Rodar o Backend em Rust

Após gerar a pasta `frontend/dist`, o backend estará pronto para servir tanto as APIs em `/api/*` quanto a interface principal.

```bash
# Baixa as dependências do Rust e inicia o servidor na porta 3000
cargo run
```

Acesse `http://localhost:3000` no seu navegador!

---

## 🛠️ Arquitetura e Tecnologias

- **Backend:** Escrito em Rust com `Axum` e `Tokio` para I/O assíncrono hiperveloz.
- **Banco de Dados:** Conexão assíncrona com `MongoDB` usando o driver oficial (`mongodb`).
- **Frontend:** React + Vite, com `framer-motion` para animações fluidas e `lucide-react` para iconografia.

---

## 🤝 Contribuindo

Sinta-se livre para abrir **Issues** relatando bugs ou sugerindo novos pequenos utilitários para a suíte, ou envie um **Pull Request** se quiser melhorar o código!

<div align="center">
  <br/>
  Feito com ⚡ e ☕.
</div>