import { Context } from 'egg';

export default () => {

  const whiteListMap: { [method: string]: { [path: string]: true } } = {};
  {
    const whiteList = {
      POST: [ '/user/login', '/debug/user/login' ],
      GET: [ '/debug/test', '/debug/user/login', '/debug/user/restore', '/debug/user' ],
      PUT: [ '/user/register' ],
    };
    for (const iMethod in whiteList) {
      for (const iPath of whiteList[iMethod]) {
        whiteListMap[iMethod] = whiteListMap[iMethod] ?? {};
        whiteListMap[iMethod][iPath] = true;
      }
    }
  }

  return async (ctx: Context, next: any) => {

    const check = whiteListMap[ctx.method.toUpperCase()]?.[ctx.path];

    if (check) {
      await next();
    } else {
      if (ctx.isAuthenticated()) {
        await next();
      } else {
        ctx.status = 401;
      }
    }
  };
};
