import React from 'react';
import FocusLock from 'react-focus-lock';

export const MobileOnlyFocusLock = ({mobile, disabled, children}) => {
  if (mobile) {
    return <FocusLock disabled={disabled} returnFocus={true}>{children}</FocusLock>;
  }
  return <>{children}</>;
};
