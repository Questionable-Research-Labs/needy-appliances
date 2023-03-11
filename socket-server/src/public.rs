use actix_web::{
    http::header::CONTENT_TYPE,
    web::{self, Path, ServiceConfig},
    HttpResponse,
};
use rust_embed::{EmbeddedFile, RustEmbed};

/// Embedded resources for the user interface
#[derive(RustEmbed)]
#[folder = "src/public"]
struct Public;

/// Configure function for adding all the services and routes
///
/// `config` The app config
pub fn configure(config: &mut ServiceConfig) {
    config
        // The catch-all route for the embedded files
        .route("/{file:.*}", web::get().to(content))
        // The fallback default route for the index.html file
        .default_service(web::get().to(serve_index));
}

/// Function for serving content from the embedded public
/// content. Directory structure matches the paths vistied
/// in this url.
///
/// `path` The path of the content to serve
async fn content(path: Path<String>) -> HttpResponse {
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
        serve_index().await
    }
}

/// Serves the index HTML file from the public resources
async fn serve_index() -> HttpResponse {
    let index = Public::get("index.html").expect("Missing index file");
    serve_file(Some("html"), index)
}

/// Serves the specific embedded file using the provided file extension
/// for determining the content type if provided.
///
/// `ext`  The file extension if present
/// `file` The embeded file
fn serve_file(ext: Option<&str>, file: EmbeddedFile) -> HttpResponse {
    // Required file extension content types
    let ext = match ext {
        Some(value) => match value {
            "html" => "text/html",
            "js" => "text/javascript",
            "json" => "application/json",
            "png" => "image/png",
            "css" => "text/css",
            _ => "text/plain",
        },
        None => "text/plain",
    };

    HttpResponse::Ok()
        .append_header((CONTENT_TYPE, ext))
        .body(file.data)
}
