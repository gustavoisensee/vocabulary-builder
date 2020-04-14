import React from 'react';
import { TouchableOpacity } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import { options } from '../helpers/screen';
import { COLORS } from '../consts/colors';
import Language from '../screens/Language'
import Word from '../screens/LanguageDetails'
import BackIcon from '../components/atoms/Icon/Back';
import EditIcon from '../components/atoms/Icon/Edit';
import { GUTTER } from '../consts/defaultProps';
import { updateLanguageModalSubject } from '../helpers/observers';
import { retrieveData } from '../helpers/asyncStorage';
import lType from '../types/language';

const Stack = createStackNavigator();

const Main = () => {
  const handleEdit = async(route: any) => {
    const languages = await retrieveData('languages');
    const language = languages.find((f: lType) => f.id === route.params.item.id);

    updateLanguageModalSubject(language);
  };

  return (
    <Stack.Navigator>
      <Stack.Screen name='Languages' component={Language} options={{
          ...options,
          title: 'Languages'
        }}
      />
      <Stack.Screen name='LanguageDetails' component={Word} options={({ navigation, route }) => ({
          ...options,
          title: 'Details',
          headerLeft: () => (
            <TouchableOpacity
              onPress={navigation.goBack}
              style={{ paddingLeft: GUTTER / 2 }}
            >
              <BackIcon color={COLORS.secondary} size={36} />
            </TouchableOpacity>
          ),
          headerRight: () => (
            <TouchableOpacity onPress={() => handleEdit(route)} style={{ paddingRight: GUTTER }}>
              <EditIcon color={COLORS.secondary} size={22} />
            </TouchableOpacity>
          )
        })}
      />
    </Stack.Navigator>
  );
};

export default Main;
