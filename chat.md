vivekkashyap0712@novafuze-server:~/NovaFuze_Website$ # Test OPTIONS preflight
curl -X OPTIONS \
  -H "Origin: https://novafuze.in" \
  -H "Access-Control-Request-Method: POST" \
  -H "Access-Control-Request-Headers: content-type" \
  -v https://api.novafuze.in/api/sessionLogin 2>&1 | grep -i "access-control"
> Access-Control-Request-Method: POST
> Access-Control-Request-Headers: content-type
< Access-Control-Allow-Origin: https://novafuze.in
< Access-Control-Allow-Credentials: true
< Access-Control-Allow-Methods: GET,POST,PUT,DELETE,OPTIONS
< Access-Control-Allow-Headers: Content-Type,Authorization
vivekkashyap0712@novafuze-server:~/NovaFuze_Website$ pm2 restart novafuze-backend
pm2 logs novafuze-backend --lines 10
Use --update-env to update environment variables
[PM2] Applying action restartProcessId on app [novafuze-backend](ids: [ 0 ])
[PM2] [novafuze-backend](0) ✓
┌────┬────────────────────┬──────────┬──────┬───────────┬──────────┬──────────┐
│ id │ name               │ mode     │ ↺    │ status    │ cpu      │ memory   │
├────┼────────────────────┼──────────┼──────┼───────────┼──────────┼──────────┤
│ 0  │ novafuze-backend   │ fork     │ 25   │ online    │ 0%       │ 16.7mb   │
│ 4  │ novafuze-mcp       │ fork     │ 11   │ online    │ 0%       │ 3.2mb    │
└────┴────────────────────┴──────────┴──────┴───────────┴──────────┴──────────┘
[TAILING] Tailing last 10 lines for [novafuze-backend] process (change the value with --lines option)
/home/vivekkashyap0712/.pm2/logs/novafuze-backend-error.log last 10 lines:
0|novafuze |   error: { code: 'BAD_REQUEST_ERROR', description: 'Authentication failed' }
0|novafuze | }
0|novafuze | Error creating Razorpay order: {
0|novafuze |   statusCode: 401,
0|novafuze |   error: { code: 'BAD_REQUEST_ERROR', description: 'Authentication failed' }
0|novafuze | }
0|novafuze | Error creating Razorpay order: {
0|novafuze |   statusCode: 401,
0|novafuze |   error: { description: 'Authentication failed', code: 'BAD_REQUEST_ERROR' }
0|novafuze | }

/home/vivekkashyap0712/.pm2/logs/novafuze-backend-out.log last 10 lines:
0|novafuze | DEBUG: userData to be saved: {
0|novafuze |   uid: '7lf8gHKoIBOmcqezNkPfFxSd7mm1',
0|novafuze |   lastLogin: '2025-11-10T08:42:46.200Z',
0|novafuze |   email: 'vamsikrishna.b2410@gmail.com',
0|novafuze |   displayName: 'vamsikrishna reddy',
0|novafuze |   photoURL: 'https://lh3.googleusercontent.com/a/ACg8ocJSrUWljdw53q9-F6EB1LrxV1uCb-ptscgrp-jOSsnE9hQmow=s96-c'
0|novafuze | }
0|novafuze | ✅ Server running on port 3000
0|novafuze | ✅ Server running on port 3000
0|novafuze | ✅ Server running on port 3000

0|novafuze-backend  | ✅ Server running on port 3000
