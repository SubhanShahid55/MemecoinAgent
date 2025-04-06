@echo off
echo Deploying to Vercel with PayPal and Stripe credentials...

REM Set environment variables for deployment
echo Setting environment variables...
set VERCEL_PROJECT_ID=memecoinsagent

REM Deploy to Vercel with environment variables
echo Running deployment with correct environment variables...
npx vercel deploy --prod --env PAYPAL_CLIENT_ID=Aas2med3Ch9YjkHRTHx_QtNo1Xa5liC2D6yDa3QCAy9NSjbiMeETGqdQxDSmpxZPGAhnAwIaLGGNHX5y --env PAYPAL_CLIENT_SECRET=EJ5Anqo6la4Jz2kFwACfCRjB3QlU-3vLjZSQEZEO2U69sqM5kDttBcJvA09EwQhzzkD8PtcLDapajVI6 --env NODE_ENV=production --env NEXT_PUBLIC_BASE_URL=https://memecoinsagent-qjrtorr6u-subhanshahid55s-projects.vercel.app

echo Deployment complete!
pause 