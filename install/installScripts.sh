#!/bin/bash

PROJECT_ROOT=$(git rev-parse --show-toplevel)

sudo apt update && sudo apt upgrade -y

for file in ./scripts/*.sh; do
    dialog --title "Run $file" \
    --backtitle "Running through install files" \
    --yesno "Do you want to install $file?" 7 60
    
    # Get exit status
    # 0 means user hit [yes] button.
    # 1 means user hit [no] button.
    # 255 means user hit [Esc] key.
    response=$?
    case $response in
    0) $file;;
    1) echo "Skipping";;
    255) echo "[ESC] key pressed." && break;;
    esac
done