# path: /voice-engine/text_to_speech.py
# This file runs the text to speech engine
# plug: https://github.com/invalidse


import pyttsx3
import dotenv
import os

import requests
from playsound import playsound

from pathlib import Path

dotenv.load_dotenv()
ELEVENLABS_API_KEY = os.getenv("ELEVENLABS_API_KEY")
ELEVENLABS_VOICE_ID = os.getenv("ELEVENLABS_VOICE_ID")

url = f'https://api.elevenlabs.io/v1/text-to-speech/{ELEVENLABS_VOICE_ID}/stream'
headers = {
    'accept': '*/*',
    'xi-api-key': ELEVENLABS_API_KEY,
    'Content-Type': 'application/json'
}




# Setup the engine
engine = pyttsx3.init()
voices = engine.getProperty('voices')
# for voice in voices:
#     print(voice.id)

# engine.setProperty('voice', 'C:/Users/taine/Downloads/en-US')
engine.setProperty('rate', 175)

def process(script):
    text = script[-1]["content"]
    if ELEVENLABS_API_KEY and ELEVENLABS_VOICE_ID:
        print("Using ElevenLabs TTS")
        Path("audioTemp").mkdir(parents=True, exist_ok=True)
        audioFile = requests.post(url, headers=headers, json={
            'text': text,
            'voice_settings': {
                'stability': 0.8,
                'similarity_boost': 0
            }}
        ).content
        
        tempPath = 'audioTemp/audio.mp3'
        with open(tempPath, 'wb') as f:
            f.write(audioFile)
        playsound(tempPath)
    else:
        print("Using Espeak TTS")
        engine.say(text)
        engine.runAndWait()
    return True

if __name__ == "__main__":
    script = []
    while True:
        userinput = input("User: ")
        script.append({"role": "user", "content": userinput})
        process(script)