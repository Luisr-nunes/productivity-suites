use serde::{Deserialize, Serialize};

#[derive(Debug, Serialize, Deserialize)]
pub struct Link {
    pub original_url: String,
    pub short_code: String,
    pub created_at: mongodb::bson::DateTime,
}

#[derive(Debug, Serialize, Deserialize)]
pub struct CreateLinkRequest {
    pub url: String,
}

#[derive(Debug, Serialize, Deserialize)]
pub struct LinkResponse {
    pub original_url: String,
    pub short_url: String,
}
