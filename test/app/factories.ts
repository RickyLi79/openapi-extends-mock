/* eslint-disable @typescript-eslint/no-unused-vars */
import { MockApplication } from 'egg-mock';
import factory from 'factory-girl';
import { Context } from '../../typings/app';

export enum SeqName {
  UserAccount = 'user_account',
  UserProject = 'user_project',
}

export const UserPassword = '111111';

export namespace ModelTypes {
  export interface UserAccount {
    id:number;
    account: string;
    password: string;
    nickname: string;
  }
  export interface UserProject {
    id:number,
    uuid: string;
    name: string;
    owner_id: number;
  }
}

let gApp: MockApplication;

export default async (app: MockApplication) => {
  gApp = app;
  const ctx = app.mockContext();

  factory.define(SeqName.UserAccount, app.model.User.Account, buildOptions => {
    const n = factory.sequence(SeqName.UserAccount)();
    const account = buildOptions?.account ?? `account_${n}`;
    const attrs = {
      id: n,
      account,
      password: ctx.helper.cryptPassword(account, UserPassword, app.config.hashKey),
      nickname: buildOptions?.nickname ?? factory.chance('name'),
    };
    return attrs;
  });

  factory.define(SeqName.UserProject, app.model.User.Project, buildOptions => {
    const n = factory.sequence(SeqName.UserProject)();
    const attrs = {
      id: n,
      uuid: buildOptions?.uuid ?? `uuid_${n}`,
      name: buildOptions?.name ?? `project_${n}`,
      owner_id: buildOptions?.owner_id ?? factory.chance('integer', 1, 5),
    };
    return attrs;
  });

  await reset();
};

export async function reset() {
  await gApp.model.User.Project.truncate({ force: true });
  await gApp.model.User.Account.destroy({ where: {} });
  await gApp.model.query(`ALTER TABLE \`${SeqName.UserAccount}\` AUTO_INCREMENT = 1;`, { type: gApp.Sequelize.QueryTypes.RAW });
  await gApp.model.query(`ALTER TABLE \`${SeqName.UserProject}\` AUTO_INCREMENT = 1;`, { type: gApp.Sequelize.QueryTypes.RAW });
  factory.resetSequence();
}

declare module 'egg-mock' {
  interface MockApplication {
    mockUser(user: any): void;
    mockUserContext(user: any): Context;
  }
}
