import { DataTypes, QueryInterface } from 'sequelize';

const TableName = 'user_account';

export default
{
  up: async (queryInterface: QueryInterface) => {
    await queryInterface.createTable(TableName,
      {
        id: {
          type: DataTypes.INTEGER.UNSIGNED,
          // allowNull: true,
          autoIncrement: true,
          primaryKey: true,
          comment: '系统自动分配的ID',
        },
        account: {
          type: DataTypes.STRING(30),
          allowNull: false,
          unique: true,
          comment: 'user自己起名的帐号',
        },
        password: {
          type: DataTypes.CHAR(128),
          allowNull: false,
          comment: '密码',
        },
        created_at: {
          type: DataTypes.DATE,
          allowNull: true,
        },
        updated_at: {
          type: DataTypes.DATE,
          allowNull: true,
        },
      },
    );
  },

  down: async (queryInterface: QueryInterface) => {
    await queryInterface.dropTable(TableName);
  },
};

