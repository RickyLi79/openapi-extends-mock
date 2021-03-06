import { DataTypes, QueryInterface } from 'sequelize';

const TableName = 'user_project';

export default {
  up: async (queryInterface:QueryInterface) => {
    await queryInterface.createTable(TableName,
      {
        id: {
          type: DataTypes.INTEGER.UNSIGNED,
          // allowNull: false,
          primaryKey: true,
          autoIncrement: true,
          comment: '系统自动分配的ID',
        },
        uuid: {
          type: DataTypes.UUID,
          defaultValue: DataTypes.UUIDV4,
          allowNull: false,
          comment: 'UUID v4',
          unique: true,
        },
        name: {
          type: DataTypes.STRING(30),
          allowNull: false,
          comment: 'project name',
        },
        owner_id: {
          type: DataTypes.INTEGER.UNSIGNED,
          allowNull: false,
          references: {
            model: 'user_account',
          },
          comment: 'project归属的account',
        },
        created_at: { type: DataTypes.DATE, allowNull: true },
        updated_at: { type: DataTypes.DATE, allowNull: true },
      });
  },

  down: async (queryInterface:QueryInterface) => {
    await queryInterface.dropTable(TableName);
  },
};
