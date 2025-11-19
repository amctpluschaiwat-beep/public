REWORK REPORT - CRM & Contact Fixes

Date: 2025-11-19

Summary
- Reworked the Customers/CRM UI to present one-line rows per customer.
- Added direct-call support and call logging for analytics.
- Added a floating contract detail modal for quick timeline posts without navigating away from CRM.
- Added a settings input to configure a custom Yalecom call template (e.g. `yalecom://call?to=%s`).
- Added a Call Logs viewer modal to inspect and clear recent call logs saved in `localStorage`.
- Implemented payment-quality manual override stored in `localStorage` for reviewer/testing purposes.
- Added a Playwright smoke test (file: `public/tests/crm-call.spec.js`) to assert CRM list loads and call logs are recorded.

Files changed
- `public/index.html` — CRM layout, call logging, modals, settings.
- `public/REWORK_REPORT.md` — this report.
- `public/tests/crm-call.spec.js` — smoke test file (added).

How the CRM grouping works
- Customers are grouped by `name|phone` key taken from contract objects.
- Each row shows: representative contract ID, name, nationalId (if present), address (if present), phone, quick-contract count via the detail modal.

Call logging & Yalecom
- Calls are recorded to `localStorage` key: `call_log_v1` as array of {time, phone, customer, contractId, method}.
- Default call URL: `tel:` scheme.
- To use Yalecom: set the template in Settings > "Yalecom call template" using `%s` placeholder for phone number (e.g. `yalecom://call?to=%s`).

Testing locally
1. Start local dev server (if you have the express upload server):

```powershell
# from repository root
node public/server.js
# then open http://localhost:3000 (or whichever port server.js uses)
```

2. Open the app and click "ลูกค้า (CRM)" to view customers. Use "โทรทันที" to test call logging.
3. Open Settings and click "View Call Logs" to inspect logs.

Next steps (recommended)
- Replace client-side auth with server-backed or Firebase Auth (after UI sign-off).
- Expand Playwright tests to fully cover contract lifecycle (approve/active/asset return) and attachments uploads.
- Migrate call logs to server/analytics if you want central tracking.

Contact
- If this matches your expectation, I'll commit the changes to `rework/full-requirements` and prepare the PR description.
