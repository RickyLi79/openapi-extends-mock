import { EggAppConfig, PowerPartial } from 'egg';

export default () => {
  const config: PowerPartial<EggAppConfig> = {};
  config.security = { csrf: { enable: false } };
  config.logger = {
    consoleLevel: 'ALL',
  };

  config.session = {
    key: 'openapi-extends-mock:local',
  };

  config.sequelize = {
    database: 'openapi-extends-mock-dev',
  };

  return config;
};
