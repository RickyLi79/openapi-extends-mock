import { Model, Optional } from 'sequelize';

export enum SqlModel {
  User_Account = 'user_account',
  User_Project = 'user_project',
}

/**
 * @param T 这个是数据完整interface定义
 * @param K 这个是数据创建必选字段
 */
export type ModelInstance2<T, K extends keyof T> = Model<T, Optional<T, K>>;

export interface ITimestamps{
  readonly created_at: Date;
  readonly updated_at: Date;
}

export abstract class ModelInstance<T, K extends keyof T> extends Model<T, Optional<T, K>> { }
