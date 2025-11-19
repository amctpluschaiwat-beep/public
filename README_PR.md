PR Preparation: Mock Data preview and release steps

Purpose
- Provide a lightweight way to preview the web UI flows for reviewers without running the upload server or creating complex fixtures.
- Provide branch/PR instructions so you or reviewers can open a quick PR showing the mock-data changes.

Files added
- `mock-data.json`: sample contracts + assets used by `app.loadMockData()` in `index.html`.
- `README_PR.md`: these instructions and quick steps.

How to preview locally (fast)
1. Open the project folder `public` in a browser directly (no server required):
   - Double-click `index.html` or open `file:///.../public/index.html` in Chrome. Most features work from local file, but uploads require the upload server.
2. Click `Workstation → รายการทั้งหมด` (or the "รายการสัญญา" menu) to open the list view.
3. Click the `Load Mock Data` button near the top-right controls. Confirm replacement when prompted.
4. The app will load `mock-data.json` and save into `localStorage`. You can then browse contracts, open details, and exercise Timeline / Payments (client-only).

How to create a PR for reviewers (suggested branch)
1. Create a new branch locally:

```powershell
cd 'C:\Users\pok_t\t-asset-system\public'
# from repo root you may need to cd .. to the repo root before git commands
cd ..
git checkout -b feature/mock-preview
```

2. Add the changes and commit:

```powershell
git add public/mock-data.json public/index.html public/README_PR.md
git commit -m "feat: add mock-data + loadMockData for PR preview"
```

3. Push and open PR (using GitHub CLI):

```powershell
git push --set-upstream origin feature/mock-preview
# then use gh to open a PR
gh pr create --title "feat: mock preview for rapid PR review" --body-file public/pr_description.txt --base main
```

If you cannot use `gh`, push and open a PR through GitHub web UI; include `public/pr_description.txt` as the PR body.

Notes
- The mock data replaces localStorage; reviewers can still press `Reset Data` to restore the built-in sample dataset.
- Uploads still require `server.js` to be running; the mock preview is meant for UX/flow review only.

Next steps I can do for you
- Create a branch and open the PR automatically (requires git and gh installed & configured here).
- Implement remaining QC fixes and run Playwright tests before marking PR ready for QA.
- Prepare deployment instructions and a simple one-click start script for hosting.
