module.exports = {
    async removeItem(req, res) {
        const cartId = req.params.cartId;
        req.session.user.cartProducts = req.session.user.cartProducts.filter(p => p.cartId !== cartId);
        
        res.redirect('/cart');
    }
}