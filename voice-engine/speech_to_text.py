# path: /voice-engine/speech_to_text.py
# This file runs the speech to text engine (Google for now)
# plug: https://github.com/invalidse

import os
import speech_recognition as sr
from os import environ

threshold = 0

device_index = 0

def listen():
    global threshold,device_index

    if environ.get("MICROPHONE_DEVICE_ID") and environ.get("MICROPHONE_DEVICE_ID").isnumeric():
        device_index = int(environ.get("MICROPHONE_DEVICE_ID"))

    for index, name in enumerate(sr.Microphone.list_microphone_names()):
        print("Microphone with name \"{1}\" found for `Microphone(device_index={0})`".format(index, name))
        if index == device_index:
            print("^ THE CHOSEN ONE^")

    # print(device_index)

    r = sr.Recognizer()
    with sr.Microphone(device_index=device_index) as source: #device_index=device_index
        
        if(threshold == 0):
            print("[CALIBRATING MICROPHONE...]")
            r.adjust_for_ambient_noise(source, duration=5)
            print("[MIN ENERGY THRESHOLD: {}]".format(r.energy_threshold))
            threshold = r.energy_threshold

        # stop listening quickly if the user stops talking
        r.pause_threshold = 0.6
        r.non_speaking_duration = 0.4


        # print("[ADJUSTING FOR AMBIENT NOISE...]")
        # r.adjust_for_ambient_noise(source, duration=3)
        # print("[SET MINIMUM ENERGY THRESHOLD TO {}]".format(r.energy_threshold))

        print("[LISTENING...]")
        audio = r.listen(source, timeout=15, phrase_time_limit=5)
        try:
            print("[RECOGNIZING...]")
            text = r.recognize_whisper_api(audio, model="whisper-1", api_key=os.getenv("OPENAI_API_KEY"))
            print("[USER] {}".format(text))
            return text
        except:
            print("[USER] ...")
            return False
        
if __name__ == "__main__":
    while True:
        script = listen()
        if script:
            print("You said: {}".format(script)) # This is where you would run the AI engine, but I'm not going to do that here (main.py does that)
