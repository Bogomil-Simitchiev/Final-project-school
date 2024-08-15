module.exports = {
    async myOrders(req, res) {
        const loggedInUser = req.session.user;
        const allOrders = await req.auth.getAllOrders();
        const ordersInArray = allOrders.map(o => o.garments).flat();
        const currentConsultantOrders = ordersInArray.filter(o => o.customerId == loggedInUser.id);
     
        res.render('myOrders', {
            noLogoShow: true, title: 'Моите поръчки',
            currentConsultantOrders,
        });
    }
}