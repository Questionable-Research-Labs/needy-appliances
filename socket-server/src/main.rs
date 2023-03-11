use actix_web::{middleware::Logger, web::Data, App, HttpServer};
use env_logger::Env;
use mqtt::MQTT;
use std::net::Ipv4Addr;

mod mqtt;
mod public;
mod socket;

#[actix_web::main]
async fn main() -> std::io::Result<()> {
    // Initialize logging
    env_logger::init_from_env(Env::default().default_filter_or("debug"));

    // Initialize MQTT
    let rx = MQTT::init().await;
    let rx = Data::new(rx);

    // Start the server
    HttpServer::new(move || {
        let rx = rx.clone();

        App::new()
            .wrap(Logger::default())
            .app_data(rx)
            .configure(socket::configure)
            .configure(public::configure)
    })
    .bind((Ipv4Addr::UNSPECIFIED, 80))?
    .run()
    .await
}
