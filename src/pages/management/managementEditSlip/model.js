import { getUser, saveUser } from '@/services/managementService';
import { notification } from 'antd';


const Model = {
  namespace: 'managementEditSlip',
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
        type: 'management/updateState',
        payload: { disableBtn: true },
      });
      yield put({
        type: 'updateState',
        payload: { loading: true },
      });
      const { userId } = payload;
      if (userId != null) {
        let result = yield call(getUser, userId);
        yield put({
          type: 'updateState',
          payload: { userList: result.data.user, loading: false, isDisableInput: true },
        });
      } else {
        yield put({
          type: 'updateState',
          payload: { userList: null, loading: false, isDisableInput: false },
        });
      }
      yield put({
        type: 'management/updateState',
        payload: { disableBtn: false },
      });
    },
    * save({ payload }, { call, put, select }) {
      yield put({
        type: 'updateState',
        payload: { loadingBut: true }
      })
      const { submitData } = payload;
      const result = yield call(saveUser, submitData);
      if (result.data.message != '注册成功' && result.data.message != '修改成功') {
        notification.warning({
          description: result.data.message,
          message: "警告"
        })
      } else {
        notification.success({
          description: result.data.message,
          message: "成功"
        })
        yield put({
          type: 'management/updateState',
          payload: { visibleEdit: false },
        });
        yield put({
          type: 'management/init',
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
