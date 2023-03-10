use actix::Message;
use mqtt_async_client::client::QoS;
use mqtt_async_client::client::{Client, Subscribe, SubscribeTopic};
use serde::{Deserialize, Serialize};
use tokio::sync::broadcast;

#[derive(Message, Debug, Clone, Serialize)]
#[rtype(result = "()")]
#[serde(tag = "type")]
pub enum MQTTMessage {
    Action { action: Action },
    FaceHash(FaceHash),
    Transcript(Transcript),
}

#[derive(Debug, Clone, Deserialize, Serialize)]
pub struct FaceHash {
    id: Vec<String>,
}

#[derive(Debug, Clone, Deserialize, Serialize)]
pub struct Transcript {
    role: TranscriptRole,
    text: String,
}

#[derive(Debug, Clone, Deserialize, Serialize)]
#[serde(rename_all = "lowercase")]
pub enum TranscriptRole {
    // Human role
    Human,
    // AI role
    AI,
}

#[derive(Debug, Clone, Serialize)]
pub enum Action {
    Off,
    On,
}

impl Action {
    fn from(value: u8) -> Option<Self> {
        Some(match value {
            0 => Action::Off,
            1 => Action::On,
            _ => return None,
        })
    }
}
const TARGET_URL: &str = "mqtt://localhost:1883/";
const TOPIC_ACTION: &str = "ACTION";
const TOPIC_FACE_HASH: &str = "FACE_HASH";
const TOPIC_TRANS: &str = "TRANS";

pub async fn init_mqtt(tx: broadcast::Sender<MQTTMessage>) {
    // let (tx, rx) = broadcast::channel(12);
    let mut client = Client::builder()
        .set_automatic_connect(true)
        .set_url_string(TARGET_URL)
        .expect("Invalid target URL")
        .build()
        .expect("Invalid client config");

    // Connect the client
    client
        .connect()
        .await
        .expect("Failed to connect to MQTT server");

    let topics = [TOPIC_ACTION, TOPIC_FACE_HASH, TOPIC_TRANS];

    let topics: Vec<SubscribeTopic> = topics
        .iter()
        .map(|value| SubscribeTopic {
            qos: QoS::AtMostOnce,
            topic_path: value.to_string(),
        })
        .collect();

    // Subscribe to topics
    client
        .subscribe(Subscribe::new(topics))
        .await
        .expect("Failed to subscribe to topics");

    while let Ok(result) = client.read_subscriptions().await {
        let topic = result.topic();
        let payload = result.payload();
        let message = match try_parse_payload(topic, payload) {
            Ok(message) => message,
            Err(err) => {
                eprintln!("{:?}", err);
                continue;
            }
        };

        println!("Message: {:?}", message);

        if tx.send(message).is_err() {
            eprintln!("Failed to send message to sender")
        }
    }
}

#[derive(Debug)]
enum ParseError {
    UnexpectedTopic,
    MissingAction,
    UnknownAction,
    InvalidHashJson,
}

fn try_parse_payload(topic: &str, payload: &[u8]) -> Result<MQTTMessage, ParseError> {
    match topic {
        TOPIC_ACTION => {
            dbg!(payload);
            let value = *payload.first().ok_or(ParseError::MissingAction)?;
            let action = Action::from(value).ok_or(ParseError::UnknownAction)?;
            Ok(MQTTMessage::Action { action })
        }
        TOPIC_FACE_HASH => {
            let value: FaceHash =
                serde_json::from_slice(payload).map_err(|_| ParseError::InvalidHashJson)?;
            Ok(MQTTMessage::FaceHash(value))
        }
        TOPIC_TRANS => {
            let value: Transcript =
                serde_json::from_slice(payload).map_err(|_| ParseError::InvalidHashJson)?;
            Ok(MQTTMessage::Transcript(value))
        }
        _ => return Err(ParseError::UnexpectedTopic),
    }
}
