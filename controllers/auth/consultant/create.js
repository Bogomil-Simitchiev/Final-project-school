const { Router } = require('express');

const router = Router();

router.get('/', (req, res) => {
    res.render('consultant/create', { noLogoShow: true, title: 'Създай' });
});

router.post('/', async (req, res) => {
    const info = req.body;
    try {
        if (info.name !== '' && info.description !== '' && info.imageUrl !== '' && info.typeOfGarment !== undefined) {
            const garment = {
                name: info.name,
                description: info.description,
                imageUrl: info.imageUrl,
                price: Number(info.price),
                color: info.color,
                owner: req.session.user.id,
                typeOfGarment: info.typeOfGarment
            }
            
            await req.storage.createGarment(garment);
            res.redirect('/');
        } else {
            res.redirect('/create');
        }
    } catch (error) {
        res.redirect('/404');
    }

});

module.exports = router;