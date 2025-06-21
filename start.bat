@echo off
echo Starting Scribe Sync Share...
echo.

echo Starting server...
start cmd /k "cd server && npm start"

echo Starting client...
start cmd /k "npm run dev"

echo.
echo Both client and server are running!
echo Client: http://localhost:8080
echo Server: http://localhost:3001
echo. 