const mongoose = require('mongoose');

require('./User');
require('./Garment');
require('./Order');

const databaseName = 'shop-clothes';

const connectionString = `mongodb+srv://${process.env.MONGODB_NAME}:${process.env.MONGODB_PASSWORD}@atlascluster.9za4ktm.mongodb.net/${databaseName}?retryWrites=true&w=majority`;

async function initialize() {

    try {
        await mongoose.connect(connectionString, {
            useUnifiedTopology: true,
            useNewUrlParser: true,
            autoIndex: false
        });

        console.log('Database connected');

    } catch (error) {
        console.log(error);
        process.exit(1);
    }

}
module.exports = initialize;