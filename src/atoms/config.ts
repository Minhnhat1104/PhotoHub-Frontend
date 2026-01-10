import { atom } from 'recoil';
import { PresetColor, ThemeDirection, ThemeMode } from '~/themes/types/config';

interface DefaultConfigProps {
  defaultPath: string;
  fontFamily: string;
  // miniDrawer: boolean;
  container: boolean;
  mode: ThemeMode;
  presetColor: PresetColor;
  themeDirection: ThemeDirection;
  enableTrans: boolean;
}

const isDarkMode = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;

const config: DefaultConfigProps = {
  defaultPath: '/',
  // fontFamily: `'Inter',sans-serif`,
  // fontFamily: `'Noto Sans KR',sans-serif`,
  fontFamily: 'Roboto,sans-serif',
  // i18n: currentLang,
  container: false,
  mode: isDarkMode ? 'dark' : 'light',
  presetColor: 'default',
  themeDirection: 'ltr',
  enableTrans: false,
};

export const configState = atom<DefaultConfigProps>({
  key: 'configAtom',
  default: config,
});
