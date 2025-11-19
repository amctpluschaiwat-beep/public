const { test, expect } = require('@playwright/test');
const path = require('path');
const fs = require('fs');

test.describe('Upload API', () => {
  const base = 'http://localhost:3000';

  test('multipart upload multiple files to /upload', async ({ request }) => {
    const f1 = path.resolve(__dirname, '..', 'sample-upload-1.txt');
    const f2 = path.resolve(__dirname, '..', 'sample-upload-2.txt');
    expect(fs.existsSync(f1)).toBeTruthy();
    expect(fs.existsSync(f2)).toBeTruthy();

    const uploadResp = await request.post(`${base}/upload`, {
      headers: { 'x-upload-token': 'dev-token' },
      multipart: [
        { name: 'files', buffer: fs.readFileSync(f1), fileName: 'sample-upload-1.txt', mimeType: 'text/plain' },
        { name: 'files', buffer: fs.readFileSync(f2), fileName: 'sample-upload-2.txt', mimeType: 'text/plain' }
      ]
    });

    const status = uploadResp.status();
    const bodyText = await uploadResp.text();
    console.log('MULTI_UPLOAD_RESPONSE', status, bodyText);

    expect(uploadResp.ok()).toBeTruthy();
    const json = JSON.parse(bodyText || '{}');
    expect(json.files).toBeTruthy();
    expect(json.files.length).toBeGreaterThanOrEqual(2);
  });
});
