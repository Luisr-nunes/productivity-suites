use axum::{extract::{Multipart, State, Path}, http::StatusCode, response::IntoResponse, Json};
use mongodb::{bson::doc, Database};
use serde_json::json;
use std::sync::Arc;
use uuid::Uuid;
use crate::models::transcription::{Transcription, TranscriptionResponse};

pub async fn upload_audio(
    State(db): State<Arc<Database>>,
    mut multipart: Multipart,
) -> impl IntoResponse {
    let mut filename = "audio.wav".to_string();
    let mut audio_bytes = None;

    while let Ok(Some(field)) = multipart.next_field().await {
        if field.name() == Some("file") {
            if let Some(name) = field.file_name() {
                filename = name.to_string();
            }
            if let Ok(bytes) = field.bytes().await {
                audio_bytes = Some(bytes);
            }
        }
    }

    if audio_bytes.is_none() {
        return (StatusCode::BAD_REQUEST, Json(json!({"error": "No file uploaded"})));
    }

    let id = Uuid::new_v4().to_string();
    
    // Simulate transcription for now
    let content = "Simulação de transcrição: O áudio foi processado com sucesso. (Integração com Whisper seria feita aqui)".to_string();

    let transcription = Transcription {
        id: id.clone(),
        filename: filename.clone(),
        status: "completed".to_string(),
        content: Some(content.clone()),
        language: None,
        created_at: bson::DateTime::now(),
    };

    let collection = db.collection::<Transcription>("transcriptions");
    if let Err(_) = collection.insert_one(&transcription).await {
        return (StatusCode::INTERNAL_SERVER_ERROR, Json(json!({"error": "Database error"})));
    }

    let response = TranscriptionResponse {
        id,
        filename,
        status: "completed".to_string(),
        content: Some(content),
    };

    (StatusCode::CREATED, Json(json!(response)))
}

pub async fn list_transcriptions(
    State(db): State<Arc<Database>>,
) -> impl IntoResponse {
    use futures::stream::StreamExt;
    
    let collection = db.collection::<Transcription>("transcriptions");
    let mut cursor = match collection.find(doc! {}).await {
        Ok(cursor) => cursor,
        Err(_) => return (StatusCode::INTERNAL_SERVER_ERROR, Json(json!({"error": "Database error"}))),
    };

    let mut transcriptions = Vec::new();
    while let Some(result) = cursor.next().await {
        if let Ok(t) = result {
            transcriptions.push(TranscriptionResponse {
                id: t.id,
                filename: t.filename,
                status: t.status,
                content: t.content,
            });
        }
    }

    (StatusCode::OK, Json(json!(transcriptions)))
}

pub async fn get_transcription(
    State(db): State<Arc<Database>>,
    Path(id): Path<String>,
) -> impl IntoResponse {
    let collection = db.collection::<Transcription>("transcriptions");
    
    match collection.find_one(doc! { "id": id }).await {
        Ok(Some(t)) => {
            let response = TranscriptionResponse {
                id: t.id,
                filename: t.filename,
                status: t.status,
                content: t.content,
            };
            (StatusCode::OK, Json(json!(response)))
        }
        Ok(None) => (StatusCode::NOT_FOUND, Json(json!({"error": "Not found"}))),
        Err(_) => (StatusCode::INTERNAL_SERVER_ERROR, Json(json!({"error": "Database error"}))),
    }
}
