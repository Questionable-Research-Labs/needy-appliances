# path: /voice-engine/process_mqtt.py
# This file runs the MQTT client - it will send a 0 or 1 to the microwave to turn it on or off, and send the text to the display
# plug: https://github.com/invalidse

import paho.mqtt.client as mqtt
import os
import json

broker_address = "192.168.137.1"
client = mqtt.Client("P1")

try:
    client.connect(broker_address)
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