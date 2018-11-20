var express = require("express");
var stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

var router = express.Router();

router.post("/", async (req, res) => {
  console.log("req.body: ", req.body);
  try {
    const { status } = await stripe.charges.create({
      amount: 2000,
      currency: "usd",
      description: "An example charge",
      source: req.body,
    });

    res.json({ status });
  } catch (err) {
    res.status(500).end();
  }
});

module.exports = router;
