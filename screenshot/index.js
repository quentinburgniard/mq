import Service from "service";
import puppeteer from "puppeteer";

class Screenshot extends Service {
  constructor(authentication, service, parameters) {
    super(authentication, service);
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
      return page.screenshot({
        quality: 100,
        type: 'jpeg'
      });
      await browser.close();
    });
    return response;
  }
}

module.exports = Screenshot;