@echo off
set CURRENT_DIR=%~dp0
set PYTHON_PATH=%CURRENT_DIR%..\venv\python_runtime
set LIB_PATH=%CURRENT_DIR%lib

:: On ajoute notre dossier lib au chemin de recherche de Python
set PYTHONPATH=%LIB_PATH%

echo Lancement du serveur (Mode Portable)...
"%PYTHON_PATH%\python.exe" httpd
pause