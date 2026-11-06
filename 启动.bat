@echo off
setlocal
chcp 936 >nul
title 现代企业管理 - 复习网站
cd /d "%~dp0"

echo.
echo   ============================================
echo    现代企业管理 · 考试复习网站
echo   ============================================
echo.

rem ---- locate node.exe ----
set "NODE_EXE=node"
where node >nul 2>nul
if not errorlevel 1 goto :haveNode

if exist "D:\also software\nodejs\node.exe" (
  set "NODE_EXE=D:\also software\nodejs\node.exe"
  goto :haveNode
)
if exist "%LOCALAPPDATA%\Programs\nodejs\node.exe" (
  set "NODE_EXE=%LOCALAPPDATA%\Programs\nodejs\node.exe"
  goto :haveNode
)
if exist "C:\Program Files\nodejs\node.exe" (
  set "NODE_EXE=C:\Program Files\nodejs\node.exe"
  goto :haveNode
)

echo   [错误] 没有找到 Node.js。
echo.
echo   本网站需要本地服务器才能运行，请先安装 Node.js:
echo     https://nodejs.org/  （选 LTS 版本，一路下一步）
echo.
echo   安装完成后重新双击本文件即可。
echo.
pause
exit /b 1

:haveNode
echo   已找到 Node: %NODE_EXE%
echo.

if not exist "%~dp0server.js" (
  echo   [错误] 同目录下找不到 server.js，文件可能不完整。
  echo.
  pause
  exit /b 1
)

echo   正在启动服务（首次约需几秒）...
echo   浏览器通常会自动打开；若没有，请手动访问下方地址。
echo   关闭本窗口即停止服务。
echo.

if "%~1"=="--no-open" (
  "%NODE_EXE%" server.js 8080 --no-open
) else (
  "%NODE_EXE%" server.js 8080
)

echo.
echo   --------------------------------------------
echo   服务已退出，退出码 %ERRORLEVEL%。
echo   若并非你主动关闭，请记录上方报错信息。
echo   --------------------------------------------
echo.
pause
endlocal
