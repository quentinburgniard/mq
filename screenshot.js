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
    return await puppeteer.launch({
      args: ['--no-sandbox', '--disable-setuid-sandbox'],
      defaultViewport: {
        height: this.height,
        width: this.width
      }
    }).then(async (browser) => {
      const page = await browser.newPage();
      await page.goto(this.url);
      let buffer = await page.screenshot({
        quality: 100,
        type: 'jpeg'
      });
      Promise.all([browser.close(), this.complete()]).then(() => {
        return buffer;
      });
    });
  }
}

export default Screenshot;