import React from 'react';
import { Button } from 'antd';

import './style.css';

export default function PrimaryButton({
  onClick,
  btnText,
  className,
  circleColor,
  disabled,
  htmlType,
}) {
  return (
    <Button onClick={onClick} className={className} disabled={disabled} htmlType={htmlType}>
      {circleColor &&
        <span
          style={{
            width: 8,
            height: 8,
            borderRadius: 50,
            background: `${circleColor}`,
            display: 'inline-block'
          }}
        />}
      {btnText}
    </Button>
  )
}
