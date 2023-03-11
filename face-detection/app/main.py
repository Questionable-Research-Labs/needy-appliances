from dotenv import load_dotenv
import cv2

from .config import EnvVars
from .frame_batcher import batch_frames

load_dotenv()

config = EnvVars()

client = config.get_client()

vc = cv2.VideoCapture(0)

if vc.isOpened():  # try to get the first frame
    rval, frame = vc.read()
else:
    rval = False

know_faces = []

while rval:
    rval, frame = vc.read()

    key = cv2.waitKey(20)
    if key == 27:  # exit on ESC
        break
    faces = batch_frames(know_faces, vc)

    client.publish(config.mqtt_topic, '{"ids":[%s]}' % ','.join([
                   '"%d"' % x for x in faces]))

vc.release()
