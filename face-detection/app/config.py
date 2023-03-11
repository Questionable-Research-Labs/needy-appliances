from dataclasses import dataclass
from os import environ
from paho.mqtt import client as mqtt_client


@dataclass
class FaceData:
    """A list of people in face, sorted by biggest bounding box first"""
    ids: list[int]


@dataclass
class EnvVars():
    mqtt_broker: str
    mqtt_port: int
    mqtt_topic: str
    mqtt_client_id: str = "FACE_DETECTOR"

    def __init__(self):
        self.mqtt_broker = environ.get("MQTT_BROKER")
        assert self.mqtt_broker is not None, "Please set the environment variable MQTT_BROKER"

        mqtt_port = environ.get("MQTT_PORT")
        assert mqtt_port is not None, "Please set the environment variable MQTT_PORT"
        assert mqtt_port.isnumeric(), "MQTT_PORT must be numeric"
        self.mqtt_port = int(mqtt_port)

        self.mqtt_topic = environ.get("MQTT_TOPIC")
        assert self.mqtt_broker is not None, "Please set the environment variable MQTT_TOPIC"
        assert self.mqtt_topic in [
            "ACTION", "HASH_FACE"], "MQTT_TOPIC must be either ACTION or HASH_FACE"

    def get_client(self):
        client = mqtt_client.Client(self.mqtt_client_id)
        client.connect(self.mqtt_broker, self.mqtt_port)
        return client
