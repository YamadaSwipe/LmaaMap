@echo off
REM Script de sauvegarde pour Windows - LmaaWater
REM À exécuter avant toute modification importante

set datetime=%date:~-4,4%%date:~-10,2%%date:~-7,2%_%time:~0,2%%time:~3,2%%time:~6,2%
set datetime=%datetime: =0%
set BACKUP_DIR=backups\backup_%datetime%

echo 🔄 Création de la sauvegarde...
mkdir "%BACKUP_DIR%" 2>nul

REM Sauvegarder le code source
xcopy src "%BACKUP_DIR%\src\" /E /I /Q
xcopy prisma "%BACKUP_DIR%\prisma\" /E /I /Q
copy package.json "%BACKUP_DIR%\" >nul
copy next.config.* "%BACKUP_DIR%\" >nul 2>nul

REM Sauvegarder la base de données
copy prisma\dev.db "%BACKUP_DIR%\" >nul 2>nul

echo ✅ Sauvegarde créée dans %BACKUP_DIR%
echo 📁 Contient: src/, prisma/, package.json, base de données
pause