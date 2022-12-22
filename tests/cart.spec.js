const { expect } = require("chai");
require("chromedriver");
const Driver = require("../driver/Driver");
const DataReader = require("../services/DataReaderService");

const ProductPage = require("../pages/ProductPage");
const Product = require("../models/Product");

const { TEST_TIMEOUT } = require("../config/constants");

describe("Adding and deleting items from cart.", function () {
  before(async function () {
    const productProps = await DataReader.getTestData("product.properties");
    for (const key in productProps) {
        this[key] = productProps[key];
    }

    const cartProps = await DataReader.getTestData("cart.properties");
    for (const key in cartProps) {
        this[key] = cartProps[key];
    }
  });

  beforeEach(async function () {
    this.driver = await Driver.getInstance();
  });

  it("Should add exact product to the cart.", async function () {
    const product = new Product(this.productName, this.productPrice, this.productId, this.productSize, this.productUrl);

    const productPage = new ProductPage(this.driver, product);
    await productPage.loadProperties();
    await productPage.openPage();
    await productPage.changeLanguage();
    await productPage.selectSize();
    await productPage.addItemToCart();

    const productName = await productPage.getProductName();
    expect(productName).to.be.equal(this.productName);

    const productPrice = await productPage.getProductPrice();
    expect(productPrice).to.be.equal(this.productPrice);

    const isProductSelectedSize = await productPage.getProductSelectedSize() ? true : false;
    expect(isProductSelectedSize).to.be.true;
  }).timeout(TEST_TIMEOUT);

  it("Should delete item from the cart.", async function () {
    const product = new Product(this.productName, this.productPrice, this.productId, this.productSize, this.productUrl);

    const productPage = new ProductPage(this.driver, product);
    await productPage.loadProperties();
    await productPage.openPage();
    await productPage.changeLanguage();
    await productPage.selectSize();
    await productPage.addItemToCart();
    await productPage.deleteItemFromTheCart();

    const totalPrice = await productPage.getTotalPrice();
    expect(totalPrice).to.be.equal(this.defaultTotalPrice);
  }).timeout(TEST_TIMEOUT);

  afterEach(async function () {
    if (this.currentTest.state !== "passed") {
      const image = await this.driver.takeScreenshot();
      await require('fs').writeFile(
          './screenshots/cartFail.png',
          image,
          'base64',
          (err) => {});
    }

    await Driver.killDriver();
  });
});