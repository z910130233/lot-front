import request from '@/utils/request';

export async function findList(params) {
  return request('/lot/resourcesmanage/findlist', {
    method: 'POST',
    data: params,
  });
}

export async function getResources(resourcesManageId) {
  return request(`/lot/resourcesmanage/get?resourcesManageId=`+resourcesManageId);
}

export async function saveResources(params) {
  return request('/lot/resourcesmanage/save', {
    method: 'POST',
    data: params,
  });
}

export async function deleteItem(params) {
  return request('/lot/resourcesmanage/delete?resourcesManageId='+params.resourcesManageId, {
    method: 'POST',
    data: params,
  });
}
