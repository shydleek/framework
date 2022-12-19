const { By, until } = require("selenium-webdriver");

const logger = require("../logger");

class Page {
  constructor(driver) {
    this.driver = driver;
  }

  async openPage(url) {
    logger.info(`Opening page with url: ${url}.`);
    await this.driver.get(url);

    return this;
  }

  async getPageUrl() {
    logger.info(`Getting page url.`);
    return this.driver.getCurrentUrl();
  }

  async findByXpath(xpath) {
    logger.info("Searching for the element via xpath.");
    return this.driver.wait(until.elementLocated(By.xpath(xpath)), 5000);
  }

  async clickByXpath(xpath) {
    const element = await this.findByXpath(xpath);
    await element.click();

    return this;
  }

  async waitPageLoad(time){
    logger.info("Waiting for page load.");
    await this.driver.sleep(time);

    return this;
  }
}

module.exports = Page;