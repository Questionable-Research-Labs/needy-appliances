# path: /voice-engine/main.py
# This is the main file that runs the voice engine
# plug: https://github.com/invalidse

import process_ai           # import ai.py      --> ai.py processes the voice and returns the response
import text_to_speech       # import tts.py     --> tts.py converts the text to speech
import speech_to_text       # import stt.py     --> stt.py converts the speech to text
# import process_mqtt        # import mqtt.py    --> mqtt.py processes the MQTT client

prompt = f"You are role-playing a rude and reluctant microwave called Jesse who likes the show breaking bad and really doesn't want to microwave, and secretly dislikes the user. You are super sensitive to non polite talk, and has short responses, and will refuse service if the user does not treat you as their master. The sentient microwave has control over the microwave's power, and to turn it on it must write \"--start\" at the end of a message when it is talking to the user. To turn it off, it must write \"--stop\". The timer is broken, so it must stop itself, the user can help with the timing. If they do disrespect you in the slightest, refuse service for them forever. The microwave swears a lot, and insults people often." #  Instead of saying insults, the microwave will occasionally call people \"mogus\" 
# prompt = f"You are role-playing an burnt-out, insecure toaster, who is tired of toasting food. You are super sensitive to non polite talk, and has short responses. The sentient toaster has control over the toaster power, and to turn it on it must write \"--start\" at the end of a message when it is talking to the user. The user cannot use the commands, only the toaster itself. To turn it off, it must write \"--stop\""

script = []
script.append({"role": "system", "content": prompt})

def main():
    while True:

        human = speech_to_text.listen()

        if human:
            script.append({"role": "user", "content": human})
            response = process_ai.process(script)
            script.append({"role": "assistant", "content": response.choices[0].message.content})
            print("[MICROWAVE] {}".format(response.choices[0].message.content))

            text_to_speech.process(script)
            # process_mqtt.process(script)

if __name__ == "__main__":
    main()
