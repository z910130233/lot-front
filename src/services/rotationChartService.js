import request from '@/utils/request';

export async function findList(params) {
  return request('/lot/rotationchart/findlist', {
    method: 'POST',
    data: params,
  });
}

export async function getRotationChart(rotationChartId) {
  return request(`/lot/rotationchart/get?rotationChartId=`+rotationChartId);
}

export async function saveRotationChart(params) {
  return request('/lot/rotationchart/save', {
    method: 'POST',
    data: params,
  });
}

export async function deleteItem(params) {
  return request('/lot/rotationchart/delete?rotationChartId='+params.rotationChartId, {
    method: 'POST',
    data: params,
  });
}
