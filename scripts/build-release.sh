#!/bin/bash

SOURCE="../src/com.jbokman.intellij.sdPlugin"
TARGET="../RELEASE"

FILE="../RELEASE/com.jbokman.intellij.streamDeckPlugin"

rm "$FILE"

../DistributionTool -b -i "$SOURCE" -o "$TARGET"