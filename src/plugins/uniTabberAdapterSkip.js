import uniRouter from '@/plugins/uniRouter';
import { tabberConfig } from '@/config'

export default function tabberAdapterSkip(name, params, { mode = tabberConfig.mode, customHomePageName = tabberConfig.customHomePageName, isReplaceAll = false } = {}) {
  console.log('name', name);
  switch (mode) {
    case 'native':
      uniRouter.pushTab({ name, params: { ...params } });
      break;
    case 'custom':
      uniRouter[isReplaceAll ? 'replaceAll' : 'push']({ name: customHomePageName, params: { tabbarName: name, params } });
      break;
  }
};