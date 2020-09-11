import {queryCurrent, query as queryUsers, queryGet, getRoutes} from '@/services/user';
import {handleLocalStorage} from '@/utils/localStroage';

const UserModel = {
  namespace: 'user',
  state: {
    currentUser: {},
  },
  effects: {
    * fetch(_, {call, put}) {
      const response = yield call(queryUsers);
      yield put({
        type: 'save',
        payload: response,
      });
    },

    * fetchCurrent(_, {call, put}) {
      // const response = yield call(queryCurrent);
      // console.log(response);
      const username = handleLocalStorage('get', 'username');
      if (username) {
        const result = yield call(queryGet, username);
        yield put({
          type: 'saveCurrentUser',
          payload: result.data.user,
        });
      }
    },
    * getRoutes(_, {call, put}) {
      const result = yield call(getRoutes);
      yield put({
        type: 'updateState',
        payload: result.data,
      });
    }
  },
  reducers: {
    saveCurrentUser(state, action) {
      return {...state, currentUser: action.payload || {}};
    },
    updateState(state, {payload}) {
      return {...state, ...payload};
    },

    changeNotifyCount(
      state = {
        currentUser: {},
      },
      action,
    ) {
      return {
        ...state,
        currentUser: {
          ...state.currentUser,
          notifyCount: action.payload.totalCount,
          unreadCount: action.payload.unreadCount,
        },
      };
    },
  },
};
export default UserModel;
