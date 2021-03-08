/* eslint-disable @typescript-eslint/no-unused-vars */
import { Application } from '../../../typings/app';
import { SqlModel, ModelInstance, ITimestamps } from './enum';
import { Association, Sequelize } from 'sequelize';
import { UserAccount } from './account';
import { nextTick } from 'process';
import { ProjectApi } from './api';


interface IAtts extends ITimestamps {
  readonly id: number;
  readonly uuid: string;
  name: string;
  owner_id: number;

}


abstract class IInstance extends ModelInstance<IAtts, 'id' | 'created_at' | 'updated_at' | 'uuid'> { }

export class UserProject extends IInstance implements IAtts {

  readonly id: number;
  readonly uuid: string;
  readonly created_at: Date;
  readonly updated_at: Date;

  name: string;
  owner_id!: number;

  readonly owner: UserAccount;
  readonly apis: ProjectApi[];
  public static associations: {
    owner: Association<UserProject, UserAccount>;
    apis: Association<UserProject, ProjectApi>;
  };
}
export default (app: Application, sequelize:Sequelize) => {
  const DataTypes = app.Sequelize;
  UserProject.init(
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
      created_at: {
        type: DataTypes.DATE,
        allowNull: true,
      },
      updated_at: {
        type: DataTypes.DATE,
        allowNull: true,
      },
    }, {
      sequelize,
      tableName: SqlModel.User_Project,
    });

  nextTick(() => {
    UserProject.belongsTo(app.model.User.Account);
    UserProject.hasMany(app.model.User.Api, { foreignKey: 'project_id', as: 'apis' });
  });

  return UserProject;
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
