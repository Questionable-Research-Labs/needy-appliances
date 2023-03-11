# Application for recognizing faces

## REQUIREMENTS

The program has been tested with python 3.9, and is known to work. `opencv` and `cmake` are also required for this projects.

To setup this project under debian run.

```
# apt install python3.9 python3.9-dev python3-pip libopencv-dev cmake
```

Python dependencies can then be installed with pip using

```
$ python -m pip install -r requirements.txt
```

## Configuration

The mqtt broker and port can be set with the environment variables `MQTT_BROKER` and `MQTT_PORT`. The topic can be set with the envvar `MQTT_TOPIC`, and can either be `ACTION` so that a watched pot never boils or `FACE_HASH` for face detection

To run the project use:

```

$ python -m app.main

```

```

```
