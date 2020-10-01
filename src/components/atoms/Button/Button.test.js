import React from 'react';
import { fireEvent, render } from '@testing-library/react-native';
import Button from './Button';

const onPress = jest.fn();

describe('<Button />', () => {
  it('renders download button', async () => {
    const { getByRole } = render(<Button onPress={onPress}>test</Button>);

    expect(getByRole('button')).toBeTruthy();
  });

  it('validates if onPress is called when button is pressed', () => {
    const { getByRole } = render(<Button onPress={onPress}>test</Button>);

    fireEvent.press(getByRole('button'));

    expect(onPress).toHaveBeenCalled();
  });
});
