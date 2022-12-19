const Page = require("./Page");

const logger = require("../logger");

class ProductPage extends Page {
  static addToCartXpath = `//*[@class='product-info-add-to-cart']`;
  static deleteFromTheCartXpath = `//*[@class='modal__cart-product-remove']`;

  constructor(driver, product) {
    super(driver);
    this.product = product;
  }

  async openPage() {
    return super.openPage(this.product.getPageUrl());
  }

  async addItemToCart() {
    logger.info("Adding item to the cart.");
    await this.clickByXpath(ProductPage.addToCartXpath);
    
    return this;
  }

  async deleteItemFromTheCart() {
    logger.info("Deleting item from the cart.");
    await this.clickByXpath(ProductPage.deleteFromTheCartXpath);
    
    return this;
  }

  async selectSize() {
    logger.info(`Selecting size: ${this.product.getSize()}.`);
    const selectSizeXpath = `//button[contains(text(), '${this.product.getSize()}')]`;
    await this.clickByXpath(selectSizeXpath);
    
    return this;
  }

  // async getProductName() {
  //   logger.info(`Getting product name.`);

  //   const xpath = `//*[@class='modal__cart-product-name hoverable']`;
  //   const productNameElement = await this.findByXpath(xpath);
  //   const productName = await productNameElement.getText();

  //   return productName;
  // }

  // async getProductPrice() {
  //   logger.info(`Getting product price.`);

  //   const xpath = `//*[@class='modal__cart-product-price-actual']`;
  //   const productPriceElement = await this.findByXpath(xpath);
  //   const productPrice = await productPriceElement.getText();

  //   return productPrice;
  // }

  // async getProductSelectedSize() {
  //   logger.info(`Getting selected product size.`);

  //   const xpath = `//button[@type='button' and @active='true']`;
  //   const productSizeElement = await this.findByXpath(xpath);
  //   const productSize = await productSizeElement.getText();

  //   return productSize;
  // }

  // async getTotalPrice() {
  //   logger.info(`Getting total price of cart.`);

  //   const xpath = `//*[@class='modal__cart-total-cost-value']`;
  //   const totalPriceElement = await this.findByXpath(xpath);
  //   const totalPrice = await totalPriceElement.getText();

  //   return totalPrice;
  // }
}

module.exports = ProductPage;
