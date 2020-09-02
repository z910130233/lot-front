import {getSaveData, saveData} from '@/services/resourcesService';
import { notification } from 'antd';

const Model = {
  namespace: 'ResourcesShortcutAmend',
  state: {
    loading: false,
    loadingBut: false
  },
  reducers: {
    updateState(state, {payload}) {
      return {...state, ...payload};
    },
  },
  effects: {
    * init(params, {call, put, select}) {
      yield put({
        type: 'updateState',
        payload: {loading: true},
      });
      const result = yield call(getSaveData, null);
      yield put({
        type: 'updateState',
        payload: {
          saveData: result.data.saveData,
          loading: false,
        },
      });
    },
    * initData({payload}, {call, put, select}) {

    },
    * jumpToEdit({payload}, {call, put, select}) {
      const {visibleEdit, resourcesId} = payload;
      yield put({
        type: 'updateState',
        payload: {visibleEdit: visibleEdit},
      });
      if (resourcesId != null) {
        yield put({
          type: 'ResourcesEditSlip/init',
          payload: {resourcesId: resourcesId},
        });
      }
    },
    * onValuesChange({payload}, {call, put, select}) {
      const {requestData} = payload;
      yield put({
        type: 'updateState',
        payload: {requestData: requestData},
      });
    },
    * save({payload}, {call, put, select}) {
      yield put({
        type: 'updateState',
        payload: {loading: true, loadingBut: true},
      });
      const {submitData, modelDetailed, status} = payload;
      const data = {address:submitData.address[0],brand: submitData.brand[0], modelDetailed: modelDetailed, status: status,price:submitData.price,subordinateArea:submitData.subordinateArea}
      const result = yield call(saveData, data);
      if (result.status === 200) {
        notification.success({
            message:'提示',
            description: '修改成功，您可以在详情页面查看已经修改的数据'
          }
        );
      }else{
        notification.error({
            message:'提示',
            description: '修改失败，请联系开发人员'
          }
        );
      }
      yield put({
        type: 'updateState',
        payload: {loading: false, loadingBut: false},
      });
    },
  },
  subscriptions: {
    setup({dispatch, history}) {
      history.listen((location) => {
        if (location.pathname === '/resources/ResourcesShortcutAmend') {
          dispatch({type: 'init'});
        }
      });
    },
  },
};
export default Model;
