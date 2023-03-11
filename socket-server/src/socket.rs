use crate::mqtt::MQTTMessage;
use actix::{Actor, Handler, MessageResult, StreamHandler};
use actix_web::{
    web::{self, Data, ServiceConfig},
    Error, HttpRequest, HttpResponse,
};
use actix_web_actors::ws::{self, WsResponseBuilder};
use tokio::sync::broadcast;

pub fn configure(config: &mut ServiceConfig) {
    config.route("/ws", web::get().to(ws));
}

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

// Handler for MQTT messages
impl Handler<MQTTMessage> for SocketActor {
    type Result = MessageResult<MQTTMessage>;

    fn handle(&mut self, msg: MQTTMessage, ctx: &mut Self::Context) -> Self::Result {
        if let Ok(json) = serde_json::to_string(&msg) {
            ctx.text(json);
        }

        MessageResult(())
    }
}

/// Route for accepting web socket connections
async fn ws(
    req: HttpRequest,
    stream: web::Payload,
    rx: Data<broadcast::Receiver<MQTTMessage>>,
) -> Result<HttpResponse, Error> {
    let mut rx = rx.resubscribe();
    let (addr, resp) = WsResponseBuilder::new(SocketActor {}, &req, stream).start_with_addr()?;

    // Spawn a handler for sending the MQTT messages to the socket actor
    tokio::spawn(async move {
        while let Ok(value) = rx.recv().await {
            let _ = addr.send(value).await;
        }
    });

    Ok(resp)
}
