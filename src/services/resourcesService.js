import request from '@/utils/request';

export async function findList(params) {
  return request('/lot/resources/findlist', {
    method: 'POST',
    data: params,
  });
}

export async function getResources(resourcesId) {
  return request(`/lot/resources/get?resourcesId=` + resourcesId);
}

export async function saveResources(params) {
  return request('/lot/resources/save', {
    method: 'POST',
    data: params,
  });
}

export async function deleteItem(params) {
  return request('/lot/resources/delete?resourcesId=' + params.resourcesId, {
    method: 'POST',
    data: params,
  });
}

export async function getSaveData(params) {
  return request('/lot/resources/getSaveData', {
    method: 'POST',
    data: params,
  });
}

export async function saveData(params) {
  return request('/lot/resources/addSubPrices', {
    method: 'POST',
    data: params,
  });
}
