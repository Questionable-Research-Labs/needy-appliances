# path: /voice-engine/process_mqtt.py
# This file runs the MQTT client - it will send a 0 or 1 to the microwave to turn it on or off, and send the text to the display
# plug: https://github.com/invalidse

import paho.mqtt.client as mqtt
import os
import json

broker_address = "192.168.137.1"
client = mqtt.Client("P1")
client.connect(broker_address)

def process(script):
    if("--start" in script[-1]["content"]):
        client.publish("ACTION", bytearray([1]))
    elif("--stop" in script[-1]["content"]):
        client.publish("ACTION", bytearray([0]))

    # send last 2 messages to the display, in json format
    client.publish("TRANS", json.dumps(script[-2]))
    client.publish("TRANS", json.dumps(script[-1]))
    

    print(json.dumps(script[-2]))
    print(json.dumps(script[-1]))

    
if __name__ == "__main__":
    # send a 1 to the microwave to turn it on
    client.publish("ACTION", bytearray([0]))