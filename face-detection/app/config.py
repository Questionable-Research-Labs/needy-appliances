from dataclasses import dataclass
from os import environ


@dataclass
class FaceData:
    """A list of people in face, sorted by biggest bounding box first"""
    ids: list[int]


@dataclass
class EnvVars():
    mqtt_broker: str
    mqtt_port: int
    mqtt_topic: str = "FACE_HASH"
    mqtt_client_id: str = "FACE_DETECTOR"

    def __init__(self):
        self.mqtt_broker = environ.get("MQTT_BROKER")
        if not self.mqtt_broker:
            assert self.mqtt_broker is not None, "Please set the environment variable MQTT_BROKER"

        self.mqtt_port = environ.get("MQTT_PORT")
        if not self.mqtt_port:
            assert self.mqtt_broker is not None, "Please set the environment variable MQTT_PORT"

    def get_client(self):
        passexit
