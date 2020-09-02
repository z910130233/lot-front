import { notification } from 'antd';
import { getResources, saveResources } from '@/services/freightService';


const Model = {
  namespace: 'FreightEditSlip',
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
      const { resourcesFreightId } = payload;
      if (resourcesFreightId != null) {
        let result = yield call(getResources, resourcesFreightId);
        yield put({
          type: 'updateState',
          payload: { resourcesList: result.data.freightData, loading: false, isDisableInput: true },
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
          type: 'FreightIndex/updateState',
          payload: { visibleEdit: false },
        });
        yield put({
          type: 'FreightIndex/initData',
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
