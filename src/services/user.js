import request from '@/utils/request';

export async function query() {
  return request('/api/users');
}
export async function queryCurrent() {
  return request('/api/currentUser');
}
export async function queryGet(username) {
  return request('/lot/users/getuser?username='+username);
}
export async function queryNotices() {
  return request('/api/notices');
}
