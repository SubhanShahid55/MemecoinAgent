@echo off
echo Setting environment variables and running Next.js development server...

REM Install dependencies if needed
if not exist node_modules (
  echo Installing dependencies...
  npm install --legacy-peer-deps
)

REM Run Next.js with environment variables via npx
echo Starting Next.js development server...
npx next dev

echo Server stopped!
pause 