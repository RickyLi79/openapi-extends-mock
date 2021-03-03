import { Service } from 'egg';
import { IPassportUser } from '../../schema/types';

export default class UserService extends Service {

  async register(account: string, password: string) {
    const nickname = account;
    account = account.toLowerCase();
    password = this.ctx.helper.cryptPassword(account, password, this.config.hashKey);
    try {
      await this.app.model.User.Account.create({ account, nickname, password });
    } catch (err) {
      if (err.original?.errno === 1062) {
        return 409; // 409 "conflict"
      }
      // this.logger.error(err);
      throw err;
    }
    return 201; // 201 "created"
  }

  async login(account: string, password: string): Promise<{ status: number, user?: IPassportUser, invalidField?: 'account' | 'password' }> {
    account = account.toLowerCase();
    password = this.ctx.helper.cryptPassword(account, password, this.config.hashKey);
    const user = await this.app.model.User.Account.findOne(
      {
        where: { account },
        attributes: [ 'id', 'nickname', 'password' ],
        raw: true,
      });
    if (!user) {
      return { status: 406, invalidField: 'account' }; // 406 "not acceptable"
    }
    if (user?.password !== password) {
      return { status: 406, invalidField: 'password' }; // 406 "not acceptable"
    }

    // 302 "found"
    return { status: 302, user: { provider: 'local', account, id: user.id, nickname: user.nickname } };
  }


  // #region debug

  async index(qry: { page: number, limit: number }) {
    return await this.app.model.User.Account.findAndCountAll(
      {
        limit: qry.limit,
        offset: qry.limit * (qry.page - 1),
        attributes: [ 'account', 'nickname' ],
        raw: true,
      },
    );
  }

  async debugLogin(account: string): Promise<{ status: number, user?: IPassportUser, invalidField?: 'account' | 'password' }> {
    account = account.toLowerCase();
    const user = await this.app.model.User.Account.findOne({ where: { account }, attributes: [ 'id', 'nickname' ] });
    if (!user) {
      return { status: 406, invalidField: 'account' }; // 406 "not acceptable"
    }

    // 302 "found"
    return { status: 302, user: { provider: 'local', id: user.id, account, nickname: user.nickname } };
  }

  async restore() {
    const counter = this.app.model.User.Account.count();
    await this.app.model.User.Account.destroy({ force: true, truncate: true });
    return counter;
  }
  // #endregion
}
