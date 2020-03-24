import React, { useState } from 'react';
import { Animated, TouchableWithoutFeedback, LayoutAnimation } from 'react-native';
import Text from '../../atoms/Text';

const WordItem = (props) => {
  // const [toggle, setToggle] = useState(false);
  // const [height] = useState(new Animated.Value(50)) 
  const [height, setHeight] = useState(50);

  const handleSetHeight = () => {
    // Animated.timing(
    //   height,
    //   {
    //     toValue: (toggle ? 50 : 100),
    //     duration: 500,
    //   }
    // ).start();
    LayoutAnimation.spring();
    // setToggle(!toggle);
    setHeight(height === 50 ? 100 : 50);
  }

  return (
    <TouchableWithoutFeedback onPress={handleSetHeight}>
      <Animated.View style={{
        justifyContent: 'center',
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
        <Text paddingBottom={false}>
          {`${props.title}${props.translation ? ` / ${props.translation}` : ''}`}
        </Text>
      </Animated.View>
    </TouchableWithoutFeedback>
  );
};

export default WordItem;