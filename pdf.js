import puppeteer from 'puppeteer';
import Service from './service.js';

class PDF extends Service {
  constructor(authentication, service, parameters) {
    super(authentication, service, parameters);
    this.format = parameters.format || 'A4';
  }

  async execute() {
    return await puppeteer.launch().then(async (browser) => {
      const page = await browser.newPage();
      await page.goto(this.url);
      let buffer = await page.pdf({
        format: this.format,
        printBackground: true
      });
      Promise.all([browser.close(), this.complete()]).then(() => {
        return buffer;
      });
    });
  }
}

export default PDF;