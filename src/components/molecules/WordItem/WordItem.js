import React, { Fragment } from 'react';
import { View } from 'react-native';
import Text from '../../atoms/Text';

const WordItem = (props) => {
  return (
    <View style={{
      justifyContent: 'center',
      backgroundColor: 'white',
      marginTop: 16,
      paddingVertical: 16,
      paddingHorizontal: 16,
      border: 1,
      borderRadius: 3,
      shadowColor: '#000',
      shadowOffset: { width: 2, height: 4 },
      shadowOpacity: 0.3
    }}>
      <Fragment>
        <Text paddingBottom={false}>
          {`${props.title}${props.translation ? ` / ${props.translation}` : ''}`}
        </Text>
      </Fragment>
    </View>
  );
};

export default WordItem;