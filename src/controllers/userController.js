const sequelize = require('../database')
const bcrypt = require('bcrypt')
const User = require('../models/user')
const { Op } = require("sequelize");
const { validateSignUpData } = require('../utils/validation')

const getUsers = async (req, res) => {

    try {
        console.log(req.query)
        const { limit = 10, offset = 0, filter, search, sortKey = 'createdAt', sortOrder = 'ASC' } = req.query;
        const allowedSortKeys = ['userId', 'permalink', 'userName', 'userEmail', 'enabled', 'createdAt', 'updatedAt'];
        if (!allowedSortKeys.includes(sortKey)) {
            throw new Error(`Invalid sort key: ${sortKey}`);
        }
        // console.log(search)
        const where = {};
        if (filter) {
            const filters = JSON.parse(filter);
            Object.assign(where, filters);
        }
        if (search) {
            where[Op.or] = [
                { userName: { [Op.like]: `%${search}%` } },
                { userEmail: { [Op.like]: `%${search}%` } },
                { permalink: { [Op.like]: `%${search}%` } },
            ];
        }
        console.log(where, search, sortOrder, 'search and where')
        const users = await User.findAndCountAll({
            where,
            limit: parseInt(limit),
            offset: parseInt(offset),
            order: [[sortKey, sortOrder]],
        });
        // console.log(users)
        res.status(200).json({
            message: 'Users fetched successfully',
            data: users.rows,
            meta: {
                total: users.count,
                limit: parseInt(limit),
                offset: parseInt(offset),
            },
        });
    } catch (error) {

        res.status(400).json({
            error: error.message
        })
    }
}
const getUser = async (req, res) => {
    try {
        try {
            const { id } = req.params;

            const user = await User.findOne({ where: { userId: id } });
            if (!user) {
                throw new Error('User not found');
            }

            res.status(200).json({
                message: 'User fetched successfully',
                data: user,
            });
        } catch (error) {
            res.status(400).json({ error: error.message });
        }

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
        console.log(userEmailExists.userId, id, 'id')
        if (userEmailExists && userEmailExists.userId != id) {
            throw new Error("Email already exists")

        }
        const permalinkExists = await User.findOne({ where: { permalink: permalink } });
        if (permalinkExists && permalinkExists.userId != id) {
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
        console.log('delete')
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