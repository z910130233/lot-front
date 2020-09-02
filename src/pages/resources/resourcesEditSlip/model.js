import { notification } from 'antd';
import { getResources, saveResources } from '@/services/resourcesService';


const Model = {
  namespace: 'ResourcesEditSlip',
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
        type: 'updateState',
        payload: { loading: true },
      });
      const { resourcesId } = payload;
      if (resourcesId != null) {
        let result = yield call(getResources, resourcesId);
        yield put({
          type: 'updateState',
          payload: { resourcesList: result.data.resources, loading: false, isDisableInput: true },
        });
      } else {
        yield put({
          type: 'updateState',
          payload: { resourcesList: null, loading: false, isDisableInput: false },
        });
      }
    },
    * save({ payload }, { call, put, select }) {
      yield put({
        type: 'updateState',
        payload: { loadingBut: true },
      });
      const { submitData } = payload;
      const result = yield call(saveResources, submitData);
      if (result.status === 200) {
        yield put({
          type: 'Resources/updateState',
          payload: { visibleEdit: false },
        });
        yield put({
          type: 'Resources/initData',
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
