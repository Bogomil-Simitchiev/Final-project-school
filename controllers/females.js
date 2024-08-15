module.exports = {
    async females(req, res) {
        let femaleGarments = await req.storage.getAllGarmentsByType('female');

        res.render('females', { noLogoShow: true, femaleGarments, title: 'Жени' });
    }
}