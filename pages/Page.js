const { By, until } = require("selenium-webdriver");
const logger = require("../logger");
const DataReader = require("../services/DataReaderService");

const { LOADING_TIME, LOADING_TIMEOUT } = require("../config/constants");

class Page {
  constructor(driver) {
    this.driver = driver;
  }

  async openPage(url) {
    logger.info(`Opening ${url} page.`);
    await this.driver.get(url);
    await this.waitingLoad(LOADING_TIMEOUT);

    return this;
  }

  async getPageURL() {
    logger.info("Getting url of the current page.");

    const url = await this.driver.getCurrentUrl();

    return url;
  }

  async getItemText(item){
    logger.info("Getting the item text.");
    return await item.getText();
  }

  async findByXpath(xpath) {
    // log
    return this.driver.wait(until.elementLocated(By.xpath(xpath)), LOADING_TIME)
  }

  async findAllByXpath(xpath) {
    // log
    return this.driver.wait(until.elementsLocated(By.xpath(xpath)), LOADING_TIME);
  }

  async clickByXpath(xpath) {
    // log
    const element = await this.findByXpath(xpath);
    await element.click();

    return this;
  }

  async loadProperties(fileName) {
    // log
    const props = await DataReader.getTestData(`${fileName}`);

    for (const key in props) {
        this[key] = props[key];
    }

    return this;
  }

  async waitingLoad(time){
    logger.info(`Waiting for page load. (${time} ms)`);
    await this.driver.sleep(time);

    return this;
  }
}

module.exports = Page;