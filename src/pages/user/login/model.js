import { stringify } from 'querystring';
import { history } from 'umi';
import { fakeAccountLogin, getCaptcha, logout } from '@/services/login';
import { setAuthority } from '@/utils/authority';
import { getPageQuery } from '@/utils/utils';
import { message } from 'antd';
import { handleLocalStorage } from '@/utils/localStroage';

const Model = {
  namespace: 'login',
  state: {
    status: '',
    captcha: '',
    verKey: '',
    submitting: false
  },
  reducers: {
    updateState(state, { payload }) {
      return { ...state, ...payload };
    },
    changeLoginStatus(state, { payload }) {
      setAuthority(payload.currentAuthority);
      return { ...state, status: payload.status, type: payload.type };
    },
  },
  subscriptions: {
    // 触发器。setup表示初始化即调用。其他用法见官方文档。https://github.com/sorrycc/blog/issues/62
    // 一开始触发*fetch方法获取验证码的信息
    // setup({ dispatch }) {
    //   dispatch({ type: '/user/login' });
    // },
    setup({ dispatch, history }) {
      history.listen((location) => {
        if (location.pathname === '/user/login') {
          dispatch({ type: 'init' });
        }
      });
    },
  },
  effects: {
    * init(params, { call, put, select }) {
      const result = yield call(getCaptcha);
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { image, key } = result.data;
      yield put({
        type: 'updateState',
        payload: { captcha: image, verKey: key },
      });
    },
    * login({ payload }, { call, put, select }) {
      yield put({
        type: 'updateState',
        payload: { submitting: true },
      });
      const { verKey } = yield select(state => state.login);
      const verKeys = { verKey: verKey };
      const payloads = Object.assign(verKeys, payload);
      handleLocalStorage('set', 'username', payloads.username);
      const response = yield call(fakeAccountLogin, payloads);
      console.log(response.status);
      console.log(response.status === '200');
      if (response.status === '500') {
        message.error('验证码错误');
        yield put({
          type: 'init',
        });
      } else if (response.status === '501') {
        message.error('账号或密码错误');
        window.location.reload();
      }
      if (response.status === '200') {
        console.log("1");
        response.status = 'ok';
        sessionStorage.setItem('token', response.data.sessionId);
        message.info('登录成功');
        history.push('/welcome');
      }
      yield put({
        type: 'changeLoginStatus',
        payload: response,
      }); // Login successfully

      // if (response.status === 'ok') {
      //   const urlParams = new URL(window.location.href);
      //   const params = getPageQuery();
      //   let { redirect } = params;
      //
      //   if (redirect) {
      //     const redirectUrlParams = new URL(redirect);
      //
      //     if (redirectUrlParams.origin === urlParams.origin) {
      //       redirect = redirect.substr(urlParams.origin.length);
      //
      //       if (redirect.match(/^\/.*#/)) {
      //         redirect = redirect.substr(redirect.indexOf('#') + 1);
      //       }
      //     } else {
      //       window.location.href = '/';
      //       return;
      //     }
      //   }
      //   history.replace(redirect || '/');
      //   history.replace(redirect || '/');
      // }
      yield put({
        type: 'updateState',
        payload: { submitting: false },
      });
    },

    logout({ call, put }) {
      logout();
      const { redirect } = getPageQuery(); // Note: There may be security issues, please note
      if (window.location.pathname !== '/user/login' && !redirect) {
        history.replace({
          pathname: '/user/login',
          search: stringify({
            redirect: window.location.href,
          }),
        });
      }
      handleLocalStorage('remove', 'antd-pro-authority');
      handleLocalStorage('remove', 'username');
      sessionStorage.removeItem('token');
      window.location.reload();
    },
  },
};
export default Model;
