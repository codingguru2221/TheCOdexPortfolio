@echo off
set BASE_PATH=/
set VITE_API_PROXY_TARGET=http://127.0.0.1:8787

start "portfolio-api" cmd /k "set PORT=8787&&pnpm --filter @workspace/api-server run dev"

timeout /t 2 /nobreak >nul

set PORT=5173
set BASE_PATH=/
pnpm --filter @workspace/portfolio run dev
