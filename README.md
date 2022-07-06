# freekassa-payment-nodejs-sdk
## Version: 1.0.0

Node.js SDK module for the implementation of a single payment protocol acquiring Freekassa

Installation using npm:
```bash
$ npm i freekassa-payment-nodejs
```

Connection:
```javascript
const FK = require('@freekassa');
```

## Documentation
**Step-by-step guide to working with the API**: https://docs.freekassa.ru <br>

To use the SDK, you need `Your store ID`, `Secret Word 1`, `Secret Word 2`, `IP Address` details in the documentation — https://docs.freekassa.ru <br>

```javascript
const fkMerchantID = 'You store ID';
const fkFirstSecret = 'Secret Word 1';
const fkSecondSecret = 'Secret Word 2';
const fkIpAddress = 'IP Address';

const freekassa = new FreeKassaPaymentsAPI(fkMerchantID, fkFirstSecret, fkSecondSecret, fkIpAddress);
```

## Examples
By default, several payment methods are available to the user. In the payment form, the account parameters are transmitted in clear form in the link. Next, the client is shown a form with a choice of payment method in the desired currency. When using this method, it cannot be guaranteed that all invoices are issued by freekassa, unlike billing via API.

Through the API, all parameters are transmitted in a closed form, as well as invoicing operations are supported in the API, as well as checking the status of operations.

### Invoicing

A reliable way to integrate. Parameters are passed to server2server using authorization. The method allows you to issue an invoice, if the request is successful, the `payURL` parameter will be returned in the response - a link for redirecting the user to the payment form.

The "createPaymentFK" method issues a new invoice. In the parameters, you need to specify the "fields" parameters. As a result, a response will be received with the invoice data.

```javascript
const fields = {
    shopId: Your store ID,
    amount: 'USD',
    currency: '111.11',
    email: 'mrklvvdev@gmail.com',
    orderID: '123',
    i: '',
    nonce: Date().getTime()
};

Freekassa.createPaymentFK(fields).then( data => {
    //do with data
});
```
As a result:
```json
{
  "type": "success",
  "orderId": 123,
  "orderHash": "ba2c78c3509999686a6db7c122b9c49c",
  "location": "https://pay.freekassa.ru/form/123/ba2c78c3509999686a6db7c122b9c49c"
}
```

### Billing information

The 'getPaymentFK' method returns account information. In the parameters, you need to specify the `orderHash` identifiers and the billing time inside your system, as a result, a response with the account status will be received.

```javascript
const fields = {
    orderHash: 'ba2c78c3509999686a6db7c122b9c49c',
    nonce: nonce
};

Freekassa.getPaymentFK(fields).then( data => {
    //do with data
});
```
As a result:
```json
{
  "type": "success",
  "pages": 12,
  "orders": [
    {
      "merchant_order_id": "Order #123",
      "fk_order_id": 1656590159,
      "amount": 111.11,
      "currency": "USD",
      "email": "mrklvvdev@gmail.com",
      "account": "1",
      "date": "2022-06-30 14:55:55",
      "status": 1
    }
  ]
}
```
