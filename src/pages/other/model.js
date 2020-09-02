import {
  getAboutUs,
  getCommonProblem,
  getContactUs,
  getDemandExample,
  getPrivacyPolicy,
  getUserProtocol,
  getStartImgUrl, updateAboutUs, updateStartImgUrl
} from '@/services/otherService';


const Model = {
  namespace: 'OtherIndex',
  state: {
    loading: false,
    visible: false,
    currentlyOnly: 0,
    text: '',
    imgUrl: ''
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
      const data = {};
      const result = yield call(getAboutUs, data);
      const results = yield call(getStartImgUrl, data);
      yield put({
        type: 'updateState',
        payload: {
          text: result.data.aboutUs,
          imgUrl: results.data.aboutUs,
          loading: false,
        },
      });
    },
    * changeActiveKey({ payload }, { call, put, select }) {
      yield put({
        type: 'updateState',
        payload: {
          loading: true,
        },
      });
      const { currentlyOnly } = payload;
      const data = {};
      if (currentlyOnly === '0') {
        const result = yield call(getAboutUs, data);
        yield put({
          type: 'updateState',
          payload: {
            text: result.data.aboutUs,
            currentlyOnly: currentlyOnly,
          },
        });
      }
      if (currentlyOnly === '1') {
        const result = yield call(getContactUs, data);
        yield put({
          type: 'updateState',
          payload: {
            text: result.data.aboutUs,
            currentlyOnly: currentlyOnly,
          },
        });
      } else if (currentlyOnly === '2') {
        const result = yield call(getUserProtocol, data);
        yield put({
          type: 'updateState',
          payload: {
            text: result.data.aboutUs,
            currentlyOnly: currentlyOnly,
          },
        });
      } else if (currentlyOnly === '3') {
        const result = yield call(getPrivacyPolicy, data);
        yield put({
          type: 'updateState',
          payload: {
            text: result.data.aboutUs,
            currentlyOnly: currentlyOnly,
          },
        });
      } else if (currentlyOnly === '4') {
        const result = yield call(getDemandExample, data);
        yield put({
          type: 'updateState',
          payload: {
            text: result.data.aboutUs,
            currentlyOnly: currentlyOnly,
          },
        });
      } else if (currentlyOnly === '5') {
        const result = yield call(getCommonProblem, data);
        yield put({
          type: 'updateState',
          payload: {
            text: result.data.aboutUs,
            currentlyOnly: currentlyOnly,
          },
        });
      }
      yield put({
        type: 'updateState',
        payload: {
          loading: false,
        },
      });
    },
    * openAddSlip({ payload }, { call, put, select }) {
      const { currentlyOnly, visible } = payload;
      yield put({
        type: 'OtherEditSlip/init',
        payload: { currentlyOnly: currentlyOnly },
      });
      yield put({
        type: 'updateState',
        payload: {
          visible: visible,
        },
      });
    },
    * onChangeImg({payload}, {call, put, select}) {
      const {imgUrl} = payload;
      yield put({
        type: 'updateState',
        payload: {
          imgUrl: imgUrl,
        },
      });
    },
    * saveImg({payload}, {call, put, select}) {
      yield put({
        type: 'updateState',
        payload: {
          loading: true,
        },
      });
      const { imgUrl } = yield select(state => state.OtherIndex);
      const result = yield call(updateStartImgUrl, imgUrl);
      yield put({
        type: 'updateState',
        payload: {
          loading: false,
        },
      });
    },
  },
  subscriptions: {
    setup({ dispatch, history }) {
      history.listen((location) => {
        if (location.pathname === '/other/OtherIndex') {
          dispatch({ type: 'init' });
        }
      });
    },
  },
};
export default Model;
