class Promocode {
    constructor(promocode, message) {
        this.promocode = promocode;
        this.message = message;
    }

    getPromocode() {
        return this.promocode;
    }

    setPromocode(promocode) {
        this.promocode = promocode;
    }

    getMessage() {
        return this.message;
    }

    setMessage(message) {
        this.message = message;
    }
}

module.exports = Promocode;