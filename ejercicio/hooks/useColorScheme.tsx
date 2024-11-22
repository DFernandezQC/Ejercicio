import { ColorSchemeName, useColorScheme as _useColorScheme } from 'react-native';

/**
 * Returns the current color scheme ('light' or 'dark').
 * This is a wrapper around React Native's `useColorScheme` hook.
 */
export function useColorScheme(): NonNullable<ColorSchemeName> {
  return _useColorScheme() as NonNullable<ColorSchemeName>;
}
