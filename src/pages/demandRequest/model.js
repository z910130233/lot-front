import { deleteItem, findList } from '@/services/demandRequestService';


const Model = {
  namespace: 'DemandRequestIndex',
  state: {
    pages: {
      current: 1,
      pageSize: 10,
    },
    loading: false,
    visibleEdit: false,
    requestData: null,
  },
  reducers: {
    updateState(state, { payload }) {
      return { ...state, ...payload };
    },
  },
  effects: {
    * init(params, { call, put, select }) {
      yield put({
        type: 'updateState',
        payload: { loading: true },
      });
      const { pages } = yield select(state => state.DemandRequestIndex);
      const data = { pagesVo: pages, ynFlag: 'Y' };
      const result = yield call(findList, data);
      yield put({
        type: 'updateState',
        payload: {
          demandRequestList: result.data.list,
          total: result.data.total,
          pages: pages,
          loading: false,
        },
      });
    },
    * initData({ payload }, { call, put, select }) {
      yield put({
        type: 'updateState',
        payload: { loading: true },
      });
      const { current, pageSize, requestData, orderColumn, orderDirection } = payload;
      const { pages } = yield select(state => state.DemandRequestIndex);
      if (current != null) {
        pages.current = current;
      }
      if (pageSize != null) {
        pages.pageSize = pageSize;
      }
      let data;
      if (requestData != null) {
        data = { pagesVo: pages, ...requestData, orderColumn, orderDirection };
      } else {
        data = { pagesVo: pages, orderColumn, orderDirection };
      }
      const result = yield call(findList, data);
      yield put({
        type: 'updateState',
        payload: {
          demandRequestList: result.data.list,
          total: result.data.total,
          pages: pages,
          loading: false,
        },
      });
    },
    * jumpToEdit({ payload }, { call, put, select }) {
      const { visibleEdit, demandRequestId } = payload;
      yield put({
        type: 'updateState',
        payload: { visibleEdit: visibleEdit },
      });
      yield put({
        type: 'DemandRequestEditSlip/init',
        payload: { demandRequestId: demandRequestId },
      });
    },
    * onValuesChange({ payload }, { call, put, select }) {
      const { requestData } = payload;
      yield put({
        type: 'updateState',
        payload: { requestData: requestData },
      });
    },
    * deleteItem({ payload }, { call, put, select }) {
      const { demandRequestId } = payload;
      const result = yield call(deleteItem, { demandRequestId: demandRequestId });
      if (result.status === 200) {
        yield put({
          type: 'initData',
          payload: {},
        });
      }
    },
  },
  subscriptions: {
    setup({ dispatch, history }) {
      history.listen((location) => {
        if (location.pathname === '/demand/demandRequest') {
          dispatch({ type: 'init' });
        }
      });
    },
  },
};
export default Model;
