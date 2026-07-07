use serde::{Deserialize, Serialize};
use uuid::Uuid;

#[derive(Debug, Serialize, Deserialize)]
pub struct Transcription {
    pub id: String,
    pub filename: String,
    pub status: String,
    pub content: Option<String>,
    pub language: Option<String>,
    pub created_at: bson::DateTime,
}

#[derive(Debug, Serialize, Deserialize)]
pub struct TranscriptionResponse {
    pub id: String,
    pub filename: String,
    pub status: String,
    pub content: Option<String>,
}
