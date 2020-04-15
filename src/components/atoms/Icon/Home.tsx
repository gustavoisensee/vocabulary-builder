import React from 'react';
import Svg, { Path } from 'react-native-svg';
import defaultProps from './defaultProps';
import defaultPropTypes from './defaultPropTypes';
import { GUTTER } from '../../../consts/defaultProps';
import iconType from './iconType';

const Home = ({ size, color, ...rest }: iconType) => (
  <Svg
    width={size}
    height={size}
    viewBox={`0 0 ${GUTTER * 1.5} ${GUTTER * 1.5}`}
    {...rest}
  >
    <Path
      fill={color}
      d="M20,8h0L14,2.74a3,3,0,0,0-4,0L4,8a3,3,0,0,0-1,2.26V19a3,3,0,0,0,3,3H18a3,3,0,0,0,
        3-3V10.25A3,3,0,0,0,20,8ZM14,20H10V15a1,1,0,0,1,1-1h2a1,1,0,0,1,1,1Zm5-1a1,1,0,0,
        1-1,1H16V15a3,3,0,0,0-3-3H11a3,3,0,0,0-3,3v5H6a1,1,0,0,1-1-1V10.25a1,1,0,0,1,
        .34-.75l6-5.25a1,1,0,0,1,1.32,0l6,5.25a1,1,0,0,1,.34.75Z"
    />
  </Svg>
);

Home.defaultProps = defaultProps;
Home.propTypes = defaultPropTypes;

export default Home;
