// This file is created by egg-ts-helper@1.25.8
// Do not modify this file!!!!!!!!!

import 'egg';
import ExportUseAuth from '../../../app/middleware/useAuth';

declare module 'egg' {
  interface IMiddleware {
    useAuth: typeof ExportUseAuth;
  }
}
