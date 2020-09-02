
import { notification } from 'antd';
import { getNotice, saveNotice } from '@/services/noticeService';


const Model = {
  namespace: 'NoticeEditSlip',
  state: {
    loading: false,
    isDisableInput: false,
    loadingBut: false,
  },
  reducers: {
    updateState(state, { payload }) {
      return { ...state, ...payload };
    },
  },
  effects: {
    * init({ payload }, { call, put, select }) {
      yield put({
        type: 'updateState',
        payload: { loading: true },
      });
      const { noticeId } = payload;
      if (typeof(noticeId) != "undefined") {
        let result = yield call(getNotice, noticeId);
        yield put({
          type: 'updateState',
          payload: { noticeList: result.data.notice, loading: false, isDisableInput: true },
        });
      } else {
        yield put({
          type: 'updateState',
          payload: { noticeList: null, loading: false, isDisableInput: false },
        });
      }
    },
    * save({ payload }, { call, put, select }) {
      yield put({
        type: 'updateState',
        payload: { loadingBut: true }
      })
      const { submitData } = payload;
      const result = yield call(saveNotice, submitData);
      if (result.status === 200) {
        notification.success({
          description: "提示",
          message: "成功"
        })
        yield put({
          type: 'NoticeIndex/updateState',
          payload: { visibleEdit: false },
        });
        yield put({
          type: 'NoticeIndex/initData',
          payload: {},
        });
      } else {
        notification.warning({
          description: "提示",
          message: "失败"
        })
        yield put({
          type: 'NoticeIndex/updateState',
          payload: { visibleEdit: false },
        });
        yield put({
          type: 'NoticeIndex/initData',
          payload: {},
        });
      }
      yield put({
        type: 'updateState',
        payload: { loadingBut: false }
      })
    },
  },
  subscriptions: {},
};
export default Model;
