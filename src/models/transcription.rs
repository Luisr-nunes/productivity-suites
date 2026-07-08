use serde::{Deserialize, Serialize};

#[derive(Debug, Serialize, Deserialize)]
pub struct Transcription {
    pub id: String,
    pub filename: String,
    pub status: String,
    pub content: Option<String>,
    pub language: Option<String>,
    pub created_at: mongodb::bson::DateTime,
}

#[derive(Debug, Serialize, Deserialize)]
pub struct TranscriptionResponse {
    pub id: String,
    pub filename: String,
    pub status: String,
    pub content: Option<String>,
}
