module.exports = {
    cart(req, res) {
        let totalPrice = 0;
        const cartItems = req.session.user.cartProducts;
        cartItems.map(item => totalPrice += item.count * item.price)

        res.render('cart', { cartItems, noLogoShow: true, title: 'Количка', totalPrice: totalPrice.toFixed(2) });
    }
}