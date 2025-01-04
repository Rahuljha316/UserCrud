const express = require('express')
require('dotenv').config()
const UserRoutes = require('./routes/userRoutes');
const sequelize = require('./database');
const User = require('./models/user')
const PORT = process.env.PORT || 4000;

const app = express();
app.use(express.json())
app.use('/api/users', UserRoutes)

sequelize.sync()
    .then(() => {
        console.log('Database connected...');
        app.listen(PORT, () => {
            console.log(`Server is running at ${PORT}`);
        });
    })
    .catch(err => {
        console.error('Error connecting to the database:', err);
        process.exit(1);
    });


