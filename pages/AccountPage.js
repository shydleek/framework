const { Key } = require("selenium-webdriver");

const Page = require("./Page");
const logger = require("../logger");

const { LOADING_TIMEOUT } = require("../config/constants");

class AccountPage extends Page {
  static resourcesFileName = "user.properties";

  constructor(driver, props) {
    super(driver);
    this.props = props;
  }

  async openPage() {
    return super.openPage(this.accountUrl);
  }

  async loadProperties() {
    return super.loadProperties(AccountPage.resourcesFileName);
  }

  async waitingLoad() {
    return super.waitingLoad(LOADING_TIMEOUT);
  }
  
  async clickToProfile() {
    logger.info(`Clicking profile button.`);
    await this.waitingLoad();
    const element = await this.findByXpath(`//*[@class='icon header-account-icon icon__animated']`); // вывести в статик икспас
    await element.click();

    return this;
  }

  async fillSignInData() {
    logger.info(`Filling data into sign in form.`);
    const mail = await this.findByXpath(`//*[@id='signin-email']`); // вывести в статик икспас
    await mail.sendKeys(this.props.mail);
    await this.waitingLoad();
    const password = await this.findByXpath(`//*[@id='signin-password']`); // вывести в статик икспас
    await password.sendKeys(this.props.password);
    await this.waitingLoad();

    return this;
  }

  async applySignIn() {
    logger.info(`Applying data into sign in form.`);
    const apply = await this.findByXpath(`//*[@class='modal__signin-classic-signIn hoverable']`); // вывести в статик икспас
    await apply.click();
    
    return this;
  }

  async clickChangePersonalData() {
    logger.info(`Clicking "Change" button in personal data.`);
    await this.waitingLoad();
    const element = await this.findByXpath(`//*[@class='account__details-personal-data-change hoverable']`); // вывести в статик икспас
    await element.click();

    return this;
  }

  async clickChangeDeliveryAddress() {
    logger.info(`Clicking "Change" button in delivery address.`);
    await this.waitingLoad();
    const element = await this.findByXpath(`//*[@class='account__details-delivery-change']`); // вывести в статик икспас
    await element.click();

    return this;
  }

  async clickChangePassword() {
    logger.info(`Clicking "Change" button in password.`);
    await this.waitingLoad();
    const element = await this.findByXpath(`//*[@class='account__details-reset-password-change']`); // вывести в статик икспас
    await element.click();

    return this;
  }

  async fillPersonalData() {
    logger.info(`Filling data into personal data.`);
    const userName = await this.findByXpath(`//*[@name='first_name']`); // вывести в статик икспас
    await userName.sendKeys(this.props.name);
    await this.waitingLoad();
    const userSurname = await this.findByXpath(`//*[@name='last_name']`); // вывести в статик икспас
    await userSurname.sendKeys(this.props.surname);
    await this.waitingLoad();
    const userPatronic = await this.findByXpath(`//*[@name='middle_name']`); // вывести в статик икспас
    await userPatronic.sendKeys(this.props.patronic);
    await this.waitingLoad();
    const userPhoneNumber = await this.findByXpath(`//*[@class='form-control booking-page__details-form-item-input']`); // вывести в статик икспас
    await userPhoneNumber.sendKeys(this.props.phoneNumber);
    await this.waitingLoad();

    return this;
  }

//   async fillDeliveryAddress() {
//     logger.info(`Filling data into delivery address.`);
//     const orderNumber = await this.findByXpath(`//*[@id='modal-status-number']`); // вывести в статик икспас
//     await orderNumber.sendKeys(this.props.number);
//     const orderPassword = await this.findByXpath(`//*[@id='modal-status-secret']`); // вывести в статик икспас
//     await orderPassword.sendKeys(this.props.password, Key.ENTER);

//     return this;
//   }

//   async fillNewPassword() {
//     logger.info(`Filling new password.`);
//     const orderNumber = await this.findByXpath(`//*[@id='modal-status-number']`); // вывести в статик икспас
//     await orderNumber.sendKeys(this.props.number);
//     const orderPassword = await this.findByXpath(`//*[@id='modal-status-secret']`); // вывести в статик икспас
//     await orderPassword.sendKeys(this.props.password, Key.ENTER);

//     return this;
//   }

  async applyPersonalData() {
    logger.info(`Applying data into personal data.`);
    const apply = await this.findByXpath(`//*[@class='account__details-personal-data-save-changes hoverable']`); // вывести в статик икспас
    await apply.click();

    return this;
  }

//   async applyDeliveryAddress() {
//     logger.info(`Applying data into delivery address.`);
//   }

//   async applyNewPassword() {
//     logger.info(`Applying new password.`);
//   }

  async isUserApplied() {
    logger.info(`Checking if the user is applied.`);
    const textMessageElement = await this.findByXpath(`//p[contains(text(), '${this.userCorrectMessage}')]`); // вывести в статик икспас

    return textMessageElement ? true : false;
  }
}
module.exports = AccountPage;