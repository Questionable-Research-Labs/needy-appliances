#!/bin/bash
# Install dependinces
sudo apt install python3.9 python3.9-dev python3-pip cmake libasound2-dev
sudo python3 -m pip install -r $PROJECT_ROOT/voice-engine/requirements.txt

# Install systemd service
cat $PROJECT_ROOT/install/serviceFiles/qrl-face-detection.service | envsubst | sudo sponge /etc/systemd/system/qrl-face-detection.service
sudo systemctl daemon-reload
sudo systemctl enable qrl-face-detection.service
