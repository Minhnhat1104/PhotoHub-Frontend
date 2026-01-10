import { atom } from 'recoil';
import { ThemeMode } from '~/themes/types/config';
import { LOCAL_STORAGE_KEY, localStorageService } from '~/tools/storages';

interface DefaultConfigProps {
  mode: ThemeMode;
  enableTrans: boolean;
}

const themeMode = localStorageService.get(LOCAL_STORAGE_KEY.THEME_MODE);
const isDarkMode =
  themeMode === 'dark' || (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches);

if (!themeMode) {
  localStorageService.set(LOCAL_STORAGE_KEY.THEME_MODE, isDarkMode ? 'dark' : 'light');
}

const config: DefaultConfigProps = {
  mode: isDarkMode ? 'dark' : 'light',
  enableTrans: false,
};

export const configState = atom<DefaultConfigProps>({
  key: 'configAtom',
  default: config,
});
