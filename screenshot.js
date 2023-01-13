import puppeteer from 'puppeteer';
import Service from './service.js';

class Screenshot extends Service {
  constructor(authentication, service, parameters) {
    super(authentication, service, parameters);
    this.height = parameters.height || 1080;
    this.url = parameters.url
    this.width = parameters.width || 1920;
  }

  async execute() {
    console.log('execute');
    await puppeteer.launch({
      defaultViewport: {
        height: this.height,
        width: this.width
      }
    }).then(async (browser) => {
      const page = await browser.newPage();
      await page.goto(this.url);
      page.screenshot({
        quality: 100,
        type: 'jpeg'
      });
      await browser.close();
      console.log('browser close');
    });
    console.log('response');
    return 'ok';
  }
}

export default Screenshot;