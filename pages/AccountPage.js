const { Key } = require("selenium-webdriver");

const Page = require("./Page");
const logger = require("../logger");

const { LOADING_TIMEOUT } = require("../config/constants");

class AccountPage extends Page {
  static resourcesFileName = "user.properties";
  static languageXpath = `//*[@class='select-input-content']`;
  static profileXpath = `//*[@class='icon header-account-icon icon__animated']`;
  static mailSignInputXpath = `//*[@id='signin-email']`;
  static passwordSignInputXpath = `//*[@id='signin-password']`;
  static applySignXpath = `//*[@class='modal__signin-classic-signIn hoverable']`;
  static changePersonalDataXpath = `//*[@class='account__details-personal-data-change hoverable']`;
  static applyPersonalDataXpath = `//*[@class='account__details-personal-data-save-changes hoverable']`;
  static userNameXpath = `//*[@name='first_name']`;
  static userSurnameXpath = `//*[@name='last_name']`;
  static userPatronymicXpath = `//*[@name='middle_name']`;
  static userPhoneNumberXpath = `//*[@class='form-control booking-page__details-form-item-input']`;

  constructor(driver, props) {
    super(driver);
    this.props = props;
  }

  async changeLanguage() {
    return super.changeLanguage(this.defaultLanguage);
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
    const element = await this.findByXpath(AccountPage.profileXpath);
    await element.click();

    return this;
  }

  async fillSignInData() {
    logger.info(`Filling data into sign in form.`);

    const mail = await this.findByXpath(AccountPage.mailSignInputXpath);
    await mail.sendKeys(this.props.mail);
    await this.waitingLoad();
    const password = await this.findByXpath(AccountPage.passwordSignInputXpath);
    await password.sendKeys(this.props.password);
    await this.waitingLoad();

    return this;
  }

  async applySignIn() {
    logger.info(`Applying data into sign in form.`);

    const apply = await this.findByXpath(AccountPage.applySignXpath);
    await apply.click();
    
    return this;
  }

  async clickChangePersonalData() {
    logger.info(`Clicking "Change" button in personal data.`);

    await this.waitingLoad();
    const element = await this.findByXpath(AccountPage.changePersonalDataXpath);
    await element.click();

    return this;
  }

  async fillPersonalData() {
    logger.info(`Filling data into personal data.`);

    const userName = await this.findByXpath(AccountPage.userNameXpath);
    await userName.sendKeys(Key.CONTROL + "a");
    await userName.sendKeys(Key.DELETE);
    await userName.sendKeys(this.props.name);
    await this.waitingLoad();
    const userSurname = await this.findByXpath(AccountPage.userSurnameXpath);
    await userSurname.sendKeys(Key.CONTROL + "a");
    await userSurname.sendKeys(Key.DELETE);
    await userSurname.sendKeys(this.props.surname);
    await this.waitingLoad();
    const userPatronymic = await this.findByXpath(AccountPage.userPatronymicXpath); 
    await userPatronymic.sendKeys(Key.CONTROL + "a");
    await userPatronymic.sendKeys(Key.DELETE);
    await userPatronymic.sendKeys(this.props.patronymic);
    await this.waitingLoad();
    const userPhoneNumber = await this.findByXpath(AccountPage.userPhoneNumberXpath); 
    await userPhoneNumber.sendKeys(Key.CONTROL + "a");
    await userPhoneNumber.sendKeys(Key.DELETE);
    await userPhoneNumber.sendKeys(this.props.phoneNumber);
    await this.waitingLoad();

    return this;
  }

  async clearPersonalData() {
    logger.info(`Clearing personal data.`);

    const userName = await this.findByXpath(AccountPage.userNameXpath);
    await userName.sendKeys(Key.CONTROL + "a");
    await userName.sendKeys(Key.DELETE);
    await this.waitingLoad();
    const userSurname = await this.findByXpath(AccountPage.userSurnameXpath);
    await userSurname.sendKeys(Key.CONTROL + "a");
    await userSurname.sendKeys(Key.DELETE);
    await this.waitingLoad();
    const userPatronymic = await this.findByXpath(AccountPage.userPatronymicXpath); 
    await userPatronymic.sendKeys(Key.CONTROL + "a");
    await userPatronymic.sendKeys(Key.DELETE);
    await this.waitingLoad();
    const userPhoneNumber = await this.findByXpath(AccountPage.userPhoneNumberXpath); 
    await userPhoneNumber.sendKeys(Key.CONTROL + "a");
    await userPhoneNumber.sendKeys(Key.DELETE);
    await this.waitingLoad();

    return this;
  }

  async applyPersonalData() {
    logger.info(`Applying data into personal data.`);

    const apply = await this.findByXpath(AccountPage.applyPersonalDataXpath);
    await apply.click();

    return this;
  }

  async isUserApplied(message) {
    logger.info(`Checking if the user is applied.`);

    const textMessageElement = await this.findByXpath(`//p[contains(text(), '${message}')]`);

    return textMessageElement ? true : false;
  }
  
  async isUserSignInError() {
    logger.info(`Checking if the user is not signed in.`);

    const textMessageElement = await this.findByXpath(`//p[contains(text(), '${this.userSignInMessage}')]`);

    return textMessageElement ? true : false;
  }
}
module.exports = AccountPage;