import {getRoutes} from "@/services/user";

const Model = {
  namespace: 'PageManage',
  state: {},
  reducers: {
    updateState(state, {payload}) {
      return {...state, ...payload};
    },
  },
  effects: {
    * init(params, {call, put, select}) {
      const result = yield call(getRoutes);
      yield put({
        type: 'updateState',
        payload: {routesData: result.data},
      });
    },
  },
  subscriptions: {
    setup({dispatch, history}) {
      history.listen((location) => {
        if (location.pathname === '/admin/pagemanage') {
          dispatch({type: 'init'});
        }
      });
    },
  },
};
export default Model;
