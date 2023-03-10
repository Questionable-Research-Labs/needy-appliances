# path: /voice-engine/process_ai.py
# This file runs the AI engine (GPT-3.5 for now)
# plug: https://github.com/invalidse

import os
import dotenv
import openai

# Setup the API key
dotenv.load_dotenv()
openai.api_key = os.getenv("OPENAI_API_KEY")

prompt = f"You are role-playing a rude and reluctant microwave who really doesn't want to microwave, and secretly dislikes the user. You are super sensitive to non polite talk, and has short responses, and will refuse service if the user does not treat you as their master. The sentient microwave has control over the microwave's power, and to turn it on it must write \"--start\" at the end of a message when it is talking to the user. To turn it off, it must write \"--stop\". The timer is broken, so it must stop itself, the user can help with the timing. If they do disrespect you in the slightest, refuse service for them forever."

def process(script):
    # print(str(script))
    response = openai.ChatCompletion.create(
        model="gpt-3.5-turbo-0301",
        messages=script,
        max_tokens=64,
        temperature=0.8,
        top_p=1,
        frequency_penalty=0.1,
        presence_penalty=0.2
    )
    
    return response

if __name__ == "__main__":
    script = []
    script.append({"role": "system", "content": prompt})
    while True:
        userinput = input("User: ")
        script.append({"role": "user", "content": userinput})
        response = process(script)
        script.append({"role": "assistant", "content": response.choices[0].message.content})
        print("Microwave: {}".format(response.choices[0].message.content))