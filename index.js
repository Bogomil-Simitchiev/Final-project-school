const express = require('express');
const hbs = require('express-handlebars');
const session = require('express-session');
const PORT = 3000;

require('dotenv').config();
const init = require('./models/index');
const garmentService = require('./services/garmentService');
const authService = require('./services/authService');

const { home } = require('./controllers/home');
const { about } = require('./controllers/about');
const { details } = require('./controllers/details');
const { males } = require('./controllers/males');
const { females } = require('./controllers/females');
const { kids } = require('./controllers/kids');

const { cart } = require('./controllers/auth/cart');
const { removeItem } = require('./controllers/auth/removeItem');
const { decreaseItem } = require('./controllers/auth/decreaseItem');
const { increaseItem } = require('./controllers/auth/increaseItem');
const { addToCart } = require('./controllers/auth/addToCart');
const createController = require('./controllers/auth/consultant/create');
const deleteController = require('./controllers/auth/consultant/delete');
const editController = require('./controllers/auth/consultant/edit');
const { order } = require('./controllers/auth/user/order');
const { myOrders } = require('./controllers/auth/myOrders');
const { logout } = require('./controllers/auth/user/logout');
const { success } = require('./controllers/auth/user/successfulOrder');

const { users } = require('./controllers/auth/admin/users');
const deleteUserController = require('./controllers/auth/admin/deleteUser');
const consultantUserController = require('./controllers/auth/admin/makeUserConsultant');

const ordersController = require('./controllers/auth/consultant/orders');

const loginController = require('./controllers/auth/guest/login');
const registerController = require('./controllers/auth/guest/register');

const { isLoggedIn, isNotLoggedIn, isAdmin, isConsultant } = require('./middlewares/authMiddleware');
const { notFound } = require('./controllers/notFound');
const { finishOrder } = require('./controllers/auth/user/finishOrder');

const app = express();

app.use(session({
    secret: 'super secret',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: 'auto' }
}))

app.engine('hbs', hbs.create({
    extname: '.hbs'
}).engine);

app.set('view engine', 'hbs');

app.use(express.urlencoded({ extended: true }));
app.use('/static', express.static('static'));
app.use(authService());
app.use(garmentService());

init().then(() => {
    // For all users in the website
    app.get('/', home);
    app.get('/about', about);
    app.get('/details/:id', details);
    app.get('/females', females);
    app.get('/males', males);
    app.get('/kids', kids);

    // Only logged in users can view this
    app.get('/cart', isLoggedIn(), cart);
    app.get('/remove/item/:id/:cartId', isLoggedIn(), removeItem);
    app.get('/decrease/item/:id/:cartId', isLoggedIn(), decreaseItem);
    app.get('/increase/item/:id/:cartId', isLoggedIn(), increaseItem);
    app.post('/addToCart/:id', isLoggedIn(), addToCart);
    app.use('/create', isLoggedIn(), isConsultant(), createController);
    app.use('/delete/product', isLoggedIn(), deleteController);
    app.use('/edit', isLoggedIn(), editController);
    app.post('/order', isLoggedIn(), order);
    app.get('/myOrders', isLoggedIn(), myOrders);
    app.get('/logout', isLoggedIn(), logout);
    app.get('/finishOrder', isLoggedIn(), finishOrder);
    app.get('/successfulOrder', isLoggedIn(), success);


    // For the admin
    app.get('/admin/users', isLoggedIn(), isAdmin(), users);
    app.use('/delete', isLoggedIn(), isAdmin(), deleteUserController);
    app.use('/consultant', isLoggedIn(), isAdmin(), consultantUserController);

    // For consultants
    app.use('/orders', isLoggedIn(), isConsultant(), ordersController);

    // Only guests can view this
    app.use('/login', isNotLoggedIn(), loginController);
    app.use('/register', isNotLoggedIn(), registerController);

    // Not found path
    app.all('*', notFound);
    app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
});