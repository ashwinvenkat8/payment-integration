const express = require("express");
const Razorpay = require("razorpay");

// used to get key_id, key_secret and port
// create a similar file in your app's root directory and store these fields
const cfg = require("./config.js");

const PORT = process.env.PORT || cfg.port();

// new express.js instance to handle endpoint calls
const app = express();
app.use(express.json());
app.use(express.static(__dirname + "/public/"));

// new Razorpay instance to make API calls
const rzpInstance = new Razorpay({
    key_id: cfg.key_id(),
    key_secret: cfg.key_secret()
});

// object to store donation details and push to database
function Donation(invoiceId, orderId, receipt, customerDetails, amount, paymentURL) {
    this.invoice_id = invoiceId;
    this.order_id = orderId;
    this.receipt = receipt;
    this.customer_details = {
        "id": customerDetails.id.toString(),
        "name": customerDetails.name.toString(),
        "email": customerDetails.email.toString(),
        "contact": customerDetails.contact.toString()
    },
    this.amount = amount,
    this.short_url = paymentURL
}
app.get("/", (req, res) => {
    res.sendFile(__dirname + "/public/index.html");
});

app.post("/newDonation", (req, res) => {
    const name = req.body.name;
    const email = req.body.email;
    const contact = req.body.contact;
    const amount = req.body.amount;
    const receipt = (Math.random()*0xffffff*10000000000).toString(16).slice(0,6);
    const callbackURL = "https://rzp-integration.herokuapp.com/thankYou";

    // object to store invoice API options
    const invoiceOptions = {
        "type": "invoice",
        "description": "Invoice for test donation",
        "customer": {
            "name": name,
            "contact": contact,
            "email": email
        },
        "line_items": [{
            "name": "Donation",
            "description": "Donation cause",
            "amount": amount
        }],
        "date": Math.round(Date.now()/1000),
        "receipt": receipt,
        "callback_method": "get",
        "callback_url": callbackURL
    }

    // creating a new invoice
    rzpInstance.invoices.create(invoiceOptions, (error, invoice) => {
        if(error) {
            console.log(error);
        } else {
            const invoiceId = invoice.id.toString();
            const orderId = invoice.order_id.toString();
            const customerDetails = {
                "id": invoice.customer_details.id.toString(),
                "name": invoice.customer_details.name.toString(),
                "email": invoice.customer_details.email.toString(),
                "contact": invoice.customer_details.contact.toString()
            };
            const amount = invoice.amount.toString();
            const paymentURL = invoice.short_url.toString();
            const currentDonation = new Donation(invoiceId, orderId, receipt, customerDetails, amount, paymentURL);
            //console.log(currentDonation);
            res.json(paymentURL);
        }
    });
});
app.get("/thankYou", (req, res) => {
    res.sendFile(__dirname + "/public/thankyou.html");
});

app.listen(PORT, () => console.log(`Server started on port ${PORT}.`));