import { notification } from 'antd';
import {
  getAboutUs,
  getCommonProblem,
  getContactUs,
  getDemandExample,
  getPrivacyPolicy,
  getUserProtocol,
  updateAboutUs,
  updateCommonProblem,
  updateContactUs,updateDemandExample,updatePrivacyPolicy,updateUserProtocol
} from '@/services/otherService';



const Model = {
  namespace: 'OtherEditSlip',
  state: {
    loading: false,
    loadingBut: false,
    currentlyOnly: null,
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
      const { currentlyOnly } = payload;
      const data = {};
      if (typeof (currentlyOnly) != 'undefined') {
        yield put({
          type: 'updateState',
          payload: {
            currentlyOnly: currentlyOnly
          },
        });
        if (currentlyOnly === '0') {
          const result = yield call(getAboutUs, data);
          yield put({
            type: 'updateState',
            payload: {
              noticeList: result.data,
              loading: false, isDisableInput: false,
            },
          });
        }
        if (currentlyOnly === '1') {
          const result = yield call(getContactUs, data);
          yield put({
            type: 'updateState',
            payload: {
              noticeList: result.data,
              loading: false, isDisableInput: false,
            },
          });
        } else if (currentlyOnly === '2') {
          const result = yield call(getUserProtocol, data);
          yield put({
            type: 'updateState',
            payload: {
              noticeList: result.data,
              loading: false, isDisableInput: false,
            },
          });
        } else if (currentlyOnly === '3') {
          const result = yield call(getPrivacyPolicy, data);
          yield put({
            type: 'updateState',
            payload: {
              noticeList: result.data,
              loading: false, isDisableInput: false,
            },
          });
        } else if (currentlyOnly === '4') {
          const result = yield call(getDemandExample, data);
          yield put({
            type: 'updateState',
            payload: {
              noticeList: result.data,
              loading: false, isDisableInput: false,
            },
          });
        } else if (currentlyOnly === '5') {
          const result = yield call(getCommonProblem, data);
          yield put({
            type: 'updateState',
            payload: {
              noticeList: result.data,
              loading: false, isDisableInput: false,
            },
          });
        }
      } else {
        yield put({
          type: 'updateState',
          payload: { noticeList: null ,loading: false, isDisableInput: false },
        });
      }
    },
    * save({ payload }, { call, put, select }) {
      yield put({
        type: 'updateState',
        payload: { loadingBut: true },
      });
      const { currentlyOnly } = yield select(state => state.OtherEditSlip);
      const { submitData } = payload;
      console.log(currentlyOnly,submitData)
      let result;
      if (currentlyOnly === '0') {
        result = yield call(updateAboutUs, submitData);
      }
      if (currentlyOnly === '1') {
        result = yield call(updateContactUs, submitData);
      } else if (currentlyOnly === '2') {
        result = yield call(updateUserProtocol, submitData);
      } else if (currentlyOnly === '3') {
        result = yield call(updatePrivacyPolicy, submitData);
      } else if (currentlyOnly === '4') {
        result = yield call(updateDemandExample, submitData);
      } else if (currentlyOnly === '5') {
        result = yield call(updateCommonProblem, submitData);
      }
      if (result.status === 200) {
        notification.success({
          description: '提示',
          message: '成功',
        });
        yield put({
          type: 'OtherIndex/updateState',
          payload: { visible: false },
        });
        yield put({
          type: 'OtherIndex/init',
          payload: {},
        });
      } else {
        notification.warning({
          description: '提示',
          message: '失败',
        });
        yield put({
          type: 'OtherIndex/updateState',
          payload: { visibleEdit: false },
        });
        yield put({
          type: 'OtherIndex/init',
          payload: {},
        });
      }
      yield put({
        type: 'updateState',
        payload: { loadingBut: false },
      });
    },
  },
  subscriptions: {},
};
export default Model;
