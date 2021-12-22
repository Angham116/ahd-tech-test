import React, { useState, useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import { Form, DatePicker, Checkbox } from 'antd';
import { InputField, PrimaryButton } from '../../common-components';

import { signupApi } from '../../api';

import './style.css';

const { Item } = Form;

function Signup({
  history,
}) {
  
  const [userInfo, setUserInfo] = useState({});
  const [isStrongPassword, setIsStrongPassword] = useState(false);
  const [checkedTerms, setCheckedTerms] = useState(false);
  const [form] = Form.useForm();
  const [, forceUpdate] = useState({});
  const [errorMsg, setErrorMsg] = useState('');
  const [passwordRequirements, setPasswordRequirements] = useState({
    oneLowerCaseChar: false,
    oneupperCaseChar: false,
    oneSpecialChar: false,
    eightCharMin: false,
    oneNumber: false,
  })

  // To disable submit button at the beginning.
  useEffect(() => {
    forceUpdate({});
  }, []);

  const onChange = ({ target: { value, name } }) => {
    setErrorMsg('');
    form.isFieldsTouched(false);
    if (name === 'password') {

      let req = {
        oneLowerCaseChar: false,
        oneupperCaseChar: false,
        oneSpecialChar: false,
        eightCharMin: false,
        oneNumber: false,
      };

      if (value.length < 8) {
        req.eightCharMin = false;
      } else {
        req.eightCharMin = true;
      }
  
      req.oneLowerCaseChar = /[a-z]+/.test(value);
      req.oneupperCaseChar = /[A-Z]+/.test(value);
      req.oneNumber = /[0-9]+/.test(value);
      req.oneSpecialChar = /[!@#$%^&*]+/.test(value);

      setPasswordRequirements(req);

      if (req.oneupperCaseChar && req.oneLowerCaseChar && req.oneNumber && req.eightCharMin && req.oneSpecialChar) {
        setUserInfo({
          ...userInfo,
          [name]: value,
        });
      }

    } else {
      setUserInfo({
        ...userInfo,
        [name]: value,
      });
    }
  }

  const onFinish = async () => {
    const {
      success,
      msg,
    } = await signupApi({ userInfo });
    if (success) {
      history.push('/');
    } else {
      setErrorMsg(msg);
    }
  }

  return (
    <div className="container">
      <Form
        layout="vertical"
        onFinish={onFinish}
        form={form}
        autoComplete={false}
      >
        <p className="err-msg">
          {errorMsg ? errorMsg : ''}
        </p>
        <div className="names-items">
          <Item
            label="First Name"
            name="firstName"
            rules={[
              {
                required: true,
                message: 'Please input your first name!',
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
                message: 'Please input your last name!',
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
              type: "email",
              message: 'Please input a valid email!',
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
                <span className={`pass-hint ${passwordRequirements.oneLowerCaseChar ? 'green-text' : 'red-text'}`}>
                  One lowercase character
                </span>
                <span className={`pass-hint ${passwordRequirements.oneSpecialChar ? 'green-text' : 'red-text'}`}>
                  One special character
                </span>
              </div>
              <div className="pass-hint-box">
                <span className={`pass-hint ${passwordRequirements.oneupperCaseChar ? 'green-text' : 'red-text'}`}>
                  One uppercase character
                </span>
                <span className={`pass-hint ${passwordRequirements.eightCharMin ? 'green-text' : 'red-text'}`}>
                  8 characteres minimum
                </span>
              </div>
              <div className="pass-hint-box">
                <span className={`pass-hint ${passwordRequirements.oneNumber ? 'green-text' : 'red-text'}`}>
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
              message: 'Please input your date of birth!',
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
          {() =>
          <PrimaryButton
            type="primary"
            htmlType="submit"
            className="submit-btn"
            disabled={
              !form.isFieldsTouched(true) ||
              !!form.getFieldsError().filter(({ errors }) => errors.length).length ||
              !checkedTerms
            }
            btnText="Sign Up"
          />}
        </Item>
      </Form>
      <p>
        Already have an account ? 
        <PrimaryButton
          className="link-btn"
          onClick={ () => history.push('/login')}
          btnText="Sign in"
        />
      </p>
    </div>
  )
}

export default withRouter(Signup);
