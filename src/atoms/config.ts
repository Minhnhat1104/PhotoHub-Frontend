import { atom } from 'recoil';

import { DefaultConfigProps } from '~/themes/types/config';

const config: DefaultConfigProps = {
  defaultPath: '/',
  // fontFamily: `'Inter',sans-serif`,
  // fontFamily: `'Noto Sans KR',sans-serif`,
  fontFamily: 'Roboto,sans-serif',
  // i18n: currentLang,
  container: false,
  mode: 'light',
  presetColor: 'default',
  themeDirection: 'ltr',
  enableTrans: false,
};

export const configAtom = atom<DefaultConfigProps>({
  key: 'configAtom',
  default: config,
});
