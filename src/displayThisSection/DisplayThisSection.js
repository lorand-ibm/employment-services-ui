// @flow

import {Children} from 'react';

type Props = {
  children?: any,
  when: boolean,
};

const DisplayThisSection = ({children, when}: Props) => (when ? Children.only(children) : null);

export default DisplayThisSection;
