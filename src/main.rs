mod db;
mod handlers;
mod models;

use axum::{
    routing::{get, post},
    Router,
};
use std::net::SocketAddr;
use tower_http::{
    cors::CorsLayer,
    services::{ServeDir, ServeFile},
};
use tracing::info;

#[tokio::main]
async fn main() {
    // Inicializa os logs
    tracing_subscriber::fmt::init();

    // Conecta ao MongoDB
    let db = db::establish_connection().await;

    // Configuração do CORS
    let cors = CorsLayer::permissive();

    // Roteamento
    let app = Router::new()
        // API Encurtador de Links
        .route("/api/shorten", post(handlers::shortener::shorten_link))
        .route("/r/{short_code}", get(handlers::shortener::redirect_link))
        // API Analisador de Senhas
        .route("/api/analyze-password", post(handlers::password::analyze_password))
        // API Transcritor de Áudio
        .route("/api/transcriptions/upload", post(handlers::transcriber::upload_audio))
        .route("/api/transcriptions", get(handlers::transcriber::list_transcriptions))
        .route("/api/transcriptions/{id}", get(handlers::transcriber::get_transcription))
        // Estado compartilhado (MongoDB) e Middlewares
        .with_state(db)
        .layer(cors)
        // Arquivos Estáticos do Frontend (React Vite build path: frontend/dist)
        .nest_service("/", ServeDir::new("frontend/dist").fallback(ServeFile::new("frontend/dist/index.html")));

    let addr = SocketAddr::from(([127, 0, 0, 1], 3000));
    info!("Servidor unificado rodando em http://{}", addr);

    let listener = tokio::net::TcpListener::bind(addr).await.unwrap();
    axum::serve(listener, app).await.unwrap();
}
