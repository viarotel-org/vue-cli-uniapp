import uview from './uview-ui';
import resolveTailwindConfig from './resolve-tailwind-config';

export default function install(app) {
  app.use(uview);
  app.use(resolveTailwindConfig);
}
