import React, { useState, useEffect } from 'react';
import { Form, DatePicker, Checkbox, Button } from 'antd';
import { InputField } from '../../common-components';

import './style.css';

const { Item } = Form;

export default function Signup() {
  
  const [userInfo, setUserInfo] = useState({});
  const [isStrongPassword, setIsStrongPassword] = useState(false);
  const [checkedTerms, setCheckedTerms] = useState(false);
  const [form] = Form.useForm();

  const [, forceUpdate] = useState({});

  // To disable submit button at the beginning.
  useEffect(() => {
    forceUpdate({});
  }, []);

  const onChange = ({ target: { value, name } }) => {
    if (name === 'password') {
      const pwd = /^[a-zA-Z0-9!@#$%^&*]{6,16}$/;
      if (!pwd.test(value) || value.length < 8) {
        setIsStrongPassword(false);
      } else {
        setIsStrongPassword(true);
      }
    }
    setUserInfo({
      ...userInfo,
      [name]: value,
    })
  }

  const onFinish = () => console.log('user info', userInfo)

  return (
    <div className="container">
      <Form
        layout="vertical"
        onFinish={onFinish}
        form={form}
        autoComplete={false}
      >
        <div className="names-items">
          <Item
            label="First Name"
            name="firstName"
            rules={[
              {
                required: true,
              }
            ]}
            className="name-item"
          >
            <InputField name="firstName" onChange={(e) => onChange(e)} />
          </Item>
          <Item
            label="Last Name"
            name="lastName"
            rules={[
              {
                required: true,
              }
            ]}
            className="name-item"
          >
            <InputField name="lastName" onChange={(e) => onChange(e)} />
          </Item>
        </div>
        <Item
          label="Email"
          name="email"
          rules={[
            {
              required: true,
              type: "email"
            }
          ]}
        >
          <InputField name="email" onChange={(e) => onChange(e)} />
        </Item>
        <Item
          label="Re-Enter Email"
          name="confirmEmail"
          rules={[
            {
              required: true,
              type: "email"
            },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue('email') === value) {
                  return Promise.resolve();
                }
                return Promise.reject(new Error('The two emails that you entered do not match!'));
              },
            }),
          ]}
        >
          <InputField name="confirmEmail" />
        </Item>
        <Item
          name="password"
          label="Password"
          rules={[
            {
              required: true,
              message: 'Please input your password!',
            },
          ]}
        >
          <InputField type="password" name="password" onChange={(e) => onChange(e)} />
        </Item>
        <Item>
          {!isStrongPassword
            ?
            <div>
              <div className="pass-hint-box">
                <span className="pass-hint">
                  One lowercase character
                </span>
                <span className="pass-hint">
                  One special character
                </span>
              </div>
              <div className="pass-hint-box">
                <span className="pass-hint">
                  One uppercase character
                </span>
                <span className="pass-hint">
                  8 characteres minimum
                </span>
              </div>
              <div className="pass-hint-box">
                <span className="pass-hint">
                  One number
                </span>
              </div>
            </div>

            :
            <span className="strong-pass-hint">Strong password</span>
          }
        </Item>
        <Item
          name="confirmPassword"
          label="Confirm Password"
          dependencies={['password']}
          rules={[
            {
              required: true,
              message: 'Please confirm your password!',
            },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue('password') === value) {
                  return Promise.resolve();
                }
                return Promise.reject(new Error('The two passwords that you entered do not match!'));
              },
            }),
          ]}
        >
          <InputField type="password" name="confirmPassword" />
        </Item>
        <Item
          className="birthday-picker-item"
          name="dateOfBirth"
          rules={[
            {
              required: true,
            }
          ]}
        >
          <DatePicker
            className="birthday-picker"
            placeholder="Date Of Birth"
            name="dateOfBirth"
          />
        </Item>
        <Item className="terms-policy-item">
          <Checkbox onChange={({ target: { checked }}) => setCheckedTerms(checked)}>I agree to the <a href="/">Terms and Policy</a></Checkbox>
        </Item>
        <Item shouldUpdate>
          {() => <Button
            type="primary"
            htmlType="submit"
            className="submit-btn"
            disabled={
              !form.isFieldsTouched(true) ||
              !!form.getFieldsError().filter(({ errors }) => errors.length).length ||
              !checkedTerms
            }
          >
            Submit
          </Button>}
        </Item>
      </Form>
    </div>
  )
}
