use axum::{extract::State, http::StatusCode, response::IntoResponse, Json};
use mongodb::Database;
use serde::{Deserialize, Serialize};
use std::sync::Arc;

#[derive(Deserialize)]
pub struct AnalyzePasswordRequest {
    pub password: String,
}

#[derive(Serialize)]
pub struct PasswordAnalysisResponse {
    pub length: usize,
    pub has_uppercase: bool,
    pub has_lowercase: bool,
    pub has_number: bool,
    pub has_special: bool,
    pub score: u8,
    pub strength: String,
    pub suggestions: Vec<String>,
}

fn analyze(pw: &str) -> PasswordAnalysisResponse {
    let length = pw.chars().count();
    
    let has_uppercase = pw.chars().any(|c| c.is_uppercase());
    let has_lowercase = pw.chars().any(|c| c.is_lowercase());
    let has_number = pw.chars().any(|c| c.is_numeric());
    let has_special = pw.chars().any(|c| !c.is_alphanumeric());

    let mut score = 0;
    if length >= 8 { score += 1; }
    if length >= 12 { score += 1; }
    if length >= 16 { score += 1; }
    if has_uppercase { score += 1; }
    if has_lowercase { score += 1; }
    if has_number { score += 1; }
    if has_special { score += 2; }

    let strength = match score {
        0..=2 => "FRACA",
        3..=4 => "MÉDIA",
        5..=6 => "FORTE",
        _ => "MUITO FORTE",
    };

    let mut suggestions = Vec::new();
    if length < 12 { suggestions.push("Aumente para pelo menos 12 caracteres.".to_string()); }
    if !has_uppercase { suggestions.push("Adicione pelo menos uma letra maiúscula.".to_string()); }
    if !has_lowercase { suggestions.push("Adicione pelo menos uma letra minúscula.".to_string()); }
    if !has_number { suggestions.push("Inclua pelo menos um número.".to_string()); }
    if !has_special { suggestions.push("Use caracteres especiais como !@#$%^&*.".to_string()); }
    if suggestions.is_empty() { suggestions.push("Nenhuma sugestão — sua senha está excelente!".to_string()); }

    PasswordAnalysisResponse {
        length,
        has_uppercase,
        has_lowercase,
        has_number,
        has_special,
        score,
        strength: strength.to_string(),
        suggestions,
    }
}

pub async fn analyze_password(
    State(_db): State<Arc<Database>>,
    Json(payload): Json<AnalyzePasswordRequest>,
) -> impl IntoResponse {
    let response = analyze(&payload.password);
    (StatusCode::OK, Json(response))
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn test_weak_password() {
        let result = analyze("12345");
        assert_eq!(result.score, 1); // Only receives points for has_number = true (1 point). Length < 8.
        assert_eq!(result.strength, "FRACA");
    }

    #[test]
    fn test_password_with_utf8_and_emoji() {
        let result = analyze("SenhaSegura123!🚀");
        assert_eq!(result.has_special, true); // ! and emoji are not alphanumeric
        assert!(result.score >= 5);
        assert!(result.strength == "FORTE" || result.strength == "MUITO FORTE");
    }
}
