import request from '@/utils/request';

export async function findList(params) {
  return request('/lot/notice/findlist', {
    method: 'POST',
    data: params,
  });
}

export async function getNotice(noticeId) {
  return request(`/lot/notice/get?noticeId=`+noticeId);
}

export async function saveNotice(params) {
  return request('/lot/notice/save', {
    method: 'POST',
    data: params,
  });
}

export async function deleteItem(params) {
  return request('/lot/notice/delete?noticeId='+params.noticeId, {
    method: 'POST',
    data: params,
  });
}
