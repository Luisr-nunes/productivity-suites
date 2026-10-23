# Productivity Suites

<!-- badges -->
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=flat-square&logo=javascript&logoColor=black) ![Rust](https://img.shields.io/badge/Rust-000000?style=flat-square&logo=rust&logoColor=white) ![CSS3](https://img.shields.io/badge/CSS3-663399?style=flat-square&logo=css&logoColor=white) ![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=flat-square&logo=html5&logoColor=white) ![Axum](https://img.shields.io/badge/Axum-4A4A4A?style=flat-square) ![Tokio](https://img.shields.io/badge/Tokio-4A4A4A?style=flat-square) ![MongoDB](https://img.shields.io/badge/MongoDB-47A248?style=flat-square&logo=mongodb&logoColor=white) ![React](https://img.shields.io/badge/React-61DAFB?style=flat-square&logo=react&logoColor=black) ![Vite](https://img.shields.io/badge/Vite-646CFF?style=flat-square&logo=vite&logoColor=white)

[Read in English](README.en.md)

Plataforma full-stack que reúne micro-ferramentas do dia a dia em uma única aplicação: encurtador de links, analisador de senhas e transcrições de áudio. Back-end em Rust com Axum e MongoDB, front-end em React servido pelo próprio binário.

## Sobre

O projeto unifica em um só serviço ideias que começaram em repositórios separados ([link-shortener](https://github.com/Luisr-nunes/link-shortener), [c-password-analyzer](https://github.com/Luisr-nunes/c-password-analyzer) e [transcritor_de_audio](https://github.com/Luisr-nunes/transcritor_de_audio)). Toda a lógica roda de forma assíncrona em Rust, sem chamar binários externos, e o servidor entrega tanto a API quanto a interface.

## Funcionalidades

| Ferramenta | O que faz |
| --- | --- |
| Encurtador de links | Gera códigos curtos, redireciona em `/r/{código}` e grava os links no MongoDB |
| Analisador de senhas | Avalia a força de uma senha por comprimento e variedade de caracteres, implementado em Rust |
| Transcrições | Recebe o upload de um áudio, registra a transcrição e permite listar e consultar cada uma; o texto ainda é simulado, sem integração com o Whisper |
| Painel | Interface React com navegação entre as ferramentas |

## Tecnologias

| Camada | Tecnologia |
| --- | --- |
| Back-end | Rust (edição 2024), Axum 0.8, Tokio, `tower-http` (arquivos estáticos e CORS) |
| Banco | MongoDB (driver oficial `mongodb` 3) |
| Front-end | React 19, Vite, React Router, Framer Motion, Lucide |
| Qualidade | Oxlint |

## Estrutura

```
productivity-suites/
├── src/
│   ├── main.rs          # rotas, CORS e servidor estático
│   ├── db.rs            # conexão com o MongoDB
│   ├── handlers/        # shortener, password, transcriber
│   └── models/          # link, transcription
├── frontend/
│   └── src/pages/       # Dashboard, Shortener, PasswordAnalyzer, Transcriber
└── Cargo.toml
```

## Como executar

Pré-requisitos: Rust, Node.js e MongoDB rodando localmente.

```bash
git clone https://github.com/Luisr-nunes/productivity-suites.git
cd productivity-suites

# 1. Compilar o front-end, que é servido pelo back-end
cd frontend
npm install
npm run build
cd ..

# 2. Subir o servidor
cargo run
```

Acesse `http://localhost:3000`. Por padrão, a conexão usa `mongodb://127.0.0.1:27017` e o banco `productivity_suites`; para outro endereço, defina `MONGODB_URI`.

## API

| Método | Rota | Descrição |
| --- | --- | --- |
| POST | `/api/shorten` | Cria um link curto |
| GET | `/r/{short_code}` | Redireciona para a URL original |
| POST | `/api/analyze-password` | Analisa a força de uma senha |
| POST | `/api/transcriptions/upload` | Envia um áudio (multipart, campo `file`) |
| GET | `/api/transcriptions` | Lista transcrições |
| GET | `/api/transcriptions/{id}` | Detalha uma transcrição |

## Autor

Luís Nunes — [GitHub](https://github.com/Luisr-nunes) · [LinkedIn](https://www.linkedin.com/in/luis-nunes-dev/)
