import request from '@/utils/request';

export async function findList(params) {
  return request('/lot/freight/findlist', {
    method: 'POST',
    data: params,
  });
}

export async function getResources(resourcesFreightId) {
  return request(`/lot/freight/get?resourcesFreightId=`+resourcesFreightId);
}

export async function saveResources(params) {
  return request('/lot/freight/save', {
    method: 'POST',
    data: params,
  });
}

export async function deleteItem(params) {
  return request('/lot/freight/delete?resourcesFreightId='+params.resourcesFreightId, {
    method: 'POST',
    data: params,
  });
}
