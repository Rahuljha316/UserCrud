const express = require('express')
require('dotenv').config()
const UserRoutes = require('./routes/userRoutes')

const app = express();
app.use(express.json())
app.use('/api/users', UserRoutes)

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
    console.log(`server is running at ${PORT}`)
});

