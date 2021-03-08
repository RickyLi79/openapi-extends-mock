import { app } from 'egg-mock/bootstrap';
import factory from 'factory-girl';
import assert from 'power-assert';
import '../../.setup';
import { ModelTypes, SeqName } from '../../factories';


describe('test/app/controller/user/project.test.ts', () => {

  describe('GET /user/project', () => {

    const url = '/user/project';

    it('401', async () => {
      await app.httpRequest()
        .get(url)
        .expect(401);
    });

    it('200', async () => {
      const { id, account } = await factory.create<ModelTypes.UserAccount>(SeqName.UserAccount);
      await factory.createMany<ModelTypes.UserProject>(SeqName.UserProject, 5, { owner_id: id });
      app.mockUser({ id, account });
      await app.httpRequest()
        .get(url)
        .expect(200)
        .expect(res => {
          assert.strictEqual(res.body.data.length, 5);
        });

    });

  });

  describe('PUT /user/project', () => {

    const url = '/user/project';

    it('401', async () => {
      await app.httpRequest()
        .get(url)
        .expect(401);
    });

    it('201', async () => {
      const { id, account } = await factory.create<ModelTypes.UserAccount>(SeqName.UserAccount);
      app.mockUser({ id, account });
      const name = 'project-name';

      await app.httpRequest()
        .put(url)
        .send({ name })
        .expect(201);
    });

    it('409', async () => {
      const { id, account } = await factory.create<ModelTypes.UserAccount>(SeqName.UserAccount);
      const { name } = await factory.create<ModelTypes.UserProject>(SeqName.UserProject, { owner_id: id });
      app.mockUser({ id, account });

      await app.httpRequest()
        .put(url)
        .send({ name })
        .expect(409);
    });

  });


});
