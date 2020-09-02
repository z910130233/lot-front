import request from '@/utils/request';

export async function roleList(params) {
  return request('/lot/role/findlist', {
    method: 'POST',
    data: params,
  });
}


export async function authorityList(params) {
  return request('/lot/authority/findlist', {
    method: 'POST',
    data: params,
  });
}

export async function addAuthority(params) {
  return request('/lot/authority/save', {
    method: 'POST',
    data: params,
  });
}
