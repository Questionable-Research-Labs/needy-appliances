#!/bin/bash
sudo apt install mosquitto
sudo cp $PROJECT_ROOT/mqtt/config/mosquitto.conf /etc/mosquitto/mosquitto.conf
sudo systemctl restart mosquitto