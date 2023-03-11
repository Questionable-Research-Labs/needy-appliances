#!/bin/bash

sudo apt update && sudo apt install dialog gettext-base moreutils git

PROJECT_ROOT=$(git rev-parse --show-toplevel)


read -p "Root: $PROJECT_ROOT [ready to starr?]"


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
    0) PROJECT_ROOT=$PROJECT_ROOT $file && read -p "(Failed) Press enter to continue"  || read -p "(Falied) Press enter to continue";;
    1) echo "Skipping";;
    255) echo "[ESC] key pressed." && break;;
    esac
done