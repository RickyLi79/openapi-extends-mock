/* eslint-disable @typescript-eslint/no-unused-vars */

import { Context } from '../../typings/app';
import { IOasContext } from '../schema/oasTypes';
import { IPassportUser } from '../schema/types';


const OAS_CTX = Symbol('Context#OAS_CTX');


export default {

  get passportUser(): IPassportUser {
    return (this as Context).user;
  },

  get userInfo(): { account:string, nickname:string} {
    return { account: (this as Context).user.account, nickname: (this as Context).user.account };
  },


  getOasCtx():IOasContext<any> {
    const THIS = <any> this;
    if (THIS[OAS_CTX] === undefined) {
      THIS[OAS_CTX] = {
        request: {
          header: THIS.request.header,
          path: THIS.params,
          query: THIS.oasRequestQuery(),
          body: THIS.request.body,
        },
        response: {
          header: THIS.response.header,
          get body() {
            return THIS.response.body;
          },
          set body(value: any) {
            THIS.response.body = value;
          },
          get status() {
            return THIS.response.status;
          },
          set status(value: any) {
            THIS.response.status = value;
          },
        },

        get body() {
          return THIS.response.body;
        },
        set body(value: any) {
          THIS.response.body = value;
        },

        get status() {
          return THIS.response.status;
        },
        set status(value: any) {
          THIS.response.status = value;
        },
      };
    }
    return this[OAS_CTX];
  },

  cryptPassword(password:string) {
    return (this as Context).helper.cryptPassword(this.passportUser.account, password, (this as Context).app.config.hashKey);
  },
};
