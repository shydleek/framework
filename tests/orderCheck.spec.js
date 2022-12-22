const { expect } = require("chai");
require("chromedriver");
const Driver = require("../driver/Driver");
const DataReader = require("../services/DataReaderService");

const HomePage = require("../pages/HomePage");
const OrderCheck = require("../models/OrderCheck");

const { TEST_TIMEOUT } = require("../config/constants");

describe("Checking not existing order.", function () {
  before(async function () {
    const orderProps = await DataReader.getTestData("orderCheck.properties");
    for (const key in orderProps) {
        this[key] = orderProps[key];
    }
  });

  beforeEach(async function () {
    this.driver = await Driver.getInstance();
  });

  it("Should give back not correct password modal.", async function () {
    const order = new OrderCheck(this.orderNumber, this.orderPassword, this.orderMessage);

    const homePage = new HomePage(this.driver, order);
    await homePage.loadProperties();
    await homePage.openPage();
    await homePage.changeLanguage();
    await homePage.clickYourOrder();
    await homePage.fillData();

    const orderCheckError = await homePage.isOrderCheckError();
    expect(orderCheckError).to.be.true;
  }).timeout(TEST_TIMEOUT);

  afterEach(async function () {
    if (this.currentTest.state !== "passed") {
      const image = await this.driver.takeScreenshot();
      await require('fs').writeFile(
          './screenshots/orderCheck.png',
          image,
          'base64',
          (err) => {});
    }

    await Driver.killDriver();
  });
});