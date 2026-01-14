import Cookies, { CookieSetOptions } from 'universal-cookie';

export enum LOCAL_STORAGE_KEY {
  // themes
  THEME_MODE = 'theme-mode',
  LANG = 'lang',
}

export enum COOKIE_KEY {
  REFRESH_TOKEN = 'refreshToken',
}

export const localStorageService = {
  get: (key: LOCAL_STORAGE_KEY) => {
    return localStorage.getItem(key);
  },
  set: (key: LOCAL_STORAGE_KEY, value: string) => {
    localStorage.setItem(key, value);
  },
  remove: (key: LOCAL_STORAGE_KEY) => {
    localStorage.removeItem(key);
  },
};

const cookie = new Cookies();
export const cookieService = {
  get: (key: COOKIE_KEY) => {
    return cookie.get(key);
  },
  set: (key: COOKIE_KEY, value: string, options?: CookieSetOptions) => {
    cookie.set(key, value, options);
  },
  remove: (key: COOKIE_KEY) => {
    cookie.remove(key);
  },
};
