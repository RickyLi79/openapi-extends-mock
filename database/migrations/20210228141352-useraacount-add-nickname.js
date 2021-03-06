"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const TableName = 'user_account';
const ColumnName = 'nickname';
exports.default = {
    up: async (queryInterface) => {
        await queryInterface.addColumn(TableName, ColumnName, {
            type: sequelize_1.DataTypes.STRING(30),
            allowNull: false,
            comment: '昵称',
        });
    },
    down: async (queryInterface) => {
        await queryInterface.removeColumn(TableName, ColumnName);
    },
};
