module.exports = {
    async order(req, res) {
        const city = req.body.city;
        const phone = Number(req.body.phone);
        const street = req.body.street;
        const place = req.body.place;
        const order = {
            garments: req.session.user.cartProducts,
            city,
            phone,
            street,
            place
        }

        await req.auth.makeAnOrder(order);
        req.session.user.cartProducts = [];
        res.redirect('/successfulOrder');
    }
}