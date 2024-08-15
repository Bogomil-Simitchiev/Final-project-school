module.exports = {
    notFound(req, res) {
        res.render('404', { noLogoShow: true, title: 'Грешка' });
    }
}