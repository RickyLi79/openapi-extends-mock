import { EggAppConfig, PowerPartial } from 'egg';

export default () => {
  const config: PowerPartial<EggAppConfig> = {};

  config.security = { csrf: { enable: false } };
  config.logger = {
    consoleLevel: 'ALL',
  };

  config.session = {
    key: 'openapi-extends-mock:test',
  };

  return config;
};
