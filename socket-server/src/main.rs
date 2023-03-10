use actix::{Actor, Handler, MessageResult, StreamHandler};
use actix_web::{
    middleware::Logger,
    web::{self, Data},
    App, Error, HttpRequest, HttpResponse, HttpServer,
};
use actix_web_actors::ws::{self, WsResponseBuilder};
use env_logger::Env;
use mqtt::{init_mqtt, MQTTMessage};
use std::net::Ipv4Addr;
use tokio::sync::broadcast;

mod mqtt;

pub struct SocketActor;

impl Actor for SocketActor {
    type Context = ws::WebsocketContext<Self>;
}

/// Handler for ws::Message message
impl StreamHandler<Result<ws::Message, ws::ProtocolError>> for SocketActor {
    fn handle(&mut self, msg: Result<ws::Message, ws::ProtocolError>, ctx: &mut Self::Context) {
        match msg {
            Ok(ws::Message::Ping(msg)) => ctx.pong(&msg),
            Ok(ws::Message::Text(msg)) => ctx.text(msg),
            Ok(ws::Message::Binary(msg)) => ctx.binary(msg),
            _ => (),
        }
    }
}

impl Handler<MQTTMessage> for SocketActor {
    type Result = MessageResult<MQTTMessage>;

    fn handle(&mut self, msg: MQTTMessage, ctx: &mut Self::Context) -> Self::Result {
        if let Ok(json) = serde_json::to_string(&msg) {
            ctx.text(json);
        }

        MessageResult(())
    }
}

async fn ws(
    req: HttpRequest,
    stream: web::Payload,
    rx: Data<broadcast::Receiver<MQTTMessage>>,
) -> Result<HttpResponse, Error> {
    let mut rx = rx.resubscribe();
    let (addr, resp) = WsResponseBuilder::new(SocketActor {}, &req, stream).start_with_addr()?;

    tokio::spawn(async move {
        while let Ok(value) = rx.recv().await {
            let _ = addr.send(value).await;
        }
    });

    Ok(resp)
}

#[actix_web::main]
async fn main() -> std::io::Result<()> {
    env_logger::init_from_env(Env::default().default_filter_or("debug"));

    let (tx, rx) = broadcast::channel(12);

    tokio::spawn(init_mqtt(tx));

    rx.resubscribe();

    let rx = Data::new(rx);

    HttpServer::new(move || {
        let rx = rx.clone();

        App::new()
            .wrap(Logger::default())
            .app_data(rx)
            .route("/", web::get().to(HttpResponse::Ok))
            .route("/ws", web::get().to(ws))
    })
    .bind((Ipv4Addr::UNSPECIFIED, 80))?
    .run()
    .await
}
