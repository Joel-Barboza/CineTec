@echo off
chcp 65001 >nul
setlocal enabledelayedexpansion

:: ==============================
:: CONFIG
:: ==============================
set APP_POOL_NAME=CineTec
set PROJECT_PATH=cine-frontend
set LOG_FILE=deploy.log

set STEP=1
set TOTAL=6

cd /d "%~dp0"
set ORIGINAL_DIR=%cd%

echo ========================================= >> "%LOG_FILE%"
echo DEPLOY STARTED %date% %time% >> "%LOG_FILE%"
echo ========================================= >> "%LOG_FILE%"

:: ==============================
:: ADMIN
:: ==============================
net session >nul 2>&1
if %errorLevel% neq 0 (
    echo [INFO] Requesting admin privileges...
    powershell -Command "Start-Process cmd -ArgumentList '/c cd /d \"%ORIGINAL_DIR%\" && \"%~s0\"' -Verb runAs"
    exit
)

echo [INFO] Running as administrator
cd /d "%ORIGINAL_DIR%"

echo.
echo =====================================
echo           DEPLOY START
echo =====================================
echo.

cd "%PROJECT_PATH%"

:: ==============================
:: 1. CLEAN
:: ==============================
echo.
echo =====================================
echo [%STEP%/%TOTAL%] Cleaning wwwroot...
echo.
set /a STEP+=1

call npm run clean
if %errorLevel% neq 0 goto error

:: ==============================
:: 2. BUILD
:: ==============================
echo.
echo =====================================
echo [%STEP%/%TOTAL%] Building Angular...
echo.
set /a STEP+=1

call npm run build
if %errorLevel% neq 0 goto error

:: ==============================
:: 3. COPY
:: ==============================
echo.
echo =====================================
echo [%STEP%/%TOTAL%] Copying files to wwwroot...
echo.
set /a STEP+=1

call npm run copy
if %errorLevel% neq 0 goto error

cd /d "%ORIGINAL_DIR%"

:: ==============================
:: 4. STOP IIS
:: ==============================
echo.
echo =====================================
echo [%STEP%/%TOTAL%] Stopping IIS...
echo.
set /a STEP+=1

iisreset /stop
if %errorLevel% neq 0 goto error

:: ==============================
:: 5. PUBLISH
:: ==============================
echo.
echo =====================================
echo [%STEP%/%TOTAL%] Publishing .NET...
echo.
set /a STEP+=1

dotnet publish CineTec\CineTec.csproj -c Release -o C:\inetpub\CineTec
if %errorLevel% neq 0 goto error

:: ==============================
:: 6. START IIS
:: ==============================
echo.
echo =====================================
echo [%STEP%/%TOTAL%] Starting IIS...
echo.
set /a STEP+=1

iisreset /start
if %errorLevel% neq 0 goto error


echo SUCCESS %date% %time% >> "%LOG_FILE%"

echo.
echo =====================================
echo          DEPLOY COMPLETED
echo =====================================
echo.

pause
exit /b 0

:error
echo.
echo [ERROR] Deploy failed
echo ERROR %date% %time% >> "%LOG_FILE%"
pause
exit /b 1