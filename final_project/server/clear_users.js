const mongoose = require('mongoose');
const User = require('./models/User');
require('dotenv').config();

mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
    .then(async () => {
        console.log('Connected to MongoDB');
        await User.deleteMany({});
        console.log('All users have been deleted.');
        mongoose.connection.close();
    })
    .catch(err => {
        console.error('Error:', err);
        process.exit(1);
    });
