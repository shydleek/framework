const BasePage = require("./BasePage");
const logger = require("../logger");

class HomePage extends BasePage {
  static resourcesFileName = "homePage.properties";

  constructor(driver, order) {
    super(driver);
    this.order = order;
  }

  async openPage() {
    return super.openPage(this.homeUrl);
  }

  async loadProperties() {
    return super.loadProperties(HomePage.resourcesFileName);
  }
}

module.exports = HomePage;