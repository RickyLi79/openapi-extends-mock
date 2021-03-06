"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const TableName = 'user_project';
const attrs = ['owner_id', 'name'];
exports.default = {
    up: async (queryInterface) => {
        await queryInterface.addIndex(TableName, {
            fields: attrs,
            unique: true,
        });
    },
    down: async (queryInterface) => {
        await queryInterface.sequelize.transaction(async (transaction) => {
            /**
             *  直接删除会报错，因为有 owner_id foreign_key_checks
             *  所以先加上
             **/
            await queryInterface.addIndex(TableName, {
                fields: ['owner_id'],
                name: 'owner_id',
                transaction,
            });
            /** 再执行删除 */
            await queryInterface.removeIndex(TableName, attrs, { transaction });
        });
    },
};
