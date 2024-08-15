const { Schema, model, Types: { ObjectId } } = require('mongoose');

const orderSchema = new Schema({
    garments: {
        type: [
            {
                customerName: { type: String, required: true },
                customerId: { type: ObjectId, ref: 'User' },
                cartId: { type: String, required: true },
                name: { type: String, required: true },
                description: { type: String, required: true },
                imageUrl: { type: String, required: true },
                price: { type: Number, default: 0, min: 0 },
                color: { type: String, required: true },
                owner: { type: ObjectId, ref: 'User' },
                typeOfGarment: { type: String, required: true },
                size: { type: String, required: true },
                count: { type: Number, default: 1 },
                isOrderApprovedFromTheConsultant: { type: Boolean, default: false },
                isOrderRemovedFromTheConsultant: { type: Boolean, default: false }

            },

        ], required: true
    },
    city: { type: String, required: true },
    phone: { type: Number, required: true },
    street: { type: String, required: true },
    place: { type: String, required: true },


})

const Order = model('Order', orderSchema);

module.exports = Order;