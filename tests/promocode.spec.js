const { expect } = require("chai");
require("chromedriver");
const Driver = require("../driver/Driver");
const DataReader = require("../services/DataReaderService");

const HomePage = require("../pages/HomePage");
const Promocode = require("../models/Promocode");

const { TEST_TIMEOUT } = require("../config/constants");

describe("Checking not existing promocode.", function () {
  before(async function () {
    const promocodeProps = await DataReader.getTestData("promocode.properties");
    for (const key in promocodeProps) {
        this[key] = promocodeProps[key];
    }
  });

  beforeEach(async function () {
    this.driver = await Driver.getInstance();
  });

  it("Should get promocode error.", async function () {
    const promocode = new Promocode(this.promocodeNumber, this.promocodeMessage);

    const homePage = new HomePage(this.driver, promocode);
    await homePage.loadProperties();
    await homePage.openPage();
    await homePage.clickToCart();
    await homePage.fillPromocode();
    const promocodeError = await homePage.isPromocodeError();

    expect(promocodeError).to.be.true;
  }).timeout(TEST_TIMEOUT);

  afterEach(async function () {
    if (this.currentTest.state !== "passed") {
      const image = await this.driver.takeScreenshot();
      await require('fs').writeFile(
          './screenshots/promocodeFail.png',
          image,
          'base64',
          (err) => {});
    }

    await Driver.killDriver();
  });
});