const sequelize = require('../database')
const User = require('../models/user')
const { validateSignUpData } = require('../utils/validation')

const getUsers = (req, res) => {
    const transaction = sequelize.transaction()
    try {

    } catch (error) {
        transaction.rollback()
        res.status(400).json({
            error: error.message
        })
    }
}
const getUser = (req, res) => {
    try {

    } catch (error) {
        res.status(400).json({
            error: error.message
        })
    }
}

const createUser = async (req, res) => {

    try {
        validateSignUpData(req)
        let { permaLink, userName, userPassword, userEmail, enabled } = req.body

        const newUser = await User.create({
            permaLink, userName, userEmail, userPassword, enabled
        });
        res.status(200).json({
            message: 'User Created SuccessFully',
            data: newUser
        })

    } catch (error) {

        res.status(400).json({
            error: error.message
        })
    }
}
const updateUser = (req, res) => {
    try {

    } catch (error) {
        res.status(400).json({
            error: error.message
        })
    }
}
const updateUserFields = (req, res) => {
    try {

    } catch (error) {
        res.status(400).json({
            error: error.message
        })
    }
}
const deleteUser = (req, res) => {
    try {

    } catch (error) {
        res.status(400).json({
            error: error.message
        })
    }
}

module.exports = {
    getUsers,
    getUser,
    createUser,
    updateUser,
    updateUserFields,
    deleteUser
}