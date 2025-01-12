#!/bin/bash

GREENGREEN='\033[0;32m'
RED='\033[0;31m'
NC='\033[0m'

echo -e "${GREENGREEN}Starting the server...${NC}"
cd ./Server 
npm run dev

echo -e "${GREENGREEN}Starting the client...${NC}"
cd ../Client
npm run dev

echo -e "${GREENGREEN}Everything is ready meow${NC}"