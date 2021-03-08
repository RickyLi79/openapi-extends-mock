import { Controller } from 'egg';

export default class UserController extends Controller {

  public async 'GET /:project'() {
    const { ctx } = this;
    const oasCtx = ctx.getOasCtx();
    const qry = oasCtx.request.query;
    // const { count, rows } = await ctx.service.user.project.index(qry);
    // ctx.body = { page: qry.page, limit: qry.limit, count, data: rows };
    ctx.body = { page: qry.page, limit: qry.limit, project: oasCtx.request.path.project };
  }

  public async 'PUT /:project'() {
    const { ctx } = this;
    const oasCtx = ctx.getOasCtx();
    ctx.body = { project: oasCtx.request.path.project };
    // const result = await ctx.service.user.project.create(oasCtx.request.body);
    // ctx.status = result.status;
    // if (result.data !== undefined) ctx.body = result.data;
  }


}
