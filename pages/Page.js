const { By, until } = require("selenium-webdriver");
const logger = require("../logger");
const DataReader = require("../services/DataReaderService");

const { LOADING_TIME, LOADING_TIMEOUT, LANGUAGE } = require("../config/constants");

class Page {
  static languageXpath = `//*[@class='select-input-content']`;

  constructor(driver) {
    this.driver = driver;
  }

  async changeLanguage(language) {
    if (language === LANGUAGE) {
      logger.info(`Changing default language.`);


      await this.waitingLoad();
      const element = await this.findByXpath(Page.languageXpath);
      await element.click();
      
      const select = await this.findByXpath(`//*[contains(text(), '${language}')]`);
      await select.click();
    }

    return this;
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
    logger.info(`Finding by Xpath.`);

    return this.driver.wait(until.elementLocated(By.xpath(xpath)), LOADING_TIME);
  }

  async findAllByXpath(xpath) {
    logger.info(`Finding all by Xpath.`);

    return this.driver.wait(until.elementsLocated(By.xpath(xpath)), LOADING_TIME);
  }

  async clickByXpath(xpath) {
    logger.info(`Clicking by Xpath.`);

    const element = await this.findByXpath(xpath);
    await element.click();

    return this;
  }

  async loadProperties(fileName) {
    logger.info(`Loading properties from ${fileName}.`);

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