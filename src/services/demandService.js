import request from '@/utils/request';

export async function findList(params) {
  return request('/lot/demand/findlist', {
    method: 'POST',
    data: params,
  });
}

export async function getDemand(demandId) {
  return request(`/lot/demand/get?demandId=`+demandId);
}

export async function saveDemand(params) {
  return request('/lot/demand/save', {
    method: 'POST',
    data: params,
  });
}

export async function deleteItem(params) {
  return request('/lot/demand/delete?demandId='+params.demandId, {
    method: 'POST',
    data: params,
  });
}
