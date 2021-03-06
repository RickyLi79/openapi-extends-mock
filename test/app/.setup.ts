import { app } from 'egg-mock/bootstrap';
import factories, { reset } from './factories';


before(() => factories(app));
afterEach(async () => {
  await reset();
});
