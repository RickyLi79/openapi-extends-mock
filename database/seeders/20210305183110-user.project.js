"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const uuid_1 = require("uuid");
exports.default = {
    up: async (queryInterface) => {
        const userProjects = [];
        for (let i = 1; i < 10; i++) {
            const uv4 = uuid_1.v4();
            const uuidv4 = uv4.replace(/-/g, '');
            userProjects.push({ name: `seedProject_${i}`, owner_id: 1, uuid: uuidv4 });
        }
        await queryInterface.bulkInsert('user_project', userProjects);
    },
    down: async (queryInterface) => {
        await queryInterface.bulkDelete('user_project', { name: { [sequelize_1.Op.like]: 'seedProject_%' } });
    },
};
