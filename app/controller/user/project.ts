import { Controller } from 'egg';

export default class UserController extends Controller {

  public async 'GET /'() {
    const { ctx } = this;
    const oasCtx = ctx.getOasCtx();
    const qry = oasCtx.request.query;
    const { count, rows } = await ctx.service.user.project.index(qry);
    ctx.body = { page: qry.page, limit: qry.limit, count, data: rows };
  }

  public async 'PUT /'() {
    const { ctx } = this;
    const oasCtx = ctx.getOasCtx();
    ctx.body = await ctx.service.user.project.create(oasCtx.request.body);
    ctx.status = 201;
  }


}
