const { Router } = require('express');

const router = Router();

router.get('/', async (req, res) => {
    res.render('guest/login', { noLogoShow: true, title: 'Вход' });
});

router.post('/', async (req, res) => {
    const info = req.body;
    try {
        await req.auth.login(info.email, info.password);
        res.redirect('/');

    } catch (err) {
        res.locals.errors = [{ msg: err.message }];
        res.locals.data = { email: req.body.email };
        res.render('guest/login', { noLogoShow: true,  title: 'Вход' });
    }

});

module.exports = router;