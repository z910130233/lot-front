import request from '@/utils/request';

export async function getAboutUs() {
  return request(`/lot/other/getaboutus`);
}

export async function getContactUs() {
  return request(`/lot/other/getcontactus`);
}

export async function getUserProtocol() {
  return request(`/lot/other/getuserprotocol`);
}

export async function getPrivacyPolicy() {
  return request(`/lot/other/getprivacypolicy`);
}

export async function getDemandExample() {
  return request(`/lot/other/getdemandexample`);
}

export async function getCommonProblem() {
  return request(`/lot/other/getcommonproblem`);
}

export async function getStartImgUrl() {
  return request(`/lot/other/getStartImgUrl`);
}


export async function updateAboutUs(params) {
  return request('/lot/other/updateaboutus', {
    method: 'POST',
    data: params.string,
  });
}

export async function updateContactUs(params) {
  return request('/lot/other/updatecontactus', {
    method: 'POST',
    data: params.string,
  });
}

export async function updateUserProtocol(params) {
  return request('/lot/other/updateuserprotocol', {
    method: 'POST',
    data: params.string,
  });
}

export async function updatePrivacyPolicy(params) {
  return request('/lot/other/updateprivacypolicy', {
    method: 'POST',
    data: params.string,
  });
}

export async function updateDemandExample(params) {
  return request('/lot/other/updatedemandexample', {
    method: 'POST',
    data: params.string,
  });
}

export async function updateCommonProblem(params) {
  return request('/lot/other/updatecommonproblem', {
    method: 'POST',
    data: params.string,
  });
}

export async function updateStartImgUrl(params) {
  return request('/lot/other/updateStartImgUrl', {
    method: 'POST',
    data: params,
  });
}
