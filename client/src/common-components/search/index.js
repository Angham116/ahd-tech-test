import { Col, Row } from 'antd';
import React from 'react';

import { InputField, PrimaryButton } from '..';

import './style.css';

export default function Search({
  placeholder,
  btnText,
  onSearch,
  prefix,
  handleSearchChange,
}) {
  return (
    <Row>
      <Col span={12}>
        <InputField
          placeholder={placeholder}
          prefix={prefix}
          name="search"
          onChange={handleSearchChange}
        />
      </Col>
      <Col span={5} className="search-btn">
        <PrimaryButton
          onClick={onSearch}
          btnText={btnText}
        />
      </Col>
    </Row>
  )
}
