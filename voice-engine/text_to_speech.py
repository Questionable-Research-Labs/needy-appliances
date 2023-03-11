# path: /voice-engine/text_to_speech.py
# This file runs the text to speech engine
# plug: https://github.com/invalidse

from TTS.api import TTS
import os

print(TTS.list_models())
# model_name = TTS.list_models()[0]
# tts = TTS(model_name)
# wav = tts.tts("This is a test! This is also a test!!", speaker=tts.speakers[0], language=tts.languages[0])

