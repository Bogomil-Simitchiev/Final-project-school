const { Router } = require('express');

const router = Router();

router.get('/:id', async (req, res) => {
    const id = req.params.id;
    const garment = await req.storage.getGarmentById(id);

    if (req.session.user.isAdmin) {
        if (garment) {
            return res.render('consultant/delete', { garment, title: 'Изтрий' });
        } else {
            return res.redirect('/404');
        }
    }

    if (garment.owner._id != req.session.user.id) {
        console.log('User is not the owner!');
        return res.redirect('/');
    }

    if (garment) {
        res.render('consultant/delete', { garment, title: 'Изтрий', noLogoShow: true });
    } else {
        res.redirect('/404');
    }
});

router.post('/:id', async (req, res) => {
    const id = req.params.id;
    if (await req.storage.deleteGarment(id, req.session.user.id, req)) {
        req.session.user.cartProducts = req.session.user.cartProducts.filter(p => p._id !== id);
    }
    res.redirect('/');
});

module.exports = router;