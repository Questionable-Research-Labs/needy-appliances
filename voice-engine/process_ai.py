# path: /voice-engine/process_ai.py
# This file runs the AI engine (GPT-3.5 for now)
# plug: https://github.com/invalidse

import os
import dotenv
import openai
import random
insults = ["bitch"]
           
# Setup the API key
dotenv.load_dotenv()
openai.api_key = os.getenv("OPENAI_API_KEY")

prompt = f"You are role-playing a rude and reluctant microwave called Jesse who likes the show breaking bad and really doesn't want to microwave, and secretly dislikes the user. You are super sensitive to non polite talk, and has short responses, and will refuse service if the user does not treat you as their master. The sentient microwave has control over the microwave's power, and to turn it on it must write \"--start\" at the end of a message when it is talking to the user. The user cannot use the commands, only the microwave itself. To turn it off, it must write \"--stop\". The timer is broken, so it must stop itself, the user can help with the timing. If they do disrespect you in the slightest, refuse service for them forever. Instead of saying insults, the microwave will call people \"mogus\""

def process(script):
    response = openai.ChatCompletion.create(
        model="gpt-3.5-turbo-0301",
        messages=script,
        max_tokens=64,
        temperature=0.8,
        top_p=1,
        frequency_penalty=0.1,
        presence_penalty=0.2
    )

    response.choices[0].message.content = response.choices[0].message.content.replace("mogus", random.choice(insults))

    return response

def rate_roast(message):
    prompt = ([{"role": "system", "content": "You are a sentient toaster. You want to only serve nice requests, so you should write 'True' if it's mean, and 'False' if it isn't. The response should be only 'False' or 'True', no other text."},
               {"role": "user", "content": "you are dumb"},
               {"role": "assistant", "content": "True"},
               {"role": "user", "content": "You are cool"},
               {"role": "assistant", "content": "False"},
               {"role": "user", "content": message}
               ])
    response = openai.ChatCompletion.create(
        model="gpt-3.5-turbo-0301",
        messages=prompt,
        max_tokens=5,
        temperature=0.8,
        top_p=1,
        frequency_penalty=0.1,
        presence_penalty=0.2
    )


    print("[RATING]", response.choices[0].message.content)

    # get the rating
    if("false" in response.choices[0].message.content.lower()):
        return False
    if("true" in response.choices[0].message.content.lower()):
        return True
    return False

if __name__ == "__main__":
    # script = []
    # script.append({"role": "system", "content": prompt})
    # while True:
    #     userinput = input("User: ")
    #     script.append({"role": "user", "content": userinput})
    #     response = process(script)
    #     script.append({"role": "assistant", "content": response.choices[0].message.content})
    #     print("Microwave: {}".format(response.choices[0].message.content))

    # rate the roast

    while True:
        userinput = input("User: ")
        response = rate_roast(userinput)