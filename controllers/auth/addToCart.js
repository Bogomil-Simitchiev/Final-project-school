const { generateUniqueId } = require("../../utils/utils");

module.exports = {
    async addToCart(req, res) {
        const id = req.params.id;
        const garment = await req.storage.getGarmentById(id);
        const myUniqueIdForCart = generateUniqueId();

        try {
            if (req.body.choosenSize == undefined) {
                throw [{ msg: 'Избери размер!' }];
            }
            garment.count = 1;
            garment.size = req.body.choosenSize;
            garment.cartId = myUniqueIdForCart;
            garment.customerName = req.session.user.username;
            garment.customerId = req.session.user.id;

            req.session.user.cartProducts.push(garment);

            res.redirect(`/details/${id}`);
        } catch (errors) {
            req.session.sizeNotAdded = true;
            res.redirect(`/details/${id}`);
        }

    }
}