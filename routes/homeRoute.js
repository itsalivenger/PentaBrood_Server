const router = require('express').Router();

router.post('/', (req, res) => {
    const { type } = req.body;

    if(type == 'subscribe'){
        const email = req.body.email;
        console.log(email);
    }
    res.send({testps: `wslat l3iba f j3iba`});
});

module.exports = router