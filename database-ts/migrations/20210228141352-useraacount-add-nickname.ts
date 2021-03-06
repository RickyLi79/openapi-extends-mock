import { DataTypes, QueryInterface } from 'sequelize';
const TableName = 'user_account';
const ColumnName = 'nickname';
export default {
  up: async (queryInterface:QueryInterface) => {
    await queryInterface.addColumn(TableName, ColumnName,
      {
        type: DataTypes.STRING(30),
        allowNull: false,
        comment: '昵称',
      });
  },

  down: async (queryInterface:QueryInterface) => {
    await queryInterface.removeColumn(TableName, ColumnName);
  },
};
