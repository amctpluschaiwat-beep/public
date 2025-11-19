# T-Asset-System (local dev)

Local single-file UI (public/index.html) and a small upload server for development.

Quick start (Windows PowerShell):

```powershell
cd 'C:\Users\pok_t\t-asset-system\public'
npm install
# Start server (no upload token):
npm start
# OR start server with a required upload token (clients must send header x-upload-token):
$env:UPLOAD_TOKEN='your-secret-token'; node server.js
```

Uploads

- The server exposes `POST /upload` accepting multipart form field `files` (multiple allowed, max 5 files, 10MB each).
- Server performs extension + MIME checks and content-type sniffing (via `file-type`) and will reject spoofed or disallowed files.
- To enable token protection set environment variable `UPLOAD_TOKEN` before running `node server.js`. Clients must send `x-upload-token` header with that value.

Client notes

- The client will include `x-upload-token` automatically if `window.UPLOAD_TOKEN` is set in the browser (for local testing you can edit `public/index.html` and add a script block near the top like: `<script>window.UPLOAD_TOKEN = 'your-secret-token';</script>`).
- Client-side allowed extensions: `jpg,jpeg,png,gif,pdf,mp3,wav,m4a,txt` and per-file limit 10MB.

Security

- This server is intended for local development only. For production, use cloud storage with presigned URLs, an authenticated upload service, virus scanning, and more robust content validation.

Files of interest

- `public/index.html` — single-file frontend UI and client logic
- `server.js` — small Express upload server
- `package.json` — project manifest
- `uploads/` — directory where uploaded files are stored (ignored in `.gitignore`)

If you want, I can:
- Restart the server with `UPLOAD_TOKEN` enabled and run an upload test that shows rejection when token missing and success when token provided.
- Implement presigned uploads to S3 or similar for production.
