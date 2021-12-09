import React from 'react';

import { InputField, PrimaryButton } from '..';

export default function Search({
  placeholder,
  btnText,
  onSearch,
  prefix,
  handleSearchChange,
}) {
  return (
    <>
      <InputField
        placeholder={placeholder}
        prefix={prefix}
        name="search"
        onChange={handleSearchChange}
      />
      <PrimaryButton
        onClick={onSearch}
        btnText={btnText}
      />
    </>
  )
}
