import React from 'react';
import Svg, { Path } from 'react-native-svg';
import defaultProps from './defaultProps';
import defaultPropTypes from './defaultPropTypes';
import { GUTTER } from '../../../consts/defaultProps';
import iconType from './iconType';

const Back = ({ size, color, ...rest }: iconType) => (
  <Svg width={size} height={size} viewBox={`0 0 ${GUTTER * 1.5} ${GUTTER * 1.5}`} {...rest}>
    <Path
      fill={color}
      d='M11.29,12l3.54-3.54a1,1,0,0,0,0-1.41,1,1,0,0,0-1.42,0L9.17,11.29a1,1,0,0,0,0,
        1.42L13.41,17a1,1,0,0,0,.71.29,1,1,0,0,0,.71-.29,1,1,0,0,0,0-1.41Z'
    />
  </Svg>
);

Back.defaultProps = defaultProps;
Back.propTypes = defaultPropTypes;

export default Back;
