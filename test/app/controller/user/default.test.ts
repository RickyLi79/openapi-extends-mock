import { app } from 'egg-mock/bootstrap';
import factory from 'factory-girl';
import factories, { SeqName } from '../../factories';

describe('test/app/controller/user/default.test.ts', () => {


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

  describe('PUT /user/register', () => {

    const url = '/user/register';

    it('201', async () => {
      const account = 'test001';
      const password = 'test001';
      await app.httpRequest()
        .put(url)
        .send({ account, password })
        .expect(201);
    });

    it('409', async () => {
      await factory.create(SeqName.UserAccount);
      const account = 'account_1';
      const password = 'password_1';
      await app.httpRequest()
        .put(url)
        .send({ account, password })
        .expect(409);
    });
  });

  describe('POST /user/login', () => {

    const url = '/user/login';

    it("406 , invalidField is 'account'", async () => {
      const account = 'test001';
      const password = 'test001';
      await app.httpRequest()
        .post(url)
        .send({ account, password })
        .expect(406)
        .expect({ invalidField: 'account' });
    });

    it("406 , invalidField is 'password'", async () => {
      await factory.create(SeqName.UserAccount);

      const account = 'account_1';
      const password = '123456';
      await app.httpRequest()
        .post(url)
        .send({ account, password })
        .expect(406)
        .expect({ invalidField: 'password' });
    });

    it('302', async () => {
      await factory.create(SeqName.UserAccount);
      const account = 'account_1';
      const password = 'password_1';
      await app.httpRequest()
        .post(url)
        .send({ account, password })
        .expect(302);
    });

  });


  describe('GET /user/logout', () => {

    const url = '/user/logout';

    it('401', async () => {
      await app.httpRequest()
        .get(url)
        .expect(401);
    });

    it('202', async () => {
      const user = { account: '12' };
      app.mockUser(user);
      await app.httpRequest()
        .get(url)
        .expect(202);
    });

  });

});
