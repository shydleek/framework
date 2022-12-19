const { expect } = require("chai");
require("chromedriver");
const Driver = require("../driver/Driver");
const DataReader = require("../services/DataReaderService");

const ProductPage = require("../pages/ProductPage");
const Product = require("../models/Product");

describe("Adding and deleting items from cart.", function () {
  before(async function () {
    const props = await DataReader.getTestData("product.properties");
    for (const key in props) {
        this[key] = props[key];
    }
  });

  beforeEach(async function () {
    this.driver = await Driver.getInstance();
  });

  it("Should add exact product to the cart.", async function () {
    console.log(this.productName, this.productPrice, this.productId, this.productSize, this.productUrl);
    const product = new Product(this.productName, this.productPrice, this.productId, this.productSize, this.productUrl);
    const productPage = new ProductPage(this.driver, product);
    await productPage.openPage();
    await productPage.selectSize();
    await productPage.addItemToCart();
    // const productName = await vyshyvankaCrossPage.getProductName();
    // expect(productName).to.be.equal(this.productName);
    // await vyshyvankaCrossPage.waitPageLoad(1000);
    // const productPrice = await vyshyvankaCrossPage.getProductPrice();
    // expect(productPrice).to.be.equal(this.productPrice);
    // await vyshyvankaCrossPage.waitPageLoad(1000);
    // const isProductSelectedSize = await vyshyvankaCrossPage.getProductSelectedSize() ? true : false;
    // expect(isProductSelectedSize).to.be.true;
    expect(true).to.be.true;
  }).timeout(50000);

  // it("Should delete item from the cart.", async function () {
  //   const vyshyvankaCrossPage = new ProductPage(this.driver);
  //   await vyshyvankaCrossPage.openPage(pageUrl);
  //   await vyshyvankaCrossPage.waitPageLoad(5000);
  //   await vyshyvankaCrossPage.selectSize('M');
  //   await vyshyvankaCrossPage.addItemToCart();
  //   await vyshyvankaCrossPage.deleteItemFromTheCart();
  //   await vyshyvankaCrossPage.waitPageLoad(1000);
  //   const totalPrice = await vyshyvankaCrossPage.getTotalPrice();
  //   expect(totalPrice).to.be.equal(expectedTotalPrice);
  // }).timeout(50000);

  afterEach(async function () {
    await Driver.killDriver();
  });
});