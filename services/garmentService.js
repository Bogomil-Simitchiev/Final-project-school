const Garment = require('../models/Garment');

async function getAllGarments(query) {

    let options = {};

    if (query.search) {
        options.name = new RegExp(query.search, 'i');
    }
    if (query.from) {
        options.price = { $gte: Number(query.from) };
    }
    if (query.to) {
        if (!options.price) {
            options.price = {};
        }
        options.price.$lte = Number(query.to);
    }
    const garments = await Garment.find(options).lean();

    return garments;

}

async function getGarmentById(id) {
    const garment = await Garment.findById(id).lean().populate('owner');
    if (garment) {
        return garment;
    } else {
        return undefined;
    }
}

async function deleteGarment(id, ownerId, req) {
    const garment = await Garment.findById(id);

    if (req.session.user?.isAdmin) {
        await Garment.findByIdAndDelete(id);
        return true;
    }

    if (garment.owner != ownerId) {
        return false;
    }

    await Garment.findByIdAndDelete(id);

    return true;
}

async function editGarment(id, updatedGarment, ownerId, req) {
    const garment = await Garment.findById(id);

    if (req.session.user?.isAdmin) {
        garment.name = updatedGarment.name;
        garment.description = updatedGarment.description;
        garment.imageUrl = updatedGarment.imageUrl;
        garment.price = updatedGarment.price;
        garment.color = updatedGarment.color;

        await garment.save();

        return true;
    }

    if (garment.owner != ownerId) {
        return false;
    }
    garment.name = updatedGarment.name;
    garment.description = updatedGarment.description;
    garment.imageUrl = updatedGarment.imageUrl;
    garment.price = updatedGarment.price;
    garment.color = updatedGarment.color;

    await garment.save();
    return true;
}

async function createGarment(garment) {
    const currentGarment = new Garment(garment);
    await currentGarment.save();
}
async function getAllGarmentsByType(type) {
    const garments = await Garment.find({ typeOfGarment: type }).lean();
    return garments;
}

module.exports = () => (req, res, next) => {
    req.storage = {
        getAllGarments,
        getGarmentById,
        createGarment,
        deleteGarment,
        editGarment,
        getAllGarmentsByType
    }

    next();
}