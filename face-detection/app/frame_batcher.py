from .face import find_faces
from typing import Any
from time import time
import cv2


def batch_frames(know_faces: list, vc: Any):
    locations_list = dict()
    for _ in range(0, 5):
        start = time()
        while True:
            _, frame = vc.read()
            if time() - start > 0.2:
                small_frame = cv2.resize(frame, (0, 0), fx=0.25, fy=0.25)
                faces = find_faces(
                    know_faces, small_frame)
                print("Yes", faces)

                for face, (top, left, bottom, right) in faces:
                    value = locations_list.get(face) or 0

                    if value == 0:
                        locations_list[face] = (bottom - top) * (left - right)
                    else:
                        locations_list[face] = (
                            value + (bottom - top) * (left - right)) / 2

                break

    return [x[0] for x in sorted(locations_list.items(), key=lambda x: x[1])]
