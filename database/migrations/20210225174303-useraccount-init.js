"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const TableName = 'user_account';
exports.default = {
    up: async (queryInterface) => {
        await queryInterface.createTable(TableName, {
            id: {
                type: sequelize_1.DataTypes.INTEGER.UNSIGNED,
                // allowNull: true,
                autoIncrement: true,
                primaryKey: true,
                comment: '系统自动分配的ID',
            },
            account: {
                type: sequelize_1.DataTypes.STRING(30),
                allowNull: false,
                unique: true,
                comment: 'user自己起名的帐号',
            },
            password: {
                type: sequelize_1.DataTypes.CHAR(128),
                allowNull: false,
                comment: '密码',
            },
            created_at: {
                type: sequelize_1.DataTypes.DATE,
                allowNull: true,
            },
            updated_at: {
                type: sequelize_1.DataTypes.DATE,
                allowNull: true,
            },
        });
    },
    down: async (queryInterface) => {
        await queryInterface.dropTable(TableName);
    },
};
