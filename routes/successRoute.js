const router = require('express').Router();
const stripe = require('stripe');

router.get('/', async (req, res) => {
    console.log(stripe.Stripe.Checkout);
    // const session = await stripe.checkout.sessions.retrieve(req.query.session_id);
    // const customer = await stripe.customers.retrieve(session.customer);

    // Handle the session data
    // console.log(session);
    // console.log(customer);

    // res.send({ session, customer });
    res.send({tsst: 'ded'})
});

module.exports = router