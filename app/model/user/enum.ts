import { Model, Optional } from 'sequelize';

export enum SqlModel {
  User_Account = 'user_account',
  User_Project = 'user_project',
  Project_Api = 'project_api',
}

export interface ITimestamps{
  readonly created_at: Date;
  readonly updated_at: Date;
}

export abstract class ModelInstance<T, K extends keyof T> extends Model<T, Optional<T, K>> { }
