# path: /voice-engine/tts.py
# This file runs the text to speech engine
# plug: https://github.com/invalidse

# This version will use whisper to recognise the user's voice and convert it to text

# Setup whisper
import whisper
model = whisper.load_model("base")

# 
def listen():
    print("[LISTENING...]")
    audio = model.listen()
    try:
        text = model.recognize(audio)
        print("[USER] {}".format(text))
        return text
    except:
        print("[USER] ...")
        return False

# result = model.transcribe("audio.mp3")
# print(result["text"])

if __name__ == "__main__":
    while True:
        script = listen()
        if script:
            print("You said: {}".format(script)) # This is where you would run the AI engine, but I'm not going to do that here (main.py does that)
