import { uniGetAppId } from '@/utils';
import { requestConfig } from "@/config";
import { getStorages } from '@/plugins/storages';
import { uniToast } from '../utils';
/**
 * @desc 上传文件
 * @param {string} filePath 
 * @param {*} options 
 */
export function uniUploadFile(filePath, { actionUrl = '', name = 'file', report, ...moreOptions } = {}) {
  return new Promise(resolve => {
    const uploadTask = uni.uploadFile({
      url: actionUrl, //开发者服务器地址
      filePath,
      name,
      ...moreOptions,
      success: (res) => {
        console.log('uni.uploadFile.success.res', res);
        resolve({ data: JSON.parse(res.data), status: true });
      },
      fail: (err) => {
        console.log('uni.uploadFile.fail.err', err);
        resolve({ data: {}, status: false });
      }
    });

    report && report(uploadTask);
  });
}

export default async (filePath, { isTips = false, ...moreOptions } = {}) => {
  const actionUrl = `${requestConfig.baseUrl}Public/uplode_image`;
  const header = {
    appId: uniGetAppId(),
    [requestConfig.authorization.key]:
      requestConfig.authorization.prefix + getStorages("token"),
  };
  let { status, data } = await uniUploadFile(filePath, { actionUrl, header, ...moreOptions });

  if (status && data.code !== requestConfig.responseSuccessCode) {
    status = false;
  }

  if (!status) {
    isTips && uniToast('上传文件失败请重试');
  }

  return { status, data };
};