import { Service } from 'egg';
import { IFindOptions } from 'sequelize-typescript';
import { v4 } from 'uuid';
import { UserProject } from '../../model/user/project';

export default class UserProjectService extends Service {


  async index(qry: { page: number, limit: number }) {
    const opt:IFindOptions<UserProject> = {
      limit: qry.limit,
      offset: qry.limit * (qry.page - 1),
      attributes: [ 'uuid', 'name' ],
      where: {
        owner_id: this.ctx.passportUser.id,
      },
      raw: true,
    };
    return await this.app.model.User.Project.findAndCountAll(opt);
  }

  async create(reqBody: { name: string }) {
    const uv4 = v4();
    console.log(uv4);
    const uuidv4 = uv4.replace(/-/g, '');
    const { uuid, name, owner_id } = await this.ctx.model.User.Project.create(
      {
        name: reqBody.name,
        owner_id: this.ctx.passportUser.id,
        uuid: uuidv4,
      },
    );

    return { uuid, name, owner_id };
  }

}
