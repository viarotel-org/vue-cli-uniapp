import * as base from './modules/base';
import * as user from './modules/user';

export const requests = {
  ...base,
  ...user,
};

export default function install(app) {
  app.prototype.$req = requests;
}
