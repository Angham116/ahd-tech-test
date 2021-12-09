import React from 'react';
import { Button } from 'antd';

export default function PrimaryButton({
  onClick,
  btnText
}) {
  return (
    <Button onClick={onClick} className="primary-button">
      {btnText}
    </Button>
  )
}
