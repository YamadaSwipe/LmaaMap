@echo off
cd /d "%~dp0"
echo ========================================
echo    DEMARRAGE SERVEUR LMAAMAP/GREENYOU
echo ========================================
echo.
echo Serveur disponible sur :
echo   - http://localhost:3000
echo   - http://localhost:3000/hebergement
echo.
echo IMPORTANT : NE FERMEZ PAS CETTE FENETRE !
echo            Appuyez sur Ctrl+C pour arreter
echo.
echo ========================================
npm run dev
pause
