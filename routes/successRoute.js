const router = require('express').Router();

router.get('/success', async (req, res) => {
    const session = await stripe.checkout.sessions.retrieve(req.query.session_id);
    const customer = await stripe.customers.retrieve(session.customer);

    // Handle the session data
    console.log(session);
    console.log(customer);

    res.send({ session, customer });
});

module.exports = router