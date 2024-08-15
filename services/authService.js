const User = require('../models/User');
const Order = require('../models/Order');

async function register(session, email, username, password) {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
        throw [{ msg: 'Имейлът вече съществува!' }];
    }
    else {
        const user = new User({
            email,
            username,
            hashedPassword: password
        })
        await user.save();
        session.user = {
            id: user._id,
            username: user.username,
            isAdmin: false,
            isConsultant: user.isConsultant,
            cartProducts: []
        }
    }
}

async function login(session, email, password) {
    const user = await User.findOne({ email });
    if (user == null) {
        throw new Error('Няма такъв потребител!');
    }
    if (user && await user.comparePassword(password)) {
        if (user.isAdmin) {
            session.user = {
                id: user._id,
                username: user.username,
                isAdmin: true,
                isConsultant: user.isConsultant,
                cartProducts: []
            }
        } else {
            session.user = {
                id: user._id,
                username: user.username,
                isAdmin: false,
                isConsultant: user.isConsultant,
                cartProducts: []
            }
        }
        return true;
    } else {
        throw new Error('Грешен имейл или парола!');
    }
}

function logout(session) {
    delete session.user;
}

async function getAllRegisteredUsers() {
    return await User.find({ "email": { "$ne": 'bogi@abv.bg' } }).lean();
}

async function deleteCurrentUser(id, isUserAdmin) {
    if (isUserAdmin !== true) {
        return false;
    }

    await User.findByIdAndDelete(id);
    return true;
}

async function makeUserConsultant(id, isUserAdmin) {
    if (isUserAdmin !== true) {
        return false;
    }

    await User.findByIdAndUpdate(id, {
        isConsultant: true
    });
    return true;
}

async function makeAnOrder(currentOrder) {
    const order = new Order(currentOrder);
    await order.save();
    return true;
}

async function getAllOrders() {
    return await Order.find().lean();
}

async function setCurrentOrderAsApproved(itemId, cartId) {
    const updatedOrder = await Order.findOneAndUpdate(
        {
            'garments._id': itemId,
            'garments.cartId': cartId
        },
        { $set: { 'garments.$.isOrderApprovedFromTheConsultant': true } },
        { new: true }
    );

    return updatedOrder;
}

async function setCurrentOrderAsRemoved(itemId, cartId) {
    const updatedOrder = await Order.findOneAndUpdate(
        {
            'garments._id': itemId,
            'garments.cartId': cartId
        },
        { $set: { 'garments.$.isOrderRemovedFromTheConsultant': true } },
        { new: true }
    );

    return updatedOrder;
}

module.exports = () => (req, res, next) => {
    if (req.session.user) {
        res.locals.user = req.session.user;
        res.locals.hasUser = true;
    }

    req.auth = {
        register: (...params) => register(req.session, ...params),
        login: (...params) => login(req.session, ...params),
        logout: () => logout(req.session),
        getAllRegisteredUsers,
        deleteCurrentUser,
        makeUserConsultant,
        makeAnOrder,
        getAllOrders,
        setCurrentOrderAsApproved,
        setCurrentOrderAsRemoved
    }

    next();
}