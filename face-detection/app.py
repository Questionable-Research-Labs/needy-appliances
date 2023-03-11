from dotenv import load_dotenv
from face import find_faces
import cv2
import time
from config import EnvVars


def main():
    load_dotenv()

    config = EnvVars()

    cv2.namedWindow("preview")

    vc = cv2.VideoCapture(0)

    if vc.isOpened():  # try to get the first frame
        rval, frame = vc.read()
    else:
        rval = False

    know_faces = []

    prev_time = time.time()

    while rval:
        rval, frame = vc.read()

        key = cv2.waitKey(20)
        if key == 27:  # exit on ESC
            break

        if time.time() - prev_time > 0.2:
            small_frame = cv2.resize(frame, (0, 0), fx=0.25, fy=0.25)
            locations = find_faces(know_faces, small_frame)

            print(locations)

            for index, pos in locations:
                top, left, bottom, right = [x * 4 for x in pos]
                # Draw a box around the face
                cv2.rectangle(frame, (left, top),
                              (right, bottom), (0, 0, 255), 2)
                cv2.addText(frame, str(index), (left, bottom),
                            "LDFComicSans", 20)

            cv2.imshow("preview", frame)

            prev_time = time.time()

    vc.release()
    cv2.destroyWindow("preview")


if __name__ == "__main__":
    main()
