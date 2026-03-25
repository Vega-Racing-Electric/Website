import puppeteer from 'puppeteer';

(async () => {
    try {
        const browser = await puppeteer.launch({ headless: "new" });
        const page = await browser.newPage();

        page.on('console', msg => console.log('BROWSER_CONSOLE:', msg.text()));
        page.on('pageerror', error => console.log('BROWSER_PAGE_ERROR:', error.message));

        await page.goto('http://localhost:5173/', { waitUntil: 'networkidle0' });

        const content = await page.content();
        console.log("HTML length:", content.length);
        console.log("Root content:", await page.evaluate(() => document.getElementById('root')?.innerHTML.substring(0, 500)));

        await new Promise(r => setTimeout(r, 6000));
        console.log("After 6 seconds root:", await page.evaluate(() => document.getElementById('root')?.innerHTML.substring(0, 500)));

        await browser.close();
    } catch (e) {
        console.error(e);
    }
})();
