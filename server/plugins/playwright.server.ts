export default defineNitroPlugin(async (nitroApp) => {
   if (process.env.ENABLE_PLAYWRIGHT !== 'true') {
    return;
  }
  const { chromium } = await import('playwright');
  const browser = await chromium.launch({
    headless: true,
    args: ['--disable-gpu', '--single-process'],
  });
  nitroApp.hooks.hook('close', async () => {
    await browser.close();
  });
});