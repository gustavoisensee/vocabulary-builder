import React, { useState } from 'react';
import {
  Animated, TouchableWithoutFeedback, LayoutAnimation
} from 'react-native';
import { animationSpring } from '../../../consts/animation';
import Text from '../../atoms/Text';

const DEFAULT_HEIGHT = 50;

const WordItem = (props) => {
  const [height, setHeight] = useState(50);

  const handleSetHeight = () => {
    LayoutAnimation.configureNext(animationSpring);
    setHeight(height === DEFAULT_HEIGHT ? 100 : DEFAULT_HEIGHT);
  }

  return (
    <TouchableWithoutFeedback onPress={handleSetHeight}>
      <Animated.View style={{
        justifyContent: 'flex-start',
        backgroundColor: 'white',
        marginTop: 16,
        paddingVertical: 16,
        paddingHorizontal: 16,
        border: 1,
        borderRadius: 3,
        shadowColor: '#000',
        shadowOffset: { width: 2, height: 4 },
        shadowOpacity: 0.3,
        height
      }}>
        <Text paddingBottom={false} style={{ marginBottom: 8 }}>
          {`${props.title}${props.translation ? ` / ${props.translation}` : ''}`}
        </Text>
        {height > DEFAULT_HEIGHT && (
          <Text numberOfLines={3}>{props.description}</Text>
        )}
      </Animated.View>
    </TouchableWithoutFeedback>
  );
};

export default WordItem;