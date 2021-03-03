import { app, assert } from 'egg-mock/bootstrap';
import factory from 'factory-girl';
import factories, { SeqName } from '../../factories';

describe.only('test/app/controller/user/infno.test.ts', () => {


  before(() => {
    factories(app);
  });

  afterEach(async () => {
    // clear database after each test case
    factory.resetSequence(SeqName.UserAccount);
    await Promise.all([
      app.model.User.Account.destroy({ truncate: true, force: true }),
    ]);
  });


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
      await factory.create(SeqName.UserAccount);
      const account = 'account_1';
      app.mockUserContext({ account });
      const oldPassword = 'password_1';
      const newPassword = 'newPassword';

      await app.httpRequest()
        .put(url)
        .send({ oldPassword, newPassword })
        .expect(202);
    });

    it('304', async () => {
      await factory.create(SeqName.UserAccount);
      const account = 'account_1';
      app.mockUserContext({ account });
      const oldPassword = 'password_1';
      const newPassword = oldPassword;

      await app.httpRequest()
        .put(url)
        .send({ oldPassword, newPassword })
        .expect(304);
    });

    it('406', async () => {
      await factory.create(SeqName.UserAccount);
      const account = 'account_1';
      app.mockUserContext({ account });
      const oldPassword = 'oldPassword';
      const newPassword = '12345';

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
      await factory.create(SeqName.UserAccount);
      const account = 'account_1';
      app.mockUserContext({ account });
      const nickname = factory.chance('name')();

      await app.httpRequest()
        .put(url)
        .send({ nickname })
        .expect(202);
    });

    it('304', async () => {
      const user: { account: string, nickname: string } = await factory.create(SeqName.UserAccount);
      const { account, nickname } = user;
      app.mockUserContext({ account });

      await app.httpRequest()
        .put(url)
        .send({ nickname })
        .expect(304);
    });

  });


});
