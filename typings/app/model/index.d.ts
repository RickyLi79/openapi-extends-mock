// This file is created by egg-ts-helper@1.25.8
// Do not modify this file!!!!!!!!!

import 'egg';
import ExportUserAccount from '../../../app/model/user/account';
import ExportUserApi from '../../../app/model/user/api';
import ExportUserEnum from '../../../app/model/user/enum';
import ExportUserProject from '../../../app/model/user/project';

declare module 'egg' {
  interface IModel {
    User: {
      Account: ReturnType<typeof ExportUserAccount>;
      Api: ReturnType<typeof ExportUserApi>;
      Enum: ReturnType<typeof ExportUserEnum>;
      Project: ReturnType<typeof ExportUserProject>;
    }
  }
}
