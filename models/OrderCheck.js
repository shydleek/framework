class OrderCheck {
    constructor(number, password) {
        this.number = number;
        this.password = password;
        this.message = message;
    }

    getNumber() {
        return this.number;
    }

    setNumber(number) {
        this.number = number;
    }

    getPassword() {
        return this.password;
    }

    setPassword(password) {
        this.password = password;
    }

    getMessage() {
        return this.message;
    }

    setMessage(message) {
        this.message = message;
    }
}

module.exports = OrderCheck;