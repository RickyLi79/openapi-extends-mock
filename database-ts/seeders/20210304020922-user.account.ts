import { Chance } from 'chance';
import { Op, QueryInterface } from 'sequelize';

export default
{
  up: async (queryInterface: QueryInterface) => {
    const chance = new Chance();
    const userAccounts:{ account:string, nickname:string, password:string}[] = [];
    for (let i = 1; i < 10; i++) {
      userAccounts.push({ account: `seedAcc_${i}`, nickname: chance.name(), password: '' });
    }
    await queryInterface.bulkInsert('user_account', userAccounts);
  },

  down: async (queryInterface: QueryInterface) => {
    await queryInterface.bulkDelete('user_account', { account: { [Op.like]: 'seedAcc_%' } });
  },
};

