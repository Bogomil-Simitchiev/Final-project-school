const { Router } = require('express');

const router = Router();

router.get('/', async (req, res) => {
    const loggedInUser = req.session.user;
    const allOrders = await req.auth.getAllOrders();
    const ordersInArray = allOrders.map(o => o.garments).flat(Infinity);
    const currentConsultantOrders = ordersInArray.filter(o => o.owner == loggedInUser.id);

    // let isThereApprovedOrder = currentConsultantOrders.filter(o => o.isOrderApprovedFromTheConsultant == true && o.isOrderRemovedFromTheConsultant == false);
    // let isThereRemovedOrder = currentConsultantOrders.filter(o => o.isOrderRemovedFromTheConsultant == true && o.isOrderApprovedFromTheConsultant == false);

    // currentConsultantOrders: isThereApprovedOrder.length + isThereRemovedOrder.length == currentConsultantOrders.length ? [] : currentConsultantOrders,
    // isThereOrder: isThereApprovedOrder.length + isThereRemovedOrder.length == currentConsultantOrders.length

    res.render('consultant/orders',
        {
            noLogoShow: true,
            title: 'Поръчки',
            currentConsultantOrders
        });
}
);

router.get('/accept/item/:itemId/:cartId', async (req, res) => {
    const itemId = req.params.itemId;
    const cartId = req.params.cartId;

    await req.auth.setCurrentOrderAsApproved(itemId, cartId);

    res.redirect('/orders');
});

router.get('/remove/item/:itemId/:cartId', async (req, res) => {
    const itemId = req.params.itemId;
    const cartId = req.params.cartId;

    await req.auth.setCurrentOrderAsRemoved(itemId, cartId);

    res.redirect('/orders');
});

module.exports = router;