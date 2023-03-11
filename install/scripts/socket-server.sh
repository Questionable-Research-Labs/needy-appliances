#!/bin/bash

# Install rust!
curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh
cd $PROJECT_ROOT/socket-server
cargo build --release
source "$HOME/.cargo/env"

# Copy build into /usr/bin
sudo cp $PROJECT_ROOT/socket-server/target/release/socket-server /usr/bin/socket-server

# Install the systemd service
cat $PROJECT_ROOT/install/serviceFiles/qrl-socket-server.service | envsubst | sudo sponge /etc/systemd/system/qrl-socket-server.service
sudo systemctl daemon-reload
sudo systemctl enable qrl-socket-server.service
