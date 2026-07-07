use axum::{extract::{State, Path}, http::StatusCode, response::{IntoResponse, Redirect}, Json};
use mongodb::{bson::doc, Database};
use rand::{distributions::Alphanumeric, Rng};
use std::sync::Arc;
use crate::models::link::{Link, CreateLinkRequest, LinkResponse};
use serde_json::json;

fn generate_short_code() -> String {
    rand::thread_rng()
        .sample_iter(&Alphanumeric)
        .take(6)
        .map(char::from)
        .collect()
}

pub async fn shorten_link(
    State(db): State<Arc<Database>>,
    Json(payload): Json<CreateLinkRequest>,
) -> impl IntoResponse {
    let collection = db.collection::<Link>("links");
    
    let short_code = generate_short_code();
    
    let link = Link {
        original_url: payload.url.clone(),
        short_code: short_code.clone(),
        created_at: bson::DateTime::now(),
    };
    
    match collection.insert_one(&link).await {
        Ok(_) => {
            let response = LinkResponse {
                original_url: payload.url,
                short_url: format!("http://localhost:3000/r/{}", short_code),
            };
            (StatusCode::CREATED, Json(json!(response)))
        }
        Err(_) => (StatusCode::INTERNAL_SERVER_ERROR, Json(json!({"error": "Failed to create short link"})))
    }
}

pub async fn redirect_link(
    State(db): State<Arc<Database>>,
    Path(short_code): Path<String>,
) -> impl IntoResponse {
    let collection = db.collection::<Link>("links");
    
    match collection.find_one(doc! { "short_code": short_code }).await {
        Ok(Some(link)) => Redirect::temporary(&link.original_url).into_response(),
        Ok(None) => (StatusCode::NOT_FOUND, "Link not found").into_response(),
        Err(_) => (StatusCode::INTERNAL_SERVER_ERROR, "Database error").into_response(),
    }
}
