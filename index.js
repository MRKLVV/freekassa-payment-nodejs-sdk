/*
    This is a freekassa-payment-nodejs-sdk project file
    Developer: mrklvv

    Copyright (c) Nikita Markelov 2016-2022 All rights reserved
*/

const md5 = require('md5');
const request = require('request-promise');

module.exports = class FreeKassaPaymentsAPI {
    constructor(merchantID, firstSecretPhrase, secondSecretPhrase) {
        this.merchantID = merchantID;
        this.firstSecretPhrase = firstSecretPhrase;
        this.secondSecretPhrase = firstSecretPhrase;
        this.idAddress = ipAddress;
    }

    async createPaymentFK(params) {
        this.sign = md5(`${this.merchantID}:${amount}:${this.firstSecretPhrase}'${orderID}`);
        var url = `https://api.freekassa.ru/v1/orders/create?shopId=${this.merchantID}&nonce=${params.nonce}&signature=${this.sign}&orderId=${orderID}&email=${params.email}?ip=${this.ipAddress}`;
        let payment = await this._requestBuilder(options);
        return payment;
    }

    async getPaymentFK(params) {
        var url = `https://api.freekassa.ru/v1/orders?shopId=${this.merchantID}&nonce=${params.nonce}&signature=${params.orderHash}`;
        let payment = await this._requestBuilder(options);
        return payment;
    }

    async _requestBuilder({ url, body = null }) {
        const headers = {
            'Content-Type': 'application/json;charset=UTF-8',
            Accept: 'application/json'
        };
        const options = {
            uri: url,
            method: `POST`,
            headers,
            body: body,
            json: true
        };
        try {
            return await request(options);
        } catch (e) {
            throw e;
        }
    }
};