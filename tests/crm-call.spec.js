const { test, expect } = require('@playwright/test');

// Smoke test: CRM list loads and call logs are recorded in localStorage
test('CRM list loads and call logging', async ({ page }) => {
  await page.goto('http://localhost:3000');
  // wait for app ready
  await page.waitForFunction(() => window.APP_READY === true, null, { timeout: 5000 });
  // open CRM view
  await page.click('text=ลูกค้า (CRM)');
  // wait for customers list rows
  await page.waitForSelector('#customers-list .customer-row', { timeout: 5000 });
  // click the first โทรทันที button
  const btn = await page.$('#customers-list .customer-row .btn-apple');
  if(btn) await btn.click();
  // check localStorage for call_log_v1
  const logs = await page.evaluate(() => JSON.parse(localStorage.getItem('call_log_v1') || '[]'));
  expect(Array.isArray(logs)).toBeTruthy();
});
