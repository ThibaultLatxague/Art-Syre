@echo off
REM =============================================================================
REM  ArtSyre — Script de démarrage (Windows)
REM  Usage : double-cliquer sur start.bat  OU  lancer depuis un terminal
REM =============================================================================

setlocal EnableDelayedExpansion
title ArtSyre - Demarrage des services

set BACKEND_PORT=8000
set FRONTEND_PORT=4200
set MYSQL_PORT=3306
set SCRIPT_DIR=%~dp0
set BACK_DIR=%SCRIPT_DIR%ArtSyreBack
set FRONT_DIR=%SCRIPT_DIR%ArtSyreFront

REM Chemins d'installation WAMP les plus courants (modifiez si nécessaire)
set WAMP_EXE=
if exist "C:\wamp64\wampmanager.exe"   set WAMP_EXE=C:\wamp64\wampmanager.exe
if exist "C:\wamp\wampmanager.exe"     set WAMP_EXE=C:\wamp\wampmanager.exe
if exist "C:\wamp32\wampmanager.exe"   set WAMP_EXE=C:\wamp32\wampmanager.exe
if exist "D:\wamp64\wampmanager.exe"   set WAMP_EXE=D:\wamp64\wampmanager.exe
if exist "D:\wamp\wampmanager.exe"     set WAMP_EXE=D:\wamp\wampmanager.exe

echo.
echo  ==========================================
echo   ArtSyre  -  Demarrage des services
echo  ==========================================
echo.

REM ── 1. Arrêt des processus existants ─────────────────────────────────────────
echo [1/6] Arret des processus existants...

REM Tuer les processus sur les ports 8000 et 4200
for %%P in (%BACKEND_PORT% %FRONTEND_PORT%) do (
    for /f "tokens=5" %%a in ('netstat -ano ^| findstr ":%%P " ^| findstr "LISTENING" 2^>nul') do (
        echo       Arret du processus PID %%a sur le port %%P...
        taskkill /PID %%a /F >nul 2>&1
    )
)

REM Tuer les processus php artisan et ng serve nommés
taskkill /F /IM php.exe    /FI "WINDOWTITLE eq artisan*" >nul 2>&1
taskkill /F /IM node.exe   /FI "WINDOWTITLE eq ng*"      >nul 2>&1

timeout /t 2 /nobreak >nul
echo       OK - Processus arretes
echo.

REM ── 2. Démarrage de WAMP Server ───────────────────────────────────────────────
echo [2/6] Demarrage de WAMP Server (Apache + MySQL)...

REM Vérifier si MySQL tourne déjà sur le port 3306
netstat -ano | findstr ":%MYSQL_PORT% " | findstr "LISTENING" >nul 2>&1
if not errorlevel 1 (
    echo       OK - MySQL deja actif sur le port %MYSQL_PORT%
    goto wamp_ready
)

REM Lancer WAMP si l'exécutable a été trouvé
if "%WAMP_EXE%"=="" (
    echo       [AVERT] WampServer introuvable dans les chemins habituels.
    echo       Chemins verifies :
    echo         C:\wamp64\wampmanager.exe
    echo         C:\wamp\wampmanager.exe
    echo         C:\wamp32\wampmanager.exe
    echo         D:\wamp64\wampmanager.exe
    echo         D:\wamp\wampmanager.exe
    echo.
    echo       Modifiez la variable WAMP_EXE dans ce script,
    echo       ou demarrez WampServer manuellement puis relancez start.bat.
    echo.
    pause
    goto wamp_ready
)

echo       Lancement de WampServer : %WAMP_EXE%
start "" "%WAMP_EXE%"

REM Attente que MySQL soit disponible (max 60s)
echo       Attente du demarrage de MySQL sur le port %MYSQL_PORT%...
set /a MYSQL_WAIT=0
:wait_mysql
    timeout /t 2 /nobreak >nul
    set /a MYSQL_WAIT+=2
    netstat -ano | findstr ":%MYSQL_PORT% " | findstr "LISTENING" >nul 2>&1
    if not errorlevel 1 goto mysql_ready
    if !MYSQL_WAIT! LSS 60 goto wait_mysql
    echo       [AVERT] MySQL non disponible apres 60s - WAMP a peut-etre besoin de plus de temps.
    goto wamp_ready

:mysql_ready
echo       OK - MySQL pret sur le port %MYSQL_PORT%

:wamp_ready

REM ── 2. Vérification des dossiers ─────────────────────────────────────────────
if not exist "%BACK_DIR%" (
    echo [ERREUR] Dossier introuvable : %BACK_DIR%
    echo          Lancez ce script depuis la racine du projet.
    pause
    exit /b 1
)
if not exist "%FRONT_DIR%" (
    echo [ERREUR] Dossier introuvable : %FRONT_DIR%
    echo          Lancez ce script depuis la racine du projet.
    pause
    exit /b 1
)

REM ── 4. Backend Laravel ────────────────────────────────────────────────────────
echo [3/6] Demarrage du backend Laravel (port %BACKEND_PORT%)...
cd /d "%BACK_DIR%"

if not exist "vendor\" (
    echo       Installation des dependances PHP ^(composer install^)...
    composer install --no-interaction --quiet
)

if not exist ".env" (
    echo       Creation du fichier .env...
    copy .env.example .env >nul
    php artisan key:generate --quiet
)

echo       Execution des migrations...
php artisan migrate --force --quiet >nul 2>&1

start "ArtSyre - Backend Laravel" /MIN cmd /c "php artisan serve --port=%BACKEND_PORT% > "%TEMP%\artsyre-back.log" 2>&1"
echo       OK - Backend demarre ^> http://localhost:%BACKEND_PORT%
echo.

REM ── 5. Frontend Angular ───────────────────────────────────────────────────────
echo [4/6] Demarrage du frontend Angular (port %FRONTEND_PORT%)...
cd /d "%FRONT_DIR%"

if not exist "node_modules\" (
    echo       Installation des dependances Node ^(npm install^)...
    npm install --silent
)

start "ArtSyre - Frontend Angular" /MIN cmd /c "npx ng serve --port=%FRONTEND_PORT% > "%TEMP%\artsyre-front.log" 2>&1"
echo       OK - Frontend demarre ^> http://localhost:%FRONTEND_PORT%
echo.

REM ── 6. Attente que les services soient prêts ──────────────────────────────────
echo [5/6] Attente de la disponibilite des services...

set /a TIMEOUT_BACK=0
:wait_back
    timeout /t 2 /nobreak >nul
    set /a TIMEOUT_BACK+=2
    netstat -ano | findstr ":%BACKEND_PORT% " | findstr "LISTENING" >nul 2>&1
    if errorlevel 1 (
        if !TIMEOUT_BACK! LSS 90 goto wait_back
        echo       [AVERT] Backend non disponible apres 90s - verifiez les logs
    ) else (
        echo       OK - Backend  pret
    )

set /a TIMEOUT_FRONT=0
:wait_front
    timeout /t 2 /nobreak >nul
    set /a TIMEOUT_FRONT+=2
    netstat -ano | findstr ":%FRONTEND_PORT% " | findstr "LISTENING" >nul 2>&1
    if errorlevel 1 (
        if !TIMEOUT_FRONT! LSS 120 goto wait_front
        echo       [AVERT] Frontend non disponible apres 120s - verifiez les logs
    ) else (
        echo       OK - Frontend pret
    )

echo.

REM ── 7. Ouverture du navigateur ────────────────────────────────────────────────
echo [6/6] Ouverture des pages dans le navigateur...
start "" "http://localhost:%BACKEND_PORT%"
timeout /t 1 /nobreak >nul
start "" "http://localhost:%FRONTEND_PORT%"

REM ── 7. Récapitulatif ──────────────────────────────────────────────────────────
echo.
echo  ==========================================
echo   ArtSyre est operationnel !
echo  ==========================================
echo.
echo   Application  -^>  http://localhost:%FRONTEND_PORT%
echo   API Backend  -^>  http://localhost:%BACKEND_PORT%
echo   Base donnees -^>  MySQL sur le port %MYSQL_PORT% ^(via WampServer^)
echo.
echo   Logs backend  : %TEMP%\artsyre-back.log
echo   Logs frontend : %TEMP%\artsyre-front.log
echo.
echo   Fermez cette fenetre pour arreter Laravel et Angular.
echo   WampServer continuera de tourner en arriere-plan.
echo  ==========================================
echo.

REM Garder la fenêtre ouverte — fermer = arrêt des services
pause >nul

REM ── 8. Nettoyage à la fermeture ───────────────────────────────────────────────
echo.
echo Arret des services...
for %%P in (%BACKEND_PORT% %FRONTEND_PORT%) do (
    for /f "tokens=5" %%a in ('netstat -ano ^| findstr ":%%P " ^| findstr "LISTENING" 2^>nul') do (
        taskkill /PID %%a /F >nul 2>&1
    )
)
echo Services arretes. A bientot !
timeout /t 2 /nobreak >nul
endlocal