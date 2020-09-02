import request from '@/utils/request';

export async function fakeAccountLogin(params) {
  return request('/lot/user/login', {
    method: 'POST',
    data: params,
  });
}
// export async function getFakeCaptcha(mobile) {
//   return request(`/api/login/captcha?mobile=${mobile}`);
// }

export async function getCaptcha() {
  return request(`/lot/user/captcha`);
}

export async function logout() {
  return request(`/lot/user/logout`, {
    method: 'POST'
  });
}
