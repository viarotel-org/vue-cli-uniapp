import resolveConfig from 'tailwindcss/resolveConfig';
import tailwindConfig from '../../../tailwind.config';

export default function install(app) {
  app.prototype.$tailwind = resolveConfig(tailwindConfig);
}
