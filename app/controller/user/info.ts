import { Controller } from 'egg';

export default class UserController extends Controller {

  public async 'GET /'() {
    const { ctx } = this;
    ctx.status = 200;
    const { account } = ctx.passportUser;
    ctx.body = { account };
  }

  public async 'PUT /password'() {
    const { ctx } = this;
    const reqBody: { oldPassword: string, newPassword: string } = ctx.request.body;

    const result = await ctx.service.user.info.editPassword(ctx.passportUser.account, reqBody.oldPassword, reqBody.newPassword);
    ctx.status = result
      .status;
  }

  public async 'PUT /nickname'() {
    const { ctx } = this;
    const reqBody: { nickname: string } = ctx.request.body;

    const result = await ctx.service.user.info.editNickname(ctx.passportUser.account, reqBody.nickname);
    ctx.status = result.status;
  }

}
