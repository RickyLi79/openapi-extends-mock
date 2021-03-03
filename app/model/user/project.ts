/* eslint-disable @typescript-eslint/no-unused-vars */
import { AutoIncrement, Column, DataType, ForeignKey, Model, PrimaryKey, Table, BelongsTo, HasOne } from 'sequelize-typescript';
import { UserAccount } from './account';
import { SqlModel } from './enum';


@Table({
  modelName: SqlModel.User_Project,
  tableName: SqlModel.User_Project,
})
export class UserProject extends Model<UserProject> {
  @PrimaryKey
  @AutoIncrement
  @Column({
    type: DataType.INTEGER(10).UNSIGNED,
    comment: 'prject ID',
  })
  readonly id!: number;

  @Column({
    type: DataType.CHAR(32),
    allowNull: false,
    comment: "UUID v4, lower, remove '-'",
  })
  uuid!: string;

  @Column({
    type: DataType.STRING(30),
    allowNull: false,
    comment: 'project name',
  })
  name!: string;

  @ForeignKey(() => UserAccount)
  @Column({
    type: DataType.INTEGER(10).UNSIGNED,
    allowNull: false,
  })
  owner_id!: number;

  @BelongsTo(() => UserAccount, 'owner_id')
  owner!: UserAccount;

  @Column
  readonly created_at!: Date;

  @Column
  readonly updated_at!: Date;
}
export default () => UserProject;
