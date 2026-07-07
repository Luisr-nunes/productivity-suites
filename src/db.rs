use mongodb::{options::ClientOptions, Client, Database};
use std::env;
use std::sync::Arc;

pub async fn establish_connection() -> Arc<Database> {
    let client_uri = env::var("MONGODB_URI").unwrap_or_else(|_| "mongodb://127.0.0.1:27017".to_string());
    
    let mut options = ClientOptions::parse(&client_uri).await.expect("Erro ao parsear URI do MongoDB");
    options.app_name = Some("ProductivitySuites".to_string());
    
    let client = Client::with_options(options).expect("Erro ao inicializar cliente do MongoDB");
    println!("Conexão com o banco de dados MongoDB estabelecida com sucesso!");
    
    Arc::new(client.database("productivity_suites"))
}
