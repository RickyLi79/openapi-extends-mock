import { Controller } from 'egg';

export default class UserController extends Controller {

  public async 'PUT /register'() {
    const { ctx } = this;
    const reqBody = ctx.request.body;
    ctx.status = await ctx.service.user.default.register(reqBody.account, reqBody.password);

  }

  public async 'POST /login'() {
    const { ctx } = this;
    const reqBody = ctx.request.body;
    const result = await ctx.service.user.default.login(reqBody.account, reqBody.password);
    if (result.invalidField !== undefined) {
      ctx.body = { invalidField: result.invalidField };
    } else {
      await ctx.login(result.user!);
      ctx.body = ctx.userInfo;
    }
    ctx.status = result.status;
  }

  public async 'GET /logout'() {
    const { ctx } = this;
    ctx.logout();
    ctx.status = 202;
    ctx.body = 'logout';
  }

}
