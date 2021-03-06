import { app, assert } from 'egg-mock/bootstrap';
import factory from 'factory-girl';
import { ModelTypes, SeqName, UserPassword } from '../../factories';
import '../../.setup';

describe('test/app/controller/user/info.test.ts', () => {

  describe('GET /user/info', () => {

    const url = '/user/info';

    it('401', async () => {
      await app.httpRequest()
        .get(url)
        .expect(401);
    });

    it('200', async () => {
      const account = factory.chance('string')();
      app.mockUser({ account });
      await app.httpRequest()
        .get(url)
        .expect(200)
        .expect(res => {
          assert.strictEqual(res.body.account, account);
        });
    });

  });

  describe('PUT /user/password', () => {

    const url = '/user/info/password';

    it('401', async () => {
      await app.httpRequest()
        .get(url)
        .expect(401);
    });

    it('202', async () => {
      const { account } = await factory.create<ModelTypes.UserAccount>(SeqName.UserAccount);
      app.mockUserContext({ account });
      const oldPassword = UserPassword;
      const newPassword = UserPassword + 'abc123';

      await app.httpRequest()
        .put(url)
        .send({ oldPassword, newPassword })
        .expect(202);
    });

    it('304', async () => {
      const { account } = await factory.create<ModelTypes.UserAccount>(SeqName.UserAccount);
      app.mockUserContext({ account });
      const oldPassword = UserPassword;
      const newPassword = oldPassword;

      await app.httpRequest()
        .put(url)
        .send({ oldPassword, newPassword })
        .expect(304);
    });

    it('406', async () => {
      const { account } = await factory.create<ModelTypes.UserAccount>(SeqName.UserAccount);
      app.mockUserContext({ account });
      const oldPassword = UserPassword + 'abc123';
      const newPassword = UserPassword + '321cba';

      await app.httpRequest()
        .put(url)
        .send({ oldPassword, newPassword })
        .expect(406);
    });

  });

  describe('PUT /user/nickname', () => {

    const url = '/user/info/nickname';

    it('401', async () => {
      await app.httpRequest()
        .get(url)
        .expect(401);
    });

    it('202', async () => {
      const { account } = await factory.create<ModelTypes.UserAccount>(SeqName.UserAccount);
      app.mockUserContext({ account });
      const nickname = factory.chance('name')();

      await app.httpRequest()
        .put(url)
        .send({ nickname })
        .expect(202);
    });

    it('304', async () => {
      const { account, nickname } = await factory.create<ModelTypes.UserAccount>(SeqName.UserAccount);
      app.mockUserContext({ account });
      await app.httpRequest()
        .put(url)
        .send({ nickname })
        .expect(304);
    });

  });


});
