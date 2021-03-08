import { DataTypes, QueryInterface } from 'sequelize';

const TableName = 'project_api';

export default {
  up: async (queryInterface:QueryInterface) => {
    await queryInterface.createTable(TableName,
      {
        id: {
          type: DataTypes.INTEGER.UNSIGNED,
          // allowNull: false,
          autoIncrement: true,
          primaryKey: true,
          comment: '系统自动分配的ID',
        },
        uuid: {
          type: DataTypes.UUIDV4,
          allowNull: false,
          defaultValue: DataTypes.UUIDV4,
          unique: true,
        },
        name: {
          type: DataTypes.STRING(30),
          allowNull: false,
        },
        owner_id: {
          type: DataTypes.INTEGER.UNSIGNED,
          allowNull: false,
        },
        project_id: {
          type: DataTypes.INTEGER.UNSIGNED,
          allowNull: false,
        },
        type: {
          type: DataTypes.ENUM('3.0', '2.0'),
          allowNull: false,
        },
        format: {
          type: DataTypes.ENUM('JSON', 'YAML'),
          allowNull: false,
        },
        version: {
          type: DataTypes.STRING(20),
          allowNull: false,
        },
        content: {
          type: DataTypes.TEXT({ length: 'long' }),
          allowNull: false,
        },

        created_at: {
          type: DataTypes.DATE,
          allowNull: true,
        },
        updated_at: {
          type: DataTypes.DATE,
          allowNull: true,
        },
      });
  },

  down: async (queryInterface:QueryInterface) => {
    await queryInterface.dropTable(TableName);
  },
};
