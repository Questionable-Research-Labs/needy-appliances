use actix::{Actor, Handler, MessageResult, StreamHandler};
use actix_web::{
    http::header::CONTENT_TYPE,
    middleware::Logger,
    web::{self, Data, Path},
    App, Error, HttpRequest, HttpResponse, HttpServer, Responder,
};
use actix_web_actors::ws::{self, WsResponseBuilder};
use env_logger::Env;
use mqtt::{init_mqtt, MQTTMessage};
use rust_embed::{EmbeddedFile, RustEmbed};
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

    println!("POST CON");

    tokio::spawn(async move {
        while let Ok(value) = rx.recv().await {
            let _ = addr.send(value).await;
        }
    });

    Ok(resp)
}

#[derive(RustEmbed)]
#[folder = "src/public"]
struct Public;

/// Function for serving content from the embedded public
/// content. Directory structure matches the paths vistied
/// in this url.
///
/// `path` The path of the content to serve
async fn content(path: Path<String>) -> impl Responder {
    let path = path.into_inner();
    if let Some(file) = Public::get(&path) {
        use std::path::Path as StdPath;

        let path = StdPath::new(&path);
        let ext = match path.extension() {
            Some(ext) => ext.to_str(),
            None => None,
        };

        serve_file(ext, file)
    } else {
        let index = Public::get("index.html").expect("Missing index file");
        serve_file(Some("html"), index)
    }
}

async fn serve_index() -> impl Responder {
    let index = Public::get("index.html").expect("Missing index file");
    serve_file(Some("html"), index)
}

fn serve_file(ext: Option<&str>, file: EmbeddedFile) -> impl Responder {
    // Required file extension content types

    let ext = match ext {
        Some(value) => match value {
            "html" => "text/html",
            "js" | "mjs" => "text/javascript",
            "json" => "application/json",
            "woff" => "font/woff",
            "woff2" => "font/woff2",
            "webp" => "image/webp",
            "css" => "text/css",
            _ => "text/plain",
        },
        None => "text/plain",
    };

    HttpResponse::Ok()
        .append_header((CONTENT_TYPE, ext))
        .body(file.data)
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
            .route("/ws", web::get().to(ws))
            .route("/{filename:.*}", web::get().to(content))
            .default_service(web::get().to(serve_index))
    })
    .bind((Ipv4Addr::UNSPECIFIED, 80))?
    .run()
    .await
}
