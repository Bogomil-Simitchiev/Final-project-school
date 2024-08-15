const { Router } = require('express');

const router = Router();

router.get('/users/:id', async (req, res) => {
    const id = req.params.id;

    if (await req.auth.deleteCurrentUser(id, req.session.user.isAdmin)) {
        res.redirect('/admin/users');
    } else {
        res.redirect('/404');
    }

});

module.exports = router;