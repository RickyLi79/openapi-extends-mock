/* eslint-disable @typescript-eslint/no-unused-vars */
import { Application } from '../../../typings/app';
import { SqlModel, ModelInstance, ITimestamps } from './enum';
import { Association, Sequelize } from 'sequelize';
import { UserAccount } from './account';
import { nextTick } from 'process';
import { UserProject } from './project';


interface IAtts extends ITimestamps {
  readonly id: number;
  readonly uuid: string;
  name: string;
  owner_id: number;
  project_id: number;

  type: string;
  format: string;
  version: string;
  content: string;
}


abstract class IInstance extends ModelInstance<IAtts, 'id' | 'created_at' | 'updated_at' | 'uuid'> { }

export class ProjectApi extends IInstance implements IAtts {
  type: string;
  format: string;
  version: string;
  content: string;

  readonly id: number;
  readonly uuid: string;
  readonly created_at: Date;
  readonly updated_at: Date;

  name: string;
  owner_id: number;
  project_id: number;

  readonly owner: UserAccount;
  readonly project: UserProject;
  public static associations: {
    owner: Association<ProjectApi, UserAccount>;
    project: Association<ProjectApi, UserProject>;
  };

}
export default (app: Application, sequelize:Sequelize) => {
  const DataTypes = app.Sequelize;
  ProjectApi.init(
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
    }, {
      sequelize,
      tableName: SqlModel.Project_Api,
    });

  nextTick(() => {
    ProjectApi.belongsTo(app.model.User.Account);
    ProjectApi.belongsTo(app.model.User.Project);
  });

  return ProjectApi;
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
