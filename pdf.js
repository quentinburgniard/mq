import puppeteer from 'puppeteer';
import Service from './service.js';

class PDF extends Service {
  constructor(authentication, service, parameters) {
    super(authentication, service, parameters);
    this.format = parameters.format || 'A4';
    this.url = parameters.url;
  }

  async execute() {
    let buffer = null;
    await puppeteer.launch({
      args: ['--no-sandbox', '--disable-setuid-sandbox']
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
      buffer = await page.pdf({
        format: this.format,
        printBackground: true
      });
      await Promise.all([browser.close(), this.complete()]);
    });
    return buffer;
  }
}

export default PDF;