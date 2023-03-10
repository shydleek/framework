const Page = require("./Page");

const logger = require("../logger");

const { LOADING_TIMEOUT } = require("../config/constants");

class ProductPage extends Page {
  static resourcesFileName = "product.properties";
  static addToCartXpath = `//*[@class='product-info-add-to-cart']`;
  static deleteFromTheCartXpath = `//*[@class='modal__cart-product-remove']`;
  static productNameXpath = `//*[@class='modal__cart-product-name hoverable']`;
  static productPriceXpath = `//*[@class='modal__cart-product-price-actual']`;
  static productSelectedSize = `//button[@type='button' and @active='true']`;
  static productTotalPrice = `//*[@class='modal__cart-total-cost-value']`;

  constructor(driver, product) {
    super(driver);
    this.product = product;
  }

  async changeLanguage() {
    return super.changeLanguage(this.defaultLanguage);
  }

  async openPage() {
    return super.openPage(this.product.getPageUrl());
  }

  async loadProperties() {
    return super.loadProperties(ProductPage.resourcesFileName);
  }

  async waitingLoad() {
    return super.waitingLoad(LOADING_TIMEOUT);
  }

  async addItemToCart() {
    logger.info("Adding item to the cart.");

    await this.clickByXpath(ProductPage.addToCartXpath);
    await this.waitingLoad(LOADING_TIMEOUT);

    return this;
  }

  async deleteItemFromTheCart() {
    logger.info("Deleting item from the cart.");

    await this.clickByXpath(ProductPage.deleteFromTheCartXpath);
    await this.waitingLoad(LOADING_TIMEOUT);
    
    return this;
  }

  async selectSize() {
    logger.info(`Selecting size: ${this.product.getSize()}.`);
    
    const selectSizeXpath = `//button[contains(text(), '${this.product.getSize()}')]`;
    await this.clickByXpath(selectSizeXpath);
    
    return this;
  }

  async getProductName() {
    logger.info(`Getting product name.`);

    const productNameElement = await this.findByXpath(ProductPage.productNameXpath);
    const productName = await productNameElement.getText();

    return productName;
  }

  async getProductPrice() {
    logger.info(`Getting product price.`);

    const productPriceElement = await this.findByXpath(ProductPage.productPriceXpath);
    const productPrice = await productPriceElement.getText();

    return productPrice;
  }

  async getProductSelectedSize() {
    logger.info(`Getting selected product size.`);

    const productSizeElement = await this.findByXpath(ProductPage.productSelectedSize);
    const productSize = await productSizeElement.getText();

    return productSize;
  }

  async getTotalPrice() {
    logger.info(`Getting total price of cart.`);

    const totalPriceElement = await this.findByXpath(ProductPage.productTotalPrice);
    await this.waitingLoad(LOADING_TIMEOUT);
    const totalPrice = await totalPriceElement.getText();

    return totalPrice;
  }
}

module.exports = ProductPage;
