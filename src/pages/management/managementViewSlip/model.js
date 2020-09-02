import { getUser, saveUser } from '@/services/managementService';


const Model = {
  namespace: 'managementViewSlip',
  state: {
    loading: false,
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
      const { userId } = payload;
      if (userId != null) {
        let result = yield call(getUser, userId);
        yield put({
          type: 'updateState',
          payload: { userList: result.data.user, loading: false },
        });
      } else {
        yield put({
          type: 'updateState',
          payload: { userList: null, loading: false },
        });
      }
    },
    * save({ payload }, { call, put, select }) {
      const { userList } = yield select(state => state.managementEditSlip);
      const result = yield call(saveUser, userList);
    },
  },
  subscriptions: {},
};
export default Model;
