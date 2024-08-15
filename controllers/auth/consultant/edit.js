const { Router } = require('express');

const router = Router();

router.get('/:id', async (req, res) => {
    const id = req.params.id;
    const garment = await req.storage.getGarmentById(id);
    try {

        if (req.session.user.isAdmin) {

            if (garment) {
                return res.render('consultant/edit', { garment, title: 'Промяна' });
            } else {
                return res.redirect('/404');
            }
        }

        if (garment.owner._id != req.session.user.id) {
            console.log('User is not the owner!');
            return res.redirect('/');
        }

        if (garment) {
            res.render('consultant/edit', { garment, title: 'Промяна', noLogoShow: true });
        } else {
            res.redirect('/404');
        }
    } catch (error) {
        res.redirect('/404');
    }

});

router.post('/:id', async (req, res) => {
    const id = req.params.id;
    const info = req.body;
    try {
        if (info.name !== '' && info.description !== '' && info.imageUrl !== '' && info.price !== '') {
            const garment = {
                name: info.name,
                description: info.description,
                imageUrl: info.imageUrl,
                price: Number(info.price),
                color: info.color
            }
            if (await req.storage.editGarment(id, garment, req.session.user.id, req)) {
                res.redirect(`/details/${id}`);
            } else {
                res.redirect('/');
            }

        } else {
            res.redirect('/edit');
        }
    } catch (error) {
        res.redirect('/404');
    }

});

module.exports = router;