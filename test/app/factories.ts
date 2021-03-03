/* eslint-disable @typescript-eslint/no-unused-vars */
import { MockApplication } from 'egg-mock';
import factory from 'factory-girl';
import { Context } from '../../typings/app';

export enum SeqName{
  UserAccount = 'user.account'
}

export default async (app: MockApplication) => {
  const ctx = app.mockContext();

  factory.define(SeqName.UserAccount, app.model.User.Account, _buildOptions => {
    const n = factory.sequence(SeqName.UserAccount)();
    const attrs = {
      account: `account_${n}`,
      password: ctx.helper.cryptPassword(`account_${n}`, `password_${n}`, app.config.hashKey),
      nickname: factory.chance('name'),
    };
    return attrs;
  });

  await Promise.all([
    app.model.User.Account.destroy({ truncate: true, force: true }),
  ]);
};

declare module 'egg-mock'{
  interface MockApplication{
    mockUser(user:any):void;
    mockUserContext(user:any):Context;
  }
}
