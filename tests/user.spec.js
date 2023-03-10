const { expect } = require("chai");
require("chromedriver");
const Driver = require("../driver/Driver");
const DataReader = require("../services/DataReaderService");

const AccountPage = require("../pages/AccountPage");
const User = require("../models/User");

const { TEST_TIMEOUT } = require("../config/constants");

describe("Editing and applying user personal data.", function () {
  before(async function () {
    const userProps = await DataReader.getTestData("user.properties");
    for (const key in userProps) {
        this[key] = userProps[key];
    }
  });

  beforeEach(async function () {
    this.driver = await Driver.getInstance();
  });

  it("Should apply change of personal data.", async function () {
    const user = new User(this.userName, this.userSurname, this.userPatronymic, this.userMail, this.userPassword, this.userPhoneNumber);

    const accountPage = new AccountPage(this.driver, user);
    await accountPage.loadProperties();
    await accountPage.openPage();
    await accountPage.changeLanguage();
    await accountPage.clickToProfile();
    await accountPage.fillSignInData();
    await accountPage.applySignIn();
    await accountPage.clickChangePersonalData();
    await accountPage.fillPersonalData();
    await accountPage.applyPersonalData();

    const userApplied = await accountPage.isUserApplied(this.userCorrectMessage);
    expect(userApplied).to.be.true;
  }).timeout(TEST_TIMEOUT);

  it("Should get sign in error.", async function () {
    const user = new User(this.userName, this.userSurname, this.userPatronymic, this.userMail, this.userIncorrectPassword, this.userPhoneNumber);

    const accountPage = new AccountPage(this.driver, user);
    await accountPage.loadProperties();
    await accountPage.openPage();
    await accountPage.changeLanguage();
    await accountPage.clickToProfile();
    await accountPage.fillSignInData();
    await accountPage.applySignIn();

    const userSignInError = await accountPage.isUserSignInError();
    expect(userSignInError).to.be.true;
  }).timeout(TEST_TIMEOUT);

  it("Should not apply change of personal data.", async function () {
    const user = new User(this.userName, this.userSurname, this.userPatronymic, this.userMail, this.userPassword, this.userIncorrectPhoneNumber);

    const accountPage = new AccountPage(this.driver, user);
    await accountPage.loadProperties();
    await accountPage.openPage();
    await accountPage.changeLanguage();
    await accountPage.clickToProfile();
    await accountPage.fillSignInData();
    await accountPage.applySignIn();
    await accountPage.clickChangePersonalData();
    await accountPage.clearPersonalData();
    await accountPage.fillPersonalData();
    await accountPage.applyPersonalData();

    const userApplied = await accountPage.isUserApplied(this.userIncorrectPhoneNumberMessage);
    expect(userApplied).to.be.true;
  }).timeout(TEST_TIMEOUT);

  afterEach(async function () {
    if (this.currentTest.state !== "passed") {
      const image = await this.driver.takeScreenshot();
      await require('fs').writeFile(
          './screenshots/userFail.png',
          image,
          'base64',
          (err) => {});
    }

    await Driver.killDriver();
  });
});