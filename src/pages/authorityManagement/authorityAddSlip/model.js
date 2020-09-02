import { addAuthority, authorityList } from '@/services/roleService';


const Model = {
  namespace: 'AuthorityAddSlip',
  state: {
    pages: {
      current: 1,
      pageSize: 10000,
    },
    skeletonLoading: false,
    tableLoading: false,
  },
  reducers: {
    updateState(state, { payload }) {
      return { ...state, ...payload };
    },
  },
  effects: {
    * init({ payload }, { call, put, select }) {
      const { roleId } = payload;
      yield put({
        type: 'updateState',
        payload: { skeletonLoading: true },
      });
      const { pages } = yield select(state => state.AuthorityAddSlip);
      const data = { pagesVo: pages };
      const result = yield call(authorityList, data);
      const dataL = { pagesVo: pages, roleId: roleId, roleName: 'none' };
      const resultHas = yield call(authorityList, dataL);
      const { authority, roleName } = resultHas.data;
      const nowId = [];
      authority.map((item, index) => {
        nowId[index] = item.key;
      });
      yield put({
        type: 'updateState',
        payload: {
          authorityAllList: result.data.authority,
          skeletonLoading: false,
          total: result.data.total,
          nowId: nowId,
          roleName: roleName,
          roleId: roleId,
        },
      });
    },
    * onSelectChange({ payload }, { call, put, select }) {
      yield put({
        type: 'updateState',
        payload: { tableLoading: true },
      });
      const { selectedRowKeys } = payload;
      const { roleId,pages } = yield select(state => state.AuthorityAddSlip);
      const data = { authorityIdList: selectedRowKeys, roleId: roleId };
      const result = yield call(addAuthority, data);
      const dataL = { pagesVo: pages, roleId: roleId };
      const resultHas = yield call(authorityList, dataL);
      const { authority } = resultHas.data;
      const nowId = [];
      authority.map((item, index) => {
        nowId[index] = item.key;
      });
      yield put({
        type: 'updateState',
        payload: { tableLoading: false,nowId: nowId, },
      });
      yield put({
        type: 'AuthorityToUser/changeActiveKey',
        payload: { currentlyOnly: roleId },
      });
    },
  },
  subscriptions: {},
};
export default Model;
