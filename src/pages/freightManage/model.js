import { deleteItem, findList } from '@/services/freightService';


const Model = {
  namespace: 'FreightIndex',
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
      const { pages } = yield select(state => state.FreightIndex);
      const data = { pagesVo: pages, ynFlag: 'Y' };
      const result = yield call(findList, data);
      yield put({
        type: 'updateState',
        payload: {
          resourcesList: result.data.list,
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
      const { pages } = yield select(state => state.FreightIndex);
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
          resourcesList: result.data.list,
          total: result.data.total,
          pages: pages,
          loading: false,
        },
      });
    },
    * jumpToEdit({ payload }, { call, put, select }) {
      const { visibleEdit, resourcesFreightId } = payload;
      yield put({
        type: 'updateState',
        payload: { visibleEdit: visibleEdit },
      });
      yield put({
        type: 'FreightEditSlip/init',
        payload: { resourcesFreightId: resourcesFreightId },
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
      const { resourcesFreightId } = payload;
      const result = yield call(deleteItem, { resourcesFreightId: resourcesFreightId });
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
        if (location.pathname === '/resources/freightIndex') {
          dispatch({ type: 'init' });
        }
      });
    },
  },
};
export default Model;

