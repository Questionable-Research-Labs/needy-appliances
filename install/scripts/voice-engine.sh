#!/bin/bash
# Install dependinces
sudo apt install libcairo2-dev libxt-dev libgirepository1.0-dev cmake libasound2-dev libasound-dev portaudio19-dev libportaudio2 libportaudiocpp0 espeak flac 
curl -LsSf https://astral.sh/uv/install.sh | sh

cd $PROJECT_ROOT/voice-engine
# Install python dependencies
uv sync
cd -

# Install systemd service
cat $PROJECT_ROOT/install/serviceFiles/qrl-voice-engine.service | envsubst | sudo sponge /etc/systemd/system/qrl-voice-engine.service
sudo systemctl daemon-reload
sudo systemctl enable qrl-voice-engine.service
