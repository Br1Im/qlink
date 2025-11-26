#!/bin/bash
cd ~/qlink && git pull origin main && docker-compose down && docker rmi qlink_frontend 2>/dev/null; docker-compose up -d --build && sleep 20 && docker-compose logs --tail=50 frontend
