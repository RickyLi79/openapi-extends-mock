import { Controller } from 'egg';

export default class extends Controller {

  public async 'GET /test'() {
    const { ctx } = this;
    ctx.body = new Date();

  }

}
