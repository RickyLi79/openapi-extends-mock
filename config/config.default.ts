import { EggAppConfig, EggAppInfo, PowerPartial } from 'egg';

export default (appInfo: EggAppInfo) => {
  const config = {} as PowerPartial<EggAppConfig>;

  // override config from framework / plugin
  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1614081539676_2329';
  config.hashKey = 'aae1c63f-5882-5c17-ae92-4341283f1fb5';

  // add your egg config in here
  config.middleware = [ 'useAuth' ];
  config.security = { csrf: { enable: false } };

  config.redis = {

  };

  config.sequelize = {
    dialect: 'mysql',
    host: 'localhost',
    port: 3307,
    username: 'root',
    password: '111111',
    database: 'openapi-extends-mock-dev',
    operatorsAliases: false,
    timezone: '+08:00',
    define: {
      timestamps: true,
      createdAt: 'created_at',
      updatedAt: 'updated_at',
      deletedAt: 'deleted_at',
      freezeTableName: true,
    },
    query: { nest: true },
  };

  config.redis = {
    client: {
      port: 6380, // Redis port
      host: '127.0.0.1', // Redis host
      password: '',
      db: 0,
    },
  };

  config.session = {
    key: 'openapi-extends-mock',
    maxAge: 24 * 3600 * 1000, // 1 天
    httpOnly: true,
    encrypt: true,
    renew: true,
  };

  config.passportLocal = {
    usernameField: 'account',
    passwordField: 'password',
  };


  // the return config will combines to EggAppConfig
  return {
    ...config,
  };
};
