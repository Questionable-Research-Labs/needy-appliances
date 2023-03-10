# path: /voice-engine/speech_to_text.py
# This file runs the speech to text engine (Google for now)
# plug: https://github.com/invalidse

import speech_recognition as sr

def listen():

    r = sr.Recognizer()
    with sr.Microphone() as source:

        r.energy_threshold = 3000
        # print("[ADJUSTING FOR AMBIENT NOISE...]")
        # r.adjust_for_ambient_noise(source, duration=3)
        # print("[SET MINIMUM ENERGY THRESHOLD TO {}]".format(r.energy_threshold))

        print("[LISTENING...]")
        audio = r.listen(source)
        try:
            print("[RECOGNIZING...]")
            text = r.recognize_google(audio)
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
