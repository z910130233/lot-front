
import { notification } from 'antd';
import { getRotationChart, saveRotationChart } from '@/services/rotationChartService';


const Model = {
  namespace: 'RotationChartEditSlip',
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
        type: 'RotationChartIndex/updateState',
        payload: { disableBtn: true },
      });
      yield put({
        type: 'updateState',
        payload: { loading: true },
      });
      const { rotationChartId } = payload;
      if (typeof(rotationChartId) != "undefined") {
        let result = yield call(getRotationChart, rotationChartId);
        yield put({
          type: 'updateState',
          payload: { rotationChartList: result.data.rotationChart, loading: false, isDisableInput: true },
        });
      } else {
        yield put({
          type: 'updateState',
          payload: { rotationChartList: null, loading: false, isDisableInput: false },
        });
      }
      // yield put({
      //   type: 'RotationChartIndex/updateState',
      //   payload: { disableBtn: false },
      // });
    },
    * save({ payload }, { call, put, select }) {
      yield put({
        type: 'updateState',
        payload: { loadingBut: true }
      })
      const { submitData } = payload;
      const result = yield call(saveRotationChart, submitData);
      if (result.status === 200) {
        notification.success({
          description: "提示",
          message: "成功"
        })
        yield put({
          type: 'RotationChartIndex/updateState',
          payload: { visibleEdit: false },
        });
        yield put({
          type: 'RotationChartIndex/initData',
          payload: {},
        });
      } else {
        notification.warning({
          description: "提示",
          message: "失败"
        })
        yield put({
          type: 'RotationChartIndex/updateState',
          payload: { visibleEdit: false },
        });
        yield put({
          type: 'RotationChartIndex/initData',
          payload: {},
        });
      }
      yield put({
        type: 'updateState',
        payload: { loadingBut: false }
      })
    },
  },
  subscriptions: {},
};
export default Model;
