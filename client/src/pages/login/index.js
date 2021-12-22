import React, { useState } from 'react';
import { withRouter } from 'react-router-dom';
import { Form } from 'antd';
import { InputField, PrimaryButton } from '../../common-components';

import { loginApi } from '../../api';

import './style.css';

const { Item } = Form;

function Login({ history }) {

  const [userInfo, setUserInfo] = useState('');
  const [form] = Form.useForm();
  const [errorMsg, setErrorMsg] = useState('');

  const onFinish = async () => {
    const {
      success,
      msg,
    } = await loginApi({ userInfo });
    if (success) {
      console.log(history)
      history.push('/');
    } else {
      setErrorMsg(msg);
    }
  };

  return (
    <div className="container login-container">
      <h2> Welcome! </h2>
      <Form
        layout="vertical"
        form={form}
        onFinish={onFinish}
        className="login-form"
      >
        <p className="err-msg">
          {errorMsg ? errorMsg : ''}
        </p>
        <Form.Item
          label="Email"
          name="Email"
          rules={[
            {
              required: true,
              type: 'email',
              message: 'Please input a valid email!',
            },
          ]}
        >
          <InputField
            placeholder="Email"
            name="email"
            onChange={({ target: { value, name }}) => {
              setUserInfo({
                ...userInfo,
                [name]: value
              });
              setErrorMsg('');
            }
          }/>
        </Form.Item>

        <Form.Item
          label="Password"
          name="password"
          rules={[
            {
              required: true,
              message: 'Please input your password!',
            },
          ]}
        >
          <InputField
            placeholder="Enter your password"
            name="password"
            onChange={({ target: { value, name }}) => {
              setUserInfo({
                ...userInfo,
                [name]: value
              });
              setErrorMsg('');
            }
            }
          />
        </Form.Item>

        <Item shouldUpdate>
          {() =>
          <PrimaryButton
            type="primary"
            htmlType="submit"
            className="submit-btn"
            btnText="Login"
            disabled={
              !form.isFieldsTouched(true) ||
              !!form.getFieldsError().filter(({ errors }) => errors.length).length
            }
          >
            Sign Up
          </PrimaryButton>}
        </Item>
        <p>
          Don't have an account
          ?
          <PrimaryButton
            className="link-btn"
            btnText="Sign up"
            onClick={ () => history.push('/signup')}
          />
          now.
        </p>
      </Form>
    </div>
  )
}

export default withRouter(Login);
