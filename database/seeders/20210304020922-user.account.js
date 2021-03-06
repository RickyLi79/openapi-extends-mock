"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const chance_1 = require("chance");
const sequelize_1 = require("sequelize");
exports.default = {
    up: async (queryInterface) => {
        const chance = new chance_1.Chance();
        const userAccounts = [];
        for (let i = 1; i < 10; i++) {
            userAccounts.push({ account: `seedAcc_${i}`, nickname: chance.name(), password: '' });
        }
        await queryInterface.bulkInsert('user_account', userAccounts);
    },
    down: async (queryInterface) => {
        await queryInterface.bulkDelete('user_account', { account: { [sequelize_1.Op.like]: 'seedAcc_%' } });
    },
};
