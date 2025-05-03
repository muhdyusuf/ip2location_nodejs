@echo off
echo Installing dependencies...
npm install

IF %ERRORLEVEL% NEQ 0 (
    echo Failed to install dependencies. Exiting...
    exit /b %ERRORLEVEL%
)

echo Dependencies installed successfully.
echo Running script...
node index.js

pause
