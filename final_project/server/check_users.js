const mongoose = require('mongoose');
const User = require('./models/User');
require('dotenv').config();

mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
    .then(async () => {
        console.log('Connected to MongoDB');
        const users = await User.find({}, 'username role'); // Only get username and role

        if (users.length === 0) {
            console.log('No users found in database.');
        } else {
            console.log('Existing Users:');
            users.forEach(u => console.log(`- Username: ${u.username}, Role: ${u.role}`));
        }
        mongoose.connection.close();
    })
    .catch(err => {
        console.error('Error:', err);
        process.exit(1);
    });
