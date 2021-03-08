// This file is created by egg-ts-helper@1.25.8
// Do not modify this file!!!!!!!!!

import 'egg';
import ExportDebugDefault from '../../../app/controller/debug/default';
import ExportDebugUser from '../../../app/controller/debug/user';
import ExportUserApi from '../../../app/controller/user/api';
import ExportUserDefault from '../../../app/controller/user/default';
import ExportUserInfo from '../../../app/controller/user/info';
import ExportUserProject from '../../../app/controller/user/project';

declare module 'egg' {
  interface IController {
    debug: {
      default: ExportDebugDefault;
      user: ExportDebugUser;
    }
    user: {
      api: ExportUserApi;
      default: ExportUserDefault;
      info: ExportUserInfo;
      project: ExportUserProject;
    }
  }
}
