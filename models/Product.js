class Product {
    constructor(name, price, id, size, url=null) {
        this.name = name;
        this.price = price;
        this.id = id;
        this.size = size;
        this.url = url;
    }

    getName() {
        return this.name;
    }

    setName(name) {
        this.name = name;
    }

    getPrice() {
        return this.price;
    }

    setPrice(price) {
        this.price = price;
    }

    getId() {
        return this.id;
    }

    setId(id) {
        this.id = id;
    }

    getSize() {
        return this.size;
    }

    setSize(size) {
        this.size = size;
    }

    getPageUrl() {
        return this.url || `https://jolybell.com/product/${this.id}/`;
    }
}

module.exports = Product;