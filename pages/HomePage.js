const { Key } = require("selenium-webdriver");

const Page = require("./Page");
const logger = require("../logger");

const { LOADING_TIMEOUT } = require("../config/constants");

class HomePage extends Page {
  static resourcesFileName = "homePage.properties";
  static yourOrderXpath = `//span[contains(text(), 'Ваш заказ')]`;
  static cartXpath = `//*[@class='header-cart-total-cost']`;
  static orderNumberXpath = `//*[@id='modal-status-number']`;
  static orderPasswordXpath = `//*[@id='modal-status-secret']`;
  static promocodeXpath = `//*[@class='modal__cart-promo-code-input']`;

  constructor(driver, props) {
    super(driver);
    this.props = props;
  }

  async changeLanguage() {
    return super.changeLanguage(this.defaultLanguage);
  }

  async openPage() {
    return super.openPage(this.homeUrl);
  }

  async loadProperties() {
    return super.loadProperties(HomePage.resourcesFileName);
  }

  async waitingLoad() {
    return super.waitingLoad(LOADING_TIMEOUT);
  }

  async clickYourOrder() {
    logger.info(`Clicking "Your order" button.`);

    const element = await this.findByXpath(HomePage.yourOrderXpath);
    await element.click();

    return this;
  }

  async clickToCart() {
    logger.info(`Clicking cart button.`);

    const element = await this.findByXpath(HomePage.cartXpath); 
    await element.click();

    return this;
  }

  async fillData() {
    logger.info(`Filling data into order check modal.`);

    const orderNumber = await this.findByXpath(HomePage.orderNumberXpath);
    await orderNumber.sendKeys(this.props.number);
    const orderPassword = await this.findByXpath(HomePage.orderPasswordXpath);
    await orderPassword.sendKeys(this.props.password, Key.ENTER);

    return this;
  }

  async fillPromocode() {
    logger.info(`Filling promocode into promo input.`);

    const promocode = await this.findByXpath(HomePage.promocodeXpath);
    await promocode.sendKeys(this.props.promocode, Key.ENTER);

    return this;
  }

  async isOrderCheckError() {
    logger.info(`Checking if the order check error is appeared.`);

    const textMessageElement = await this.findByXpath(`//p[contains(text(), '${this.props.message}')]`);

    return textMessageElement ? true : false;
  }

  async isPromocodeError() {
    logger.info(`Checking if the promocode error is appeared.`);

    const textMessageElement = await this.findByXpath(`//p[contains(text(), '${this.props.message}')]`);

    return textMessageElement ? true : false;
  }
}

module.exports = HomePage;