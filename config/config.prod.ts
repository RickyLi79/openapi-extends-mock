import { EggAppConfig, PowerPartial } from 'egg';

export default () => {
  const config: PowerPartial<EggAppConfig> = {};

  config.sequelize = {
    database: 'openapi-extends-mock-prod',
  };

  return config;
};
