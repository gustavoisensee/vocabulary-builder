import React from 'react';
import Svg, { Path } from 'react-native-svg';
import defaultProps from './defaultProps';
import defaultPropTypes from './defaultPropTypes';
import { GUTTER } from '../../../consts/defaultProps';
import iconType from './iconType';

const Menu = ({ size, color, ...rest }: iconType) => (
  <Svg width={size} height={size} viewBox={`0 0 ${GUTTER * 1.5} ${GUTTER * 1.5}`} {...rest}>
    <Path
      fill={color}
      d='M5,8H19a1,1,0,0,0,0-2H5A1,1,0,0,0,5,8Zm16,3H3a1,1,0,0,0,0,
        2H21a1,1,0,0,0,0-2Zm-2,5H5a1,1,0,0,0,0,2H19a1,1,0,0,0,0-2Z'
    />
  </Svg>
);

Menu.defaultProps = defaultProps;
Menu.propTypes = defaultPropTypes;

export default Menu;
