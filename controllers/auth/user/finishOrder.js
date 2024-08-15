module.exports = {
    finishOrder(req, res) {
        res.render('finishOrder', { noLogoShow: true, cartId: req.params.cartId });
    }
}