module.exports = {
    async males(req, res) {
        let maleGarments = await req.storage.getAllGarmentsByType('male');

        res.render('males', { noLogoShow: true, maleGarments, title: 'Мъже' });
    }
}