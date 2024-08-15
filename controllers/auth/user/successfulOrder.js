module.exports = {
    success(req, res) {
        res.render('successfulOrder', { noLogoShow: true });
    }
}