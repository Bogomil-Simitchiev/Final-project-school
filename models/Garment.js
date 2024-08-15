const { Schema, model, Types: { ObjectId } } = require('mongoose');

const garmentSchema = new Schema({
    name: { type: String, required: true },
    description: { type: String, required: true },
    imageUrl: { type: String, required: true },
    price: { type: Number, default: 0, min: 0 },
    color: { type: String, required: true },
    owner: { type: ObjectId, ref: 'User' },
    typeOfGarment: { type: String, required: true },

})

const Garment = model('Garment', garmentSchema);

module.exports = Garment;