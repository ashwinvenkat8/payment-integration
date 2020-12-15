# Donation Website with Payments through Razorpay
A simple website that accepts donations through Razorpay and sends an invoice through email as well as SMS.

Users are greeted with the donation cause and active campaign period along with details of the organiser.\
The donation site has a form to accept user details such as name, email ID and phone number, along with the\
desired donation amount.

Submitting the form invokes the _Razorpay Invoice API_ that initiates a new invoice using the details submitted\
by the user, who is then redirected to the Razorpay payment page where a preview of the invoice is displayed\
along with a button to initiate the payment. Payments can be made using credit or debit cards, netbanking,\
UPI or a wallet provider.

Since the _Invoice API_ is being used, the user receives an email and SMS with an initial invoice and a payment\
link (same as the one that the donation website redirects to). This payment link can be used to complete the\
payment at a later time or access the invoice anytime after payment as well.

**Backend** - Node.js\
**Middleware** - Express.js\
**Frontend** - Minimal Bootstrap\
**Hosting** - Heroku\
**Payments** - Razorpay

**Dependencies:** express, razorpay
