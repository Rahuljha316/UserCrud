const sequelize = require('../database')
const bcrypt = require('bcrypt')
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
        let { permalink, userName, userPassword, userEmail, enabled } = req.body

        const user = await User.findOne({ where: { userEmail: userEmail } })
        if (user) {
            throw new Error("Email already exists")

        }
        const permalinkExists = await User.findOne({ where: { permalink: permalink } });
        if (permalinkExists) {
            throw new Error("Permalink already exists");
        }

        const hashedPassword = await bcrypt.hash(userPassword, 10)
        const newUser = await User.create({
            permalink, userName, userEmail, userPassword: hashedPassword, enabled
        });
        res.status(201).json({
            message: 'User Created SuccessFully',
            data: newUser
        })

    } catch (error) {
        console.log(error)

        res.status(400).json({
            error: error.message
        })
    }
}
const updateUser = async (req, res) => {
    try {
        validateSignUpData(req)
        const { id } = req.params;

        let { permalink, userName, userPassword, userEmail, enabled } = req.body
        const user = await User.findOne({ where: { userId: id } });
        if (!user) {
            throw new Error("User not found");
        }
        const userEmailExists = await User.findOne({ where: { userEmail: userEmail } })
        if (userEmailExists && userEmailExists.userId !== id) {
            throw new Error("Email already exists")

        }
        const permalinkExists = await User.findOne({ where: { permalink: permalink } });
        if (permalinkExists && permalinkExists.userId !== id) {
            throw new Error("Permalink already exists");
        }
        const hashedPassword = userPassword ? await bcrypt.hash(userPassword, 10) : user.userPassword;

        await User.update(
            { permalink, userName, userEmail, userPassword: hashedPassword, enabled },
            { where: { userId: id } }
        );

        res.status(200).json({
            message: 'User Updated Successfully',
            data: { id, permalink, userName, userEmail, enabled }
        });
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
const deleteUser = async (req, res) => {
    try {
        const { id } = req.params;

        const user = await User.findOne({ where: { userId: id } });
        if (!user) throw new Error('User not found');

        await User.destroy({ where: { userId: id } });

        res.status(200).json({ message: 'User deleted successfully' });
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