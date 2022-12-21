const { Key } = require("selenium-webdriver");

const Page = require("./Page");
const logger = require("../logger");

const { LOADING_TIMEOUT } = require("../config/constants");

class HomePage extends Page {
  static resourcesFileName = "homePage.properties";

  constructor(driver, props) {
    super(driver);
    this.props = props;
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
    const yourOrderElement = await this.findByXpath(`//span[contains(text(), 'Ваш заказ')]`); // вывести в статик икспас
    await yourOrderElement.click();

    return this;
  }

  async clickToCart() {
    logger.info(`Clicking cart button.`);
    const yourOrderElement = await this.findByXpath(`//*[@class='header-cart-total-cost']`); // вывести в статик икспас
    await yourOrderElement.click();

    return this;
  }

  async fillData() {
    logger.info(`Filling data into order check modal.`);
    const orderNumber = await this.findByXpath(`//*[@id='modal-status-number']`); // вывести в статик икспас
    await orderNumber.sendKeys(this.props.number);
    const orderPassword = await this.findByXpath(`//*[@id='modal-status-secret']`); // вывести в статик икспас
    await orderPassword.sendKeys(this.props.password, Key.ENTER);

    return this;
  }

  async fillPromocode() {
    logger.info(`Filling promocode into promo input.`);
    const promocode = await this.findByXpath(`//*[@class='modal__cart-promo-code-input']`); // вывести в статик икспас
    await promocode.sendKeys(this.props.promocode, Key.ENTER);

    return this;
  }

  async isOrderCheckError() {
    logger.info(`Checking if the order check error is appeared.`);
    const textMessageElement = await this.findByXpath(`//p[contains(text(), '${this.props.message}')]`); // вывести в статик икспас

    return textMessageElement ? true : false;
  }

  async isPromocodeError() {
    logger.info(`Checking if the promocode error is appeared.`);
    const textMessageElement = await this.findByXpath(`//p[contains(text(), '${this.props.message}')]`); // вывести в статик икспас

    return textMessageElement ? true : false;
  }
}

module.exports = HomePage;