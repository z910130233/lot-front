import { AlipayCircleOutlined, TaobaoCircleOutlined, WeiboCircleOutlined } from '@ant-design/icons';
import { Alert, Checkbox } from 'antd';
import React, { useState } from 'react';
import { Link, connect } from 'umi';
import LoginForm from './components/Login';
import styles from './style.less';


const { Tab, UserName, Password, Mobile, Captcha, Submit } = LoginForm;


const LoginMessage = ({ content }) => (
  <Alert
    style={{
      marginBottom: 24,
    }}
    message={content}
    type="error"
    showIcon
  />
);


const Login = props => {

  const { userLogin = {}, submitting, captcha,dispatch } = props;
  const { status, type: loginType } = userLogin;
  const [autoLogin, setAutoLogin] = useState(true);
  const [type, setType] = useState('account');

  const handleSubmit = values => {
    const { dispatch } = props;
    dispatch({
      type: 'login/login',
      payload: { ...values, type },
    });
  };

  return (
    <div className={styles.main}>
      <LoginForm activeKey={type} onTabChange={setType} onSubmit={handleSubmit}>
        <Tab key="account" tab="账户密码登录">
          {/*{status === 500 && loginType === 'account' && !submitting && (*/}
          {/*  <LoginMessage content="账户或密码错误（admin/ant.design）"/>*/}
          {/*)}*/}

          <UserName
            name="username"
            placeholder="请输入用户名"
            rules={[
              {
                required: true,
                message: '请输入用户名!',
              },
            ]}
          />
          <Password
            name="password"
            placeholder="请输入密码"
            rules={[
              {
                required: true,
                message: '请输入密码！',
              },
            ]}
          />
          <Captcha
            name="verCode"
            placeholder="请输入验证码"
            countDown={120}
            getCaptchaButtonText=""
            getCaptchaSecondText="秒"
            values={captcha}
            dispatch={dispatch}
            rules={[
              {
                required: true,
                message: '请输入验证码！',
              },
            ]}
          />
        </Tab>
        <Tab key="mobile" tab="手机号登录" disabled>
          {status === 'error' && loginType === 'mobile' && !submitting && (
            <LoginMessage content="验证码错误"/>
          )}
          <Mobile
            name="mobile"
            placeholder="手机号"
            rules={[
              {
                required: true,
                message: '请输入手机号！',
              },
              {
                pattern: /^1\d{10}$/,
                message: '手机号格式错误！',
              },
            ]}
          />
          <Captcha
            name="captcha"
            placeholder="验证码"
            countDown={120}
            getCaptchaButtonText=""
            getCaptchaSecondText="秒"
            rules={[
              {
                required: true,
                message: '请输入验证码！',
              },
            ]}
          />
        </Tab>
        <div>
          <Checkbox disabled checked={false} onChange={e => setAutoLogin(e.target.checked)}>
            自动登录
          </Checkbox>
          <a
            style={{
              float: 'right',
            }}
          >
            忘记密码(暂无)
          </a>
        </div>
        <Submit loading={submitting}>登录</Submit>
        <div className={styles.other}>
          其他登录方式
          {/*<AlipayCircleOutlined className={styles.icon}/>*/}
          {/*<TaobaoCircleOutlined className={styles.icon}/>*/}
          {/*<WeiboCircleOutlined className={styles.icon}/>*/}
          <Link className={styles.register} to="/user/register">
            注册账户
          </Link>
        </div>
      </LoginForm>
    </div>
  );
};

const namespace = 'login';

//从model中拿到state值
function mapStateToProps(state) {
  const states = state[namespace];
  // console.log(states);
  return { ...states };
}

export default connect(mapStateToProps)(Login);

//舍弃原来写法，使用mapStateToProps Connect到Login去
// export default connect(({ login, loading }) => ({
//   userLogin: login,
//   submitting: loading.effects['login/login'],
// }))(Login);
