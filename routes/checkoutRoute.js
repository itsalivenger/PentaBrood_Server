const { default: mongoose } = require('mongoose');

const router = require('express').Router();
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

router.get('/', async (req, res) => {
    res.send({txt: 'checkout'});
});

router.post('/', async (req, res) => {
    // res.send({tst: req.body});
    const { cart } = req.body;
    const productIds = cart.map(item => new mongoose.Types.ObjectId(item._id));
    const collection = req.db.collection('Products');
    let line_items = [];
    // mongoo cart price mapping
    try {
        const products = await collection.find({ _id: { $in: productIds } }).toArray();
        line_items = cart.map(item => {
            const product = products.find(p => p._id.equals(new mongoose.Types.ObjectId(item._id)));
            if (!product) {
                throw new Error(`Product with id ${item._id} not found`);
            }
            return {
                price_data: {
                    currency: 'usd',
                    product_data: {
                        name: item.name
                    },
                    unit_amount: product.price * 100, // Stripe expects the amount in cents
                },
                quantity: item.qty
            };
        });
        console.log(line_items);
    } catch (error) {
        res.status(500).send({error: error.message});
    }

    // stripe
    try {
        const session = await stripe.checkout.sessions.create({
            line_items,
            payment_method_types: ['card'],
            mode: 'payment',
            success_url: `${process.env.FRONTEND_URL}/PentaBrood/thankyou.html`,
            cancel_url: `${process.env.FRONTEND_URL}/PentaBrood/cancel.html`
        })
        res.send({session, line_items})
    } catch (error) {
        res.status(500).send({error: error.message});
    }
});

module.exports = router