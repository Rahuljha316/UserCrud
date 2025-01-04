'use strict';
module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.createTable('Users',
            {
                userId: {
                    type: DataTypes.INTEGER,
                    primaryKey: true,
                    autoIncrement: true,
                },
                permalink: {
                    type: DataTypes.STRING,
                    unique: true,
                    allowNull: false,
                },
                userName: {
                    type: DataTypes.STRING,
                    allowNull: false,
                },
                userEmail: {
                    type: DataTypes.STRING,
                    unique: true,
                    allowNull: false,
                },
                userPassword: {
                    type: DataTypes.STRING,
                    allowNull: false,
                },
                enabled: {
                    type: DataTypes.BOOLEAN,
                    defaultValue: true,
                },
                deleted: {
                    type: DataTypes.BOOLEAN,
                    defaultValue: false,
                },}
);
    },
    down: async (queryInterface, Sequelize) => {
        await queryInterface.dropTable('Users');
    }
};
