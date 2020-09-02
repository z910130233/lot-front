import request from '@/utils/request';

// export async function getSelectOption(params) {
//   return request('/lot/users/get', {
//     method: 'POST',
//     data: params,
//   });
// }

export async function getSelectOption(code) {
  return request('/lot/open/code?code='+code);
}

export async function getCodeUrls(url) {
  return request(''+url+'');
}
