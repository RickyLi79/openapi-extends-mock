import { Controller } from 'egg';
import { oasContext } from '../../schema/oasTypes';

export default class extends Controller {

  public async 'GET /user'() {
    const { ctx } = this;
    const oasCtx:oasContext.GET_debug_user = ctx.getOasCtx();

    const qry = oasCtx.request.query;

    ctx.status = 200;
    const { count, rows } = await ctx.service.user.default.index(qry);
    oasCtx.body = { page: qry.page, limit: qry.limit, count, data: rows };
  }

  public async 'GET /user/restore'() {
    const { ctx } = this;
    ctx.status = 200;
    ctx.body = await ctx.service.user.default.restore();
  }

  public async 'POST /user/login'() {
    const { ctx } = this;
    const reqBody = ctx.request.body;
    const result = await ctx.service.user.default.debugLogin(reqBody.account);
    if (result.invalidField !== undefined) {
      ctx.body = { invalidField: result.invalidField };
    } else {
      await ctx.login(result.user!);
      ctx.body = ctx.userInfo;
    }
    ctx.status = result.status;
  }
}
