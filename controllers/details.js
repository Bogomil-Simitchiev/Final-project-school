module.exports = {
   async details(req, res) {
      const id = req.params.id;
      const garment = await req.storage.getGarmentById(id);

      if (req.session.user && req.session.user.id == garment.owner._id) {
         garment.isOwner = true;
         garment.hasUser = true;
      } else {
         if (req.session.user) {
            garment.hasUser = true;
            garment.isOwner = false;
         }
      }

      if (req.session.user?.isAdmin) {
         garment.isAdmin = true;
      }

      const isAddedToCart = req.session.user?.cartProducts.find(p => p._id == garment._id);
      garment.isAddedToCart = isAddedToCart;

      if (garment) {
         if (req.session.sizeNotAdded) {
            res.render('details', { garment, title: 'Детайли', errors: [{ msg: 'Избери размер' }] });
         } else {
            res.render('details', { garment, title: 'Детайли' });
         }
      } else {
         res.redirect('/404');
      }
      req.session.sizeNotAdded = false;
   }
}