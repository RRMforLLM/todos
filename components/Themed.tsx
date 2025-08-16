/**
 * Learn more about Light and Dark modes:
 * https://docs.expo.io/guides/color-schemes/
 */


import { Text as DefaultText, View as DefaultView, TouchableOpacity, TouchableOpacityProps, Text as RNText, TextInput as RNTextInput, TextInputProps } from 'react-native';
export type InputProps = ThemeProps & TextInputProps & {
  textColor?: string;
  backgroundColor?: string;
};

export function Input(props: InputProps) {
  const { style, lightColor, darkColor, textColor, backgroundColor, ...otherProps } = props;
  const theme = useColorScheme() ?? 'light';
  const bgColor = backgroundColor || useThemeColor({ light: lightColor, dark: darkColor }, 'background');
  const txtColor = textColor || Colors[theme].text;
  let placeholderColor = Colors[theme].fadedText;

  return (
    <RNTextInput
      style={[
        {
          backgroundColor: bgColor,
          color: txtColor,
          borderColor: Colors[theme].tint,
          borderWidth: 1,
          borderRadius: 6,
          padding: 10,
        },
        style,
      ]}
      placeholderTextColor={placeholderColor}
      {...otherProps}
    />
  );
}
export type ButtonProps = ThemeProps & TouchableOpacityProps & {
  title: string;
  textColor?: string;
  backgroundColor?: string;
};
export function Button(props: ButtonProps) {
  const { title, style, lightColor, darkColor, textColor, backgroundColor, ...otherProps } = props;
  const theme = useColorScheme() ?? 'light';
  const bgColor = backgroundColor || useThemeColor({ light: lightColor, dark: darkColor }, 'tint');
  let txtColor = textColor;
  if (!txtColor) {
    if (bgColor === Colors[theme].tint) {
      txtColor = Colors[theme].background;
    } else {
      txtColor = Colors[theme].text;
    }
  }

  return (
    <TouchableOpacity
      style={[{ backgroundColor: bgColor, padding: 12, borderRadius: 6, alignItems: 'center' }, style]}
      {...otherProps}
    >
      <RNText style={{ color: txtColor, fontWeight: 'bold' }}>{title}</RNText>
    </TouchableOpacity>
  );
}

import Colors from '@/constants/Colors';
import { useColorScheme } from './useColorScheme';

type ThemeProps = {
  lightColor?: string;
  darkColor?: string;
};

export type TextProps = ThemeProps & DefaultText['props'];
export type ViewProps = ThemeProps & DefaultView['props'];

export function useThemeColor(
  props: { light?: string; dark?: string },
  colorName: keyof typeof Colors.light & keyof typeof Colors.dark
) {
  const theme = useColorScheme() ?? 'light';
  const colorFromProps = props[theme];

  if (colorFromProps) {
    return colorFromProps;
  } else {
    return Colors[theme][colorName];
  }
}

export function Text(props: TextProps) {
  const { style, lightColor, darkColor, ...otherProps } = props;
  const color = useThemeColor({ light: lightColor, dark: darkColor }, 'text');

  return <DefaultText style={[{ color }, style]} {...otherProps} />;
}

export function View(props: ViewProps) {
  const { style, lightColor, darkColor, ...otherProps } = props;
  const backgroundColor = useThemeColor({ light: lightColor, dark: darkColor }, 'background');

  return <DefaultView style={[{ backgroundColor }, style]} {...otherProps} />;
}
