import React, { useState } from 'react';
import {
  Animated,
  TouchableWithoutFeedback,
  LayoutAnimation
} from 'react-native';
import { animationSpring } from '../../../consts/animation';
import Text from '../../atoms/Text';
import styles from './styles';

const DEFAULT_HEIGHT = 50;

const WordItem = (props: any) => {
  const [height, setHeight] = useState(50);

  const handleSetHeight = () => {
    LayoutAnimation.configureNext(animationSpring);
    setHeight(height === DEFAULT_HEIGHT ? 100 : DEFAULT_HEIGHT);
  };

  return (
    <TouchableWithoutFeedback onPress={handleSetHeight}>
      <Animated.View style={[styles.container, { height }]}>
        <Text paddingBottom={false} style={styles.title}>
          {`${props.title}${
            props.translation ? ` / ${props.translation}` : ''
          }`}
        </Text>
        {height > DEFAULT_HEIGHT && (
          <Text numberOfLines={3}>{props.description}</Text>
        )}
      </Animated.View>
    </TouchableWithoutFeedback>
  );
};

export default WordItem;
