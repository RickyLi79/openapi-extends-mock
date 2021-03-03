import { Service } from 'egg';

export default class UserService extends Service {


  async editPassword(account: string, oldPassword: string, newPassword: string) {
    if (oldPassword === newPassword) {
      return { status: 304 }; // 304 "not modified"
    }
    account = account.toLowerCase();
    oldPassword = this.ctx.cryptPassword(oldPassword);
    newPassword = this.ctx.cryptPassword(newPassword);

    const [ count ] = await this.ctx.model.User.Account.update({ password: newPassword }, { where: { account, password: oldPassword } });
    if (count === 0) {
      return { status: 406 };
    } // 406 "not acceptable"
    return { status: 202 };
  }

  async editNickname(account: string, nickname: string) {
    account = account.toLowerCase();
    nickname = nickname.trim();
    const [ count ] = await this.ctx.model.User.Account.update({ nickname }, { where: { account } });
    if (count === 0) {
      return { status: 304 };
    } // 406 "not acceptable"
    return { status: 202 };
  }

}
