# path: /voice-engine/process_mqtt.py
# This file runs the MQTT client - it will send a 0 or 1 to the microwave to turn it on or off, and send the text to the display
# plug: https://github.com/invalidse

import paho.mqtt.client as mqtt
import os
import json
import threading

user_hash = "example"
# subscribe to FACE_HASH

broker_address = "127.0.0.1"
client = mqtt.Client("P1")

def on_message(client, userdata, message):
    print("[MQTT] Message received: "+ str(message.payload.decode("utf-8")))
    if(message.topic == "FACE_HASH"):
        print("[MQTT] Face hash receive: ", message.payload.decode("utf-8"))
        global user_hash
        user_hash = json.loads(message.payload.decode("utf-8"))['id'][0]
        print("USER CHANGE:", str(user_hash))



try:
    client.connect(broker_address)
    client.subscribe("FACE_HASH", 0)
    client.on_message = on_message


    b = threading.Thread(name='background', target=client.loop_forever)
    b.start()
except:
    print("MQTT NOT CONNECTED, PLEASE CHECK CONNECTION")


def process(script):
    client.publish("TRANS", json.dumps(script[-1]))
    print("[MQTT] Published: "+ str(json.dumps(script[-1])))

def toggle_appliance(value):
    if(value):
        client.publish("ACTION", bytearray([1]))
    else:
        client.publish("ACTION", bytearray([0]))

    print("[MQTT] Published: "+ str(value))


    
if __name__ == "__main__":
    # send a 1 to the microwave to turn it on
    client.publish("ACTION", bytearray([0]))