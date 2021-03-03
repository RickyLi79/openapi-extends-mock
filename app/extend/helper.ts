import crypto from 'crypto';

export default {
  cryptPassword: (...planTxt:string[]) => {
    const hash = crypto.createHash('sha512');
    return hash.update(planTxt.join('-')).digest('hex');
  },
};
