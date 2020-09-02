import request from '@/utils/request';

export async function upLoadFile(params) {
  return request('/lot/open/upload', {
    method: 'POST',
    data: params,
  });
}

