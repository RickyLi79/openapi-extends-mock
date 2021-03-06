/* eslint-disable @typescript-eslint/no-unused-vars */
import { nextTick } from 'process';
import { Association, Sequelize } from 'sequelize';
import { Application } from '../../../typings/app';
import { ITimestamps, ModelInstance, SqlModel } from './enum';
import { UserProject } from './project';


interface IAtts extends ITimestamps {
  readonly id?: number;
  account: string;
  password: string;
  nickname: string;
}


abstract class IInstance extends ModelInstance<IAtts, 'id' | 'created_at' | 'updated_at'> { }

export class UserAccount extends IInstance implements IAtts {

  readonly id: number;
  readonly created_at: Date;
  readonly updated_at: Date;

  account: string;
  password: string;
  nickname: string;

  readonly projects: UserProject[];
  public static associations: {
    projects: Association<UserAccount, UserProject>;
  };

}
export default (app: Application, sequelize:Sequelize) => {
  const DataTypes = app.Sequelize;
  UserAccount.init(
    {
      id: {
        type: DataTypes.INTEGER.UNSIGNED,
        // defaultValue: null,
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
      nickname: {
        type: DataTypes.STRING(30),
        allowNull: false,
        comment: '昵称',
      },
    }, {
      sequelize,
      tableName: SqlModel.User_Account,
    });

  nextTick(() => {
    UserAccount.hasMany(app.model.User.Project, {
      foreignKey: 'owner_id',
      as: 'projects', // this determines the name in `associations`!
      constraints: false,
    });
  });

  return UserAccount;
};


/*


export default (app: Application) => {
  const DataTypes = app.Sequelize;
  const useAccount = app.model.define<IInstance>(SqlModel.User_Account, {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
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
    nickname: {
      type: DataTypes.STRING(30),
      allowNull: false,
      comment: '昵称',
    },
  }, {
    tableName: SqlModel.User_Account,
  });

  useAccount.hasMany(app.model.User.Project, { as: 'projects', foreignKey: 'owner_id' });
  return useAccount;

};
 */
