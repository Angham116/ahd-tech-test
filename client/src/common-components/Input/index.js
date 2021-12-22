import React from 'react';
import { Input } from 'antd';
import { EyeInvisibleOutlined, EyeTwoTone } from '@ant-design/icons';

export default function InputField({
  placeholder,
  type,
  onChange,
  prefix,
  name,
}) {
  return (
    type === "password"
    ?
    <Input.Password
      placeholder={placeholder}
      iconRender={visible => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
      onChange={onChange}
      className="input input-field"
      name={name}
    />
    :
    <Input
      placeholder={placeholder}
      type={type}
      onChange={onChange}
      className="input input-field"
      name={name}
      prefix={prefix}
  />
  )
}
