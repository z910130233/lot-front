import { notification } from 'antd';
import { saveDemand,getDemand } from '@/services/demandService';

const Model = {
  namespace: 'DemandEditSlip',
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
      const { demandId } = payload;
      if (demandId != null) {
        let result = yield call(getDemand, demandId);
        yield put({
          type: 'updateState',
          payload: { resourcesList: result.data.demand, loading: false, isDisableInput: true },
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
      const result = yield call(saveDemand, submitData);
      if (result.status === 200) {
        yield put({
          type: 'DemandIndex/updateState',
          payload: { visibleEdit: false },
        });
        yield put({
          type: 'DemandIndex/initData',
          payload: {},
        });
        notification.success({
          description: "成功",
          message: "提示"
        })
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
