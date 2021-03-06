import { Service } from 'egg';
// import { v4 } from 'uuid';
import { FindAndCountOptions } from 'sequelize';
import { UserProject } from '../../model/user/project';

export default class UserProjectService extends Service {

  async index(qry: { page: number, limit: number }) {
    const opt:FindAndCountOptions<UserProject> = {
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
    try {
      const { uuid, name, owner_id } = await this.ctx.model.User.Project.create(
        {
          name: reqBody.name,
          owner_id: this.ctx.passportUser.id,
        },
      );

      return { status: 201, data: { uuid, name, owner_id } };
    } catch (err) {
      if (err.original?.errno === 1062) {
        return { status: 409 }; // 409 "conflict"
      }
      throw err;
    }
  }

}
