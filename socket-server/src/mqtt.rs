use std::collections::HashMap;

use actix::Message;
use mqtt_async_client::client::{Client, Subscribe, SubscribeTopic};
use mqtt_async_client::client::{QoS, ReadResult};
use serde::{Deserialize, Serialize};
use tokio::sync::broadcast;

/// The different messages that can be recieved from the MQTT
/// subscriptions
#[derive(Message, Debug, Clone, Serialize)]
#[rtype(result = "()")]
#[serde(tag = "type")]
pub enum MQTTMessage {
    /// The action message
    Action { action: Action },
    /// The face hash message
    FaceHash(FaceHash),
    /// The transcript message
    Transcript(Transcript),
}

/// The message for the list of current hashes
#[derive(Debug, Clone, Deserialize, Serialize)]
pub struct FaceHash {
    /// The hashes of all the faces present
    id: Vec<String>,
}

/// The message containing text from the chat transcript
/// between the AI and human
#[derive(Debug, Clone, Deserialize, Serialize)]
pub struct Transcript {
    /// The role of the text HUMAN / AI
    role: TranscriptRole,
    /// The actual text itself
    #[serde(rename(deserialize = "content"))]
    text: String,
}

/// The different roles for transcript text
#[derive(Debug, Clone, Deserialize, Serialize)]
pub enum TranscriptRole {
    // Human role
    #[serde(rename(deserialize = "user"))]
    Human,
    // AI role
    #[serde(rename(deserialize = "assistant"))]
    AI,
}

/// The different actions
#[derive(Debug, Clone, Serialize)]
pub enum Action {
    /// The state is off
    Off,
    /// The state is on
    On,
}

/// The URL of the MQTT server
const TARGET_URL: &str = "mqtt://localhost:1883/";

const TOPIC_ACTION: &str = "ACTION";
const TOPIC_FACE_HASH: &str = "FACE_HASH";
const TOPIC_TRANS: &str = "TRANS";

/// The MQTT service responsible for recieving the
pub struct MQTT {
    client: Client,
    tx: broadcast::Sender<MQTTMessage>,
}

impl MQTT {
    /// Initializes the MQTT client
    pub async fn init() -> broadcast::Receiver<MQTTMessage> {
        let (tx, rx) = broadcast::channel(12);
        // Create the client
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

        // Create the topics to subscribe to
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

        // Spawn off the processing
        let mqtt = MQTT { client, tx };
        tokio::spawn(mqtt.process());

        rx
    }

    /// Handles reading the subscribed messages and then forwarding them
    /// onto the broadcast channel
    async fn process(mut self) {
        while let Ok(result) = self.client.read_subscriptions().await {
            let message: MQTTMessage = match result.try_into() {
                Ok(message) => message,
                Err(err) => {
                    eprintln!("{:?}", err);
                    continue;
                }
            };

            println!("Message: {:?}", message);

            if self.tx.send(message).is_err() {
                eprintln!("Failed to send message to sender")
            }
        }
    }
}

#[derive(Debug)]
pub enum ParseError {
    /// The topic wasn't expected
    UnexpectedTopic,
    /// The action was unknown
    MissingAction,
    UnknownAction,
    InvalidHashJson,
}

impl TryFrom<ReadResult> for MQTTMessage {
    type Error = ParseError;

    fn try_from(value: ReadResult) -> Result<Self, Self::Error> {
        let topic = value.topic();
        let payload = value.payload();
        match topic {
            TOPIC_ACTION => {
                let action = Action::try_from(payload)?;
                Ok(MQTTMessage::Action { action })
            }
            TOPIC_FACE_HASH => {
                let value: FaceHash = FaceHash::try_from(payload)?;
                Ok(MQTTMessage::FaceHash(value))
            }
            TOPIC_TRANS => {
                let map: HashMap<String, String> = serde_json::from_slice(payload).unwrap();
                dbg!(map);

                let value: Transcript = Transcript::try_from(payload)?;
                Ok(MQTTMessage::Transcript(value))
            }
            _ => return Err(ParseError::UnexpectedTopic),
        }
    }
}

impl TryFrom<&[u8]> for FaceHash {
    type Error = ParseError;

    fn try_from(value: &[u8]) -> Result<Self, Self::Error> {
        serde_json::from_slice(value).map_err(|_| ParseError::InvalidHashJson)
    }
}

impl TryFrom<&[u8]> for Transcript {
    type Error = ParseError;

    fn try_from(value: &[u8]) -> Result<Self, Self::Error> {
        serde_json::from_slice(value).map_err(|_| ParseError::InvalidHashJson)
    }
}

impl TryFrom<&[u8]> for Action {
    type Error = ParseError;

    fn try_from(value: &[u8]) -> Result<Self, Self::Error> {
        let value = *value.first().ok_or(ParseError::MissingAction)?;
        Ok(match value {
            0 => Action::Off,
            1 => Action::On,
            _ => return Err(ParseError::UnknownAction),
        })
    }
}
