/* eslint-disable @typescript-eslint/no-unused-vars */
import { AutoIncrement, Column, DataType, Model, PrimaryKey, Table, HasMany, ForeignKey } from 'sequelize-typescript';
import { SqlModel } from './enum';
import { UserProject } from './project';


@Table({
  modelName: SqlModel.User_Account,
  tableName: SqlModel.User_Account,
})
export class UserAccount extends Model<UserAccount> {
  @PrimaryKey
  @AutoIncrement
  @Column({
    type: DataType.INTEGER(10).UNSIGNED,
    comment: '用户ID',
  })
  readonly id!: number;

  @Column({
    type: DataType.STRING(30),
    allowNull: false,
    unique: true,
    comment: '帐号',
  })
  account!: string;

  @Column({
    type: DataType.STRING(30),
    allowNull: false,
    comment: '昵称',
  })
  nickname!: string;

  @Column({
    type: DataType.CHAR(128),
    allowNull: false,
    comment: '密码',
  })
  password!: string;

  @HasMany(() => UserProject, 'owner_id')
  projects!: UserProject[];

  @Column
  readonly created_at!: Date;

  @Column
  readonly updated_at!: Date;
}
export default () => UserAccount;

