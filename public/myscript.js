document.getElementById("rzpButton").onclick = function(e) {
    const name = document.getElementById("customerName").value;
    const email = document.getElementById("customerEmail").value;
    const contact = document.getElementById("customerPhone").value;
    const amount = (document.getElementById("donationAmount").value)*100;
    fetch("/newDonation", {
        method: "post",
        credentials: "same-origin",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            "name": name,
            "email": email,
            "contact": contact,
            "amount": amount
        })
    })
    .then(res => res.json())
    .then(payUrl => ({ url: payUrl }))
    .then(donationResponse => {
        confirm("About to redirect to Razorpay payment page. Please acknowledge.");
        window.open(donationResponse.url, "_parent");
    })
    .catch(error => {
        console.log("Failed");
        console.error(error);
    });
    e.preventDefault();
}