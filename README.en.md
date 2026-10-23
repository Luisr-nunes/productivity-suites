# Productivity Suites

<!-- badges -->
![Rust](https://img.shields.io/badge/Rust-000000?style=flat-square&logo=rust&logoColor=white) ![Axum](https://img.shields.io/badge/Axum-4A4A4A?style=flat-square) ![Tokio](https://img.shields.io/badge/Tokio-4A4A4A?style=flat-square) ![MongoDB](https://img.shields.io/badge/MongoDB-47A248?style=flat-square&logo=mongodb&logoColor=white) ![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=flat-square&logo=javascript&logoColor=black) ![React](https://img.shields.io/badge/React-61DAFB?style=flat-square&logo=react&logoColor=black) ![Vite](https://img.shields.io/badge/Vite-646CFF?style=flat-square&logo=vite&logoColor=white)

[Ler em Português](README.md)

A full-stack platform that brings everyday micro-tools into one application: link shortener, password analyzer and audio transcriptions. Rust back end with Axum and MongoDB, React front end served by the binary itself.

## About

The project merges into a single service ideas that started in separate repositories ([link-shortener](https://github.com/Luisr-nunes/link-shortener), [c-password-analyzer](https://github.com/Luisr-nunes/c-password-analyzer) and [transcritor_de_audio](https://github.com/Luisr-nunes/transcritor_de_audio)). All logic runs asynchronously in Rust, without calling external binaries, and the server delivers both the API and the UI.

## Features

| Tool | What it does |
| --- | --- |
| Link shortener | Generates short codes, redirects at `/r/{code}` and stores links in MongoDB |
| Password analyzer | Rates password strength by length and character variety, implemented in Rust |
| Transcriptions | Accepts an audio upload, records the transcription and lets you list and view each one; the text is still simulated, with no Whisper integration yet |
| Dashboard | React UI to navigate between the tools |

## Tech stack

| Layer | Technology |
| --- | --- |
| Back end | Rust (2024 edition), Axum 0.8, Tokio, `tower-http` (static files and CORS) |
| Database | MongoDB (official `mongodb` 3 driver) |
| Front end | React 19, Vite, React Router, Framer Motion, Lucide |
| Quality | Oxlint |

## Structure

```
productivity-suites/
├── src/
│   ├── main.rs          # routes, CORS and static server
│   ├── db.rs            # MongoDB connection
│   ├── handlers/        # shortener, password, transcriber
│   └── models/          # link, transcription
├── frontend/
│   └── src/pages/       # Dashboard, Shortener, PasswordAnalyzer, Transcriber
└── Cargo.toml
```

## Running

Requirements: Rust, Node.js and a local MongoDB.

```bash
git clone https://github.com/Luisr-nunes/productivity-suites.git
cd productivity-suites

# 1. Build the front end, which the back end serves
cd frontend
npm install
npm run build
cd ..

# 2. Start the server
cargo run
```

Open `http://localhost:3000`. By default it connects to `mongodb://127.0.0.1:27017` and the `productivity_suites` database; set `MONGODB_URI` to use another address.

## API

| Method | Route | Description |
| --- | --- | --- |
| POST | `/api/shorten` | Create a short link |
| GET | `/r/{short_code}` | Redirect to the original URL |
| POST | `/api/analyze-password` | Analyze a password's strength |
| POST | `/api/transcriptions/upload` | Upload an audio file (multipart, `file` field) |
| GET | `/api/transcriptions` | List transcriptions |
| GET | `/api/transcriptions/{id}` | Get one transcription |

## Author

Luís Nunes — [GitHub](https://github.com/Luisr-nunes) · [LinkedIn](https://www.linkedin.com/in/luis-nunes-dev/)
