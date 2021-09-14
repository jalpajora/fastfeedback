import React from 'react';
import { Icon } from '@chakra-ui/react';

const Logo = ({ path, ...rest }) => {
  return <Icon {...rest}>{path}</Icon>;
};

export default Logo;
