import request from '@/utils/request';

export async function findList(params) {
  return request('/lot/users/findlist', {
    method: 'POST',
    data: params,
  });
}

export async function getUser(userId) {
  return request(`/lot/users/get?userId=`+userId)
}

export async function saveUser(params) {
  return request('/lot/users/save', {
    method: 'POST',
    data: params,
  });
}

export async function deleteItem(params) {
  return request('/lot/users/delete?userId='+params.userId, {
    method: 'POST',
    data: params,
  });
}
