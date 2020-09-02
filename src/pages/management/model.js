import { deleteItem, findList, getUser, saveUser } from '@/services/managementService';
import { notification } from 'antd';

const Model = {
  namespace: 'management',
  state: {
    pages: {
      current: 1,
      pageSize: 7,
    },
    loading: false,
    visibleEdit: false,
    visibleView: false,
    disableBtn: false,
  },
  reducers: {
    updateState(state, { payload }) {
      return { ...state, ...payload };
    },
  },
  subscriptions: {
    // 触发器。setup表示初始化即调用。其他用法见官方文档。https://github.com/sorrycc/blog/issues/62
    // 一开始触发*fetch方法获取验证码的信息
    setup({ dispatch, history }) {
      history.listen((location) => {
        if (location.pathname === '/admin/managementList') {
          dispatch({ type: 'init' });
        }
      });
    },
  },
  effects: {
    * init(params, { call, put, select }) {
      yield put({
        type: 'updateState',
        payload: { loading: true },
      });
      const { pages } = yield select(state => state.management);
      const data = { pagesVo: pages };
      const result = yield call(findList, data);
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { user, total } = result.data;
      yield put({
        type: 'updateState',
        payload: { userList: user, total: total, loading: false },
      });
    },
    * initData({ payload }, { call, put, select }) {
      yield put({
        type: 'updateState',
        payload: { loading: true },
      });
      const { current, requestData } = payload;
      const { pages } = yield select(state => state.management);
      pages.current = current;
      let data = { pagesVo: pages };
      if (requestData != null) {
        data = { pagesVo: pages, ...requestData };
      }
      const result = yield call(findList, data);
      const { user, total } = result.data;
      yield put({
        type: 'updateState',
        payload: { userList: user, total: total, loading: false },
      });
    },
    * initPageSize({ payload }, { call, put, select }) {
      yield put({
        type: 'updateState',
        payload: { loading: true },
      });
      const { pageSize } = payload;
      const { pages } = yield select(state => state.management);
      pages.pageSize = pageSize;
      const data = { pagesVo: pages };
      const result = yield call(findList, data);
      const { user, total } = result.data;
      yield put({
        type: 'updateState',
        payload: { userList: user, total: total, loading: false },
      });
    },
    * tableChange({ payload }, { call, put, select }) {
      yield put({
        type: 'updateState',
        payload: { loading: true },
      });
      const { orderColumn, orderDirection } = payload;
      const { pages } = yield select(state => state.management);
      const data = {
        pagesVo: pages,
        orderColumn, orderDirection,
      };
      const result = yield call(findList, data);
      const { user, total } = result.data;
      yield put({
        type: 'updateState',
        payload: { userList: user, total: total, loading: false },
      });
    },

    * jumpToEdit({ payload }, { call, put, select }) {
      const { visibleEdit, userId } = payload;
      yield put({
        type: 'updateState',
        payload: { visibleEdit: visibleEdit },
      });
      yield put({
        type: 'managementEditSlip/init',
        payload: { userId: userId },
      });
    },
    * jumpToView({ payload }, { call, put, select }) {
      const { visibleView, userId } = payload;
      yield put({
        type: 'updateState',
        payload: { visibleView: visibleView },
      });
      yield put({
        type: 'managementViewSlip/init',
        payload: { userId: userId },
      });
    },
    * deleteItem({ payload }, { call, put, select }) {
      const { userId } = payload;
      const result = yield call(deleteItem, { userId: userId });
      if(result.data.message === 'Success'){
        yield put({
          type: 'management/init',
          payload: {},
        });
      }else{
        notification.warning({
          description: "删除失败！原因未知",
          message: "警告"
        })
      }
    },
  },
};
export default Model;
