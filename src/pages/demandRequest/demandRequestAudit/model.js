import { notification } from 'antd';
import { getDemandRequest } from '@/services/demandRequestService';
import { saveDemand } from '@/services/demandService';

const Model = {
  namespace: 'DemandRequestEditSlip',
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
      const { demandRequestId } = payload;
      if (demandRequestId != null) {
        let result = yield call(getDemandRequest, demandRequestId);
        yield put({
          type: 'updateState',
          payload: { resourcesList: result.data.demandRequest, loading: false, isDisableInput: true },
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
      console.log(submitData)
      const result = yield call(saveDemand, submitData);
      if (result.status === 200) {
        yield put({
          type: 'DemandRequestIndex/updateState',
          payload: { visibleEdit: false },
        });
        yield put({
          type: 'DemandRequestIndex/initData',
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
