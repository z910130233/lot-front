import request from '@/utils/request';

export async function findList(params) {
  return request('/lot/demandrequest/findlist', {
    method: 'POST',
    data: params,
  });
}

export async function getDemandRequest(demandRequestId) {
  return request(`/lot/demandrequest/get?demandRequestId=`+demandRequestId);
}

export async function saveDemandRequest(params) {
  return request('/lot/demandrequest/save', {
    method: 'POST',
    data: params,
  });
}

export async function deleteItem(params) {
  return request('/lot/demandrequest/delete?demandRequestId='+params.demandRequestId, {
    method: 'POST',
    data: params,
  });
}
