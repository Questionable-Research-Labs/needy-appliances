#!/bin/bash

# Install rust!
curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh
cd $PROJECT_ROOT/socket-server
cargo build --release
cd -
# Copy build into /usr/bin
sudo cp $PROJECT_ROOT/socket-server/target/release/socket-server /usr/bin/socket-server