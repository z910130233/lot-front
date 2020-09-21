import { getRoutes, get } from '@/services/user';

const Model = {
  namespace: 'PageManage',
  state: {
    visible: false,
    loading: false,
  },
  reducers: {
    updateState(state, { payload }) {
      return { ...state, ...payload };
    },
  },
  effects: {
    * init(params, { call, put, select }) {
      const result = yield call(getRoutes);
      yield put({
        type: 'updateState',
        payload: { routesData: result.data },
      });
    },
    * changeModal({ payload }, { call, put, select }) {
      const { visible, routesId } = payload;
      yield put({
        type: 'updateState',
        payload: { visible: visible },
      });
    },
    * changeKey({ payload }, { call, put, select }) {
      yield put({
        type: 'updateState',
        payload: { loading: true },
      });
      const { key } = payload;
      console.log(key);
      const result = yield call(get, key);
      yield put({
        type: 'updateState',
        payload: { data: result.data.routes,loading: false },
      });
    },
  },
  subscriptions: {
    setup({ dispatch, history }) {
      history.listen((location) => {
        if (location.pathname === '/admin/pagemanage') {
          dispatch({ type: 'init' });
        }
      });
    },
  },
};
export default Model;
