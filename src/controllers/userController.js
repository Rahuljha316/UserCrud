const User = require('../models/user')

const getUser = (req, res) => {
    res.send('helo geo')
}

module.exports = {
    getUser
}