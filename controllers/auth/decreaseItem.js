module.exports = {
    decreaseItem(req, res) {
        const cartId = req.params.cartId;
        req.session.user.cartProducts.filter(p => p.cartId == cartId ? p.count > 1 ? p.count-- : p.count = 1 : p.count);

        res.redirect('/cart');
    }
}