import puppeteer from 'puppeteer';
import Service from './service.js';

class Screenshot extends Service {
  constructor(authentication, service, parameters) {
    super(authentication, service, parameters);
    this.height = parameters.height || 1080;
    this.url = parameters.url;
    this.width = parameters.width || 1920;
  }

  async execute() {
    let buffer = null;
    await puppeteer.launch({
      args: ['--no-sandbox', '--disable-setuid-sandbox'],
      defaultViewport: {
        height: this.height,
        width: this.width
      }
    }).then(async (browser) => {
      const page = await browser.newPage();
      await page.setCookie({
        'domain': '.digitalleman.com',
        'name': 't',
        'value': this.authentication.api
      });
      await page.goto(this.url, {
        waitUntil: 'networkidle0'
      });
      buffer = await page.screenshot({
        quality: 100,
        type: 'jpeg'
      });
      await Promise.all([browser.close(), this.complete()]);
    });
    return buffer;
  }
}

export default Screenshot;