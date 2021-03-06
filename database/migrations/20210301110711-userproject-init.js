"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const TableName = 'user_project';
exports.default = {
    up: async (queryInterface) => {
        await queryInterface.createTable(TableName, {
            id: {
                type: sequelize_1.DataTypes.INTEGER.UNSIGNED,
                // allowNull: false,
                primaryKey: true,
                autoIncrement: true,
                comment: '系统自动分配的ID',
            },
            uuid: {
                type: sequelize_1.DataTypes.UUID,
                defaultValue: sequelize_1.DataTypes.UUIDV4,
                allowNull: false,
                comment: 'UUID v4',
                unique: true,
            },
            name: {
                type: sequelize_1.DataTypes.STRING(30),
                allowNull: false,
                comment: 'project name',
            },
            owner_id: {
                type: sequelize_1.DataTypes.INTEGER.UNSIGNED,
                allowNull: false,
                references: {
                    model: 'user_account',
                },
                comment: 'project归属的account',
            },
            created_at: { type: sequelize_1.DataTypes.DATE, allowNull: true },
            updated_at: { type: sequelize_1.DataTypes.DATE, allowNull: true },
        });
    },
    down: async (queryInterface) => {
        await queryInterface.dropTable(TableName);
    },
};
