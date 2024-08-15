const { body, validationResult } = require('express-validator');

const { Router } = require('express');

const router = Router();

router.get('/', async (req, res) => {
    res.render('guest/register', { noLogoShow: true, title: 'Регистрация' });
});

router.post('/',
    body('email').trim(),
    body('username').trim(),
    body('password').trim(),
    body('repeatPassword').trim(),
    body('email')
        .isEmail().withMessage('Имейлът трябва да бъде в правилен формат').bail(),
    body('username')
        .isLength({ min: 5 }).withMessage('Името трябва да бъде минимум 5 символа').bail(),
    body('password')
        .isLength({ min: 8 }).withMessage('Паролата трябва да бъде минимум 8 символа').bail(),
    body('repeatPassword').custom((value, { req }) => {
        return value == req.body.password;
    }).withMessage('Паролите не са еднакви'),
    async (req, res) => {
        const info = req.body;
        const { errors } = validationResult(req);

        try {
            if (errors.length > 0) {
                throw errors;
            }
            await req.auth.register(info.email, info.username, info.password);
            res.redirect('/');
        } catch (errors) {
            if (errors.code == 11000) {
                res.render('guest/register', {
                    errors, data: {
                        email: req.body.email,
                        username: req.body.username
                    },
                    noLogoShow: true,
                    title: 'Регистрация'
                });
            }
            res.render('guest/register', {
                errors, data: {
                    email: req.body.email,
                    username: req.body.username
                },
                noLogoShow: true,
                title: 'Регистрация'
            });
        }

    });

module.exports = router;