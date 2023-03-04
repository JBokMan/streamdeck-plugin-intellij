#!/bin/bash

# Define the source and destination paths
SRC="../src/com.jbokman.intellij.sdPlugin"
DEST="$HOME/Library/Application Support/com.elgato.StreamDeck/Plugins"

# Copy the folder to the destination and overwrite it if it already exists
cp -Rf "$SRC" "$DEST"
