# path: /voice-engine/sst.py
# This file runs the speech to text engine (Google for now)
# plug: https://github.com/invalidse

# # This version will use whisper to recognise the user's voice and convert it to text

# Setup whisper
import whisper
model = whisper.load_model("base")

# Setup speech recognition - this library is only used to get the audio from the microphone
import speech_recognition as sr
r = sr.Recognizer()

# Setup the microphone
def listen():
    with sr.Microphone() as source:

        r.energy_threshold = 3000
        # print("[ADJUSTING FOR AMBIENT NOISE...]")
        # r.adjust_for_ambient_noise(source, duration=3)
        # print("[SET MINIMUM ENERGY THRESHOLD TO {}]".format(r.energy_threshold))

        print("[LISTENING...]")
        audio = r.listen(source)

        # Save the audio as mp3
        with open("audio.wav", "wb") as f:
            f.write(audio.get_wav_data())
        
        # Convert the audio to text

        print("[RECOGNIZING...]")
        text = whisper.decode(model, audio)

        print("[USER] {}".format(text))


# Run the listen function
if __name__ == "__main__":
    while True:
        listen()