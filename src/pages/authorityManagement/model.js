import { roleList, authorityList } from '@/services/roleService';
import { findList } from '@/services/managementService';

const Model = {
  namespace: 'AuthorityToUser',
  state: {
    pages: {
      current: 1,
      pageSize: 11,
    },
    loading: false,
    visible: false,
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
      const data = { ynFlag: 'Y' };
      const result_role = yield call(roleList, data);
      const { pages } = yield select(state => state.AuthorityToUser);
      const roleId = result_role.data.role[0].roleId;
      const datas = { pagesVo: pages, roleId: roleId };
      const result_authority = yield call(authorityList, datas);
      yield put({
        type: 'updateState',
        payload: {
          roleList: result_role.data.role,
          authorityList: result_authority.data.authority,
          total: result_authority.data.total,
          currentlyOnly: roleId,
          loading: false,
        },
      });
    },
    * initData({ payload }, { call, put, select }) {
      yield put({
        type: 'updateState',
        payload: { loading: true },
      });
      const { current } = payload;
      const { pages, currentlyOnly } = yield select(state => state.AuthorityToUser);
      pages.current = current;
      const data = { pagesVo: pages, roleId: currentlyOnly };
      const result = yield call(authorityList, data);
      const { authority } = result.data;
      yield put({
        type: 'updateState',
        payload: { authorityList: authority, loading: false },
      });
    },
    * changeActiveKey({ payload }, { call, put, select }) {
      yield put({
        type: 'updateState',
        payload: { loading: true },
      });
      const { currentlyOnly } = payload;
      const { pages } = yield select(state => state.AuthorityToUser);
      pages.current = 1;
      const data = { pagesVo: pages, roleId: currentlyOnly };
      const result = yield call(authorityList, data);
      const { authority,total } = result.data;
      yield put({
        type: 'updateState',
        payload: { authorityList: authority,total: total, currentlyOnly: currentlyOnly, loading: false },
      });
    },
    * openAddSlip({ payload }, { call, put, select }) {
      const { visible, currentlyOnly } = payload;
      yield put({
        type: 'AuthorityAddSlip/init',
        payload: { roleId: currentlyOnly },
      });
      yield put({
        type: 'updateState',
        payload: { visible: visible },
      });
    },
  },
  subscriptions: {
    setup({ dispatch, history }) {
      history.listen((location) => {
        if (location.pathname === '/admin/authorityManagement') {
          dispatch({ type: 'init' });
        }
      });
    },
  },
};
export default Model;
