module.exports = {
    increaseItem(req, res) {
        const cartId = req.params.cartId;
        req.session.user.cartProducts.filter(p => p.cartId == cartId ? p.count++ : p.count);
        
        res.redirect('/cart');
    }
}