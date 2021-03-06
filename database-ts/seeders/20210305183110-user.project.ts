import { QueryInterface, Op } from 'sequelize';
import { v4 } from 'uuid';

export default
{
  up: async (queryInterface: QueryInterface) => {
    const userProjects:{
      name: string,
      owner_id: number,
      uuid: string,
    }[] = [];
    for (let i = 1; i < 10; i++) {
      const uv4 = v4();
      const uuidv4 = uv4.replace(/-/g, '');
      userProjects.push({ name: `seedProject_${i}`, owner_id: 1, uuid: uuidv4 });
    }
    await queryInterface.bulkInsert('user_project', userProjects);
  },

  down: async (queryInterface: QueryInterface) => {
    await queryInterface.bulkDelete('user_project', { name: { [Op.like]: 'seedProject_%' } });
  },
};

