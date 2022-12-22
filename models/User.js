class User {
    constructor(name, surname, patronic, mail, password, phoneNumber) {
        this.name = name;
        this.surname = surname;
        this.patronic = patronic;
        this.mail = mail;
        this.password = password;
        this.phoneNumber = phoneNumber;
    }

    getName() {
        return this.name;
    }

    setName(name) {
        this.name = name;
    }

    getSurname() {
        return this.surname;
    }

    setSurname(surname) {
        this.surname = surname;
    }

    getPatronic() {
        return this.patronic;
    }

    setPatronic(patronic) {
        this.patronic = patronic;
    }

    getMail() {
        return this.mail;
    }

    setMail(mail) {
        this.mail = mail;
    }

    getPassword() {
        return this.password;
    }

    setPassword(password) {
        this.password = password;
    }

    getPhoneNumber() {
        return this.phoneNumber;
    }

    setPhoneNumber(phoneNumber) {
        this.phoneNumber = phoneNumber;
    }
}

module.exports = User;