# path: /voice-engine/text_to_speech.py
# This file runs the text to speech engine
# plug: https://github.com/invalidse

import pyttsx3
import os

# Setup the engine
engine = pyttsx3.init()
voices = engine.getProperty('voices')
for voice in voices:
    print(voice.id)

engine.setProperty('voice', 'C:/Users/taine/Downloads/en-US')
engine.setProperty('rate', 175)

def process(script):
    engine.say(script[-1]["content"])
    engine.runAndWait()

if __name__ == "__main__":
    script = []
    while True:
        userinput = input("User: ")
        script.append({"role": "user", "content": userinput})
        process(script)