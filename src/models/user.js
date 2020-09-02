import { queryCurrent, query as queryUsers, queryGet } from '@/services/user';
import { handleLocalStorage } from '@/utils/localStroage';

const UserModel = {
  namespace: 'user',
  state: {
    currentUser: {},
  },
  effects: {
    * fetch(_, { call, put }) {
      const response = yield call(queryUsers);
      yield put({
        type: 'save',
        payload: response,
      });
    },

    * fetchCurrent(_, { call, put }) {
      // const response = yield call(queryCurrent);
      // console.log(response);
      const username = handleLocalStorage('get', 'username');
      if(username){
        const result = yield call(queryGet, username);
        yield put({
          type: 'saveCurrentUser',
          payload: result.data.user,
        });
      }
    },
  },
  reducers: {
    saveCurrentUser(state, action) {
      return { ...state, currentUser: action.payload || {} };
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
