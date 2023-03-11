from typing import List, Any, Tuple
import numpy as np
import face_recognition


def find_faces(know_faces: List[Any], frame: Any) -> List[Tuple[int, Tuple[int, int, int, int]]]:
    # Convert the image from BGR color (which OpenCV uses) to RGB color (which face_recognition uses)
    rgb_small_frame = frame[:, :, ::-1]

    # Find all the faces and face encodings in the current frame of video
    face_locations = face_recognition.face_locations(rgb_small_frame)
    face_encodings = face_recognition.face_encodings(
        rgb_small_frame, face_locations)

    print("Face locations", face_locations)

    if len(know_faces) == 0:
        know_faces.extend(face_encodings)
        return list(zip(list(range(0, len(know_faces))), face_locations))

    identified = []

    for index, face_encoding in enumerate(face_encodings):
        # See if the face is a match for the known face(s)
        matches = face_recognition.compare_faces(
            know_faces, face_encoding)

        # # If a match was found in known_face_encodings, just use the first one.
        # if True in matches:
        #     first_match_index = matches.index(True)
        #     name = known_face_names[first_match_index]

        # Or instead, use the known face with the smallest distance to the new face
        face_distances = face_recognition.face_distance(
            know_faces, face_encoding)

        best_match_index = np.argmin(face_distances)

        if matches[best_match_index]:
            identified.append((best_match_index, face_locations[index]))
        else:
            know_faces.append(face_encoding)
            # Append unknown faces to the list
            identified.append(
                (len(know_faces) - 1, face_locations[index]))

    return identified
