module.exports = {
    async kids(req, res) {
        let kidGarments = await req.storage.getAllGarmentsByType('kid');

        res.render('kids', { noLogoShow: true, kidGarments, title: 'Деца' });
    }
}