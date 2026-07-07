use axum::{extract::State, http::StatusCode, response::IntoResponse, Json};
use mongodb::Database;
use serde::{Deserialize, Serialize};
use std::sync::Arc;
use std::process::{Command, Stdio};
use std::io::Write;
use serde_json::json;

#[derive(Deserialize)]
pub struct AnalyzePasswordRequest {
    pub password: String,
}

#[derive(Serialize)]
pub struct AnalyzePasswordResponse {
    pub output: String,
}

pub async fn analyze_password(
    State(_db): State<Arc<Database>>,
    Json(payload): Json<AnalyzePasswordRequest>,
) -> impl IntoResponse {
    
    // Caminho para o executável do analisador C.
    // O executável deve estar na pasta raiz do projeto.
    let mut child = match Command::new("./analisador.exe")
        .stdin(Stdio::piped())
        .stdout(Stdio::piped())
        .spawn() {
            Ok(child) => child,
            Err(e) => return (StatusCode::INTERNAL_SERVER_ERROR, Json(json!({"error": format!("Failed to spawn analyzer: {}", e)}))),
        };

    if let Some(mut stdin) = child.stdin.take() {
        if let Err(e) = stdin.write_all(format!("{}\n", payload.password).as_bytes()) {
            return (StatusCode::INTERNAL_SERVER_ERROR, Json(json!({"error": format!("Failed to write to stdin: {}", e)})));
        }
    }

    let output = match child.wait_with_output() {
        Ok(output) => output,
        Err(e) => return (StatusCode::INTERNAL_SERVER_ERROR, Json(json!({"error": format!("Failed to read stdout: {}", e)}))),
    };

    let result_str = String::from_utf8_lossy(&output.stdout).to_string();

    (StatusCode::OK, Json(json!({
        "output": result_str
    })))
}
