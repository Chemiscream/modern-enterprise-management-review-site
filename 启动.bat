@echo off
setlocal
title Modern Enterprise Management - Review Site
cd /d "%~dp0"

echo.
echo   ============================================
echo    Review Site  (Modern Enterprise Management)
echo   ============================================
echo.

rem ---------- locate node.exe ----------
set "NODE_EXE=node"
where node >nul 2>nul
if not errorlevel 1 goto :haveNode

for %%P in (
  "%LOCALAPPDATA%\Programs\nodejs\node.exe"
  "C:\Program Files\nodejs\node.exe"
  "C:\Program Files (x86)\nodejs\node.exe"
  "D:\also software\nodejs\node.exe"
) do if exist %%P (
  set "NODE_EXE=%%~P"
  goto :haveNode
)

echo   [ERROR] Node.js not found on this computer.
echo.
echo   This site runs a small local server, so Node.js is required.
echo   Download and install it here (pick LTS, then just click Next):
echo.
echo       https://nodejs.org/
echo.
echo   After installing, close this window and double-click this file again.
echo.
pause
exit /b 1

:haveNode
echo   Node found: %NODE_EXE%
echo.

if not exist "%~dp0server.js" (
  echo   [ERROR] server.js is missing next to this file.
  echo           The folder is incomplete - please copy the whole "site" folder.
  echo.
  pause
  exit /b 1
)

echo   Starting the local server, please wait a few seconds...
echo   Your browser should open automatically.
echo   If it does not, open it manually and visit the address printed below.
echo.
echo   NOTE: keep this window open while studying. Closing it stops the site.
echo.

if "%~1"=="--no-open" (
  "%NODE_EXE%" server.js 8080 --no-open
) else (
  "%NODE_EXE%" server.js 8080
)

echo.
echo   --------------------------------------------
echo   Server stopped (exit code %ERRORLEVEL%).
echo   If you did not close it yourself, read the error message above.
echo   --------------------------------------------
echo.
pause
endlocal
