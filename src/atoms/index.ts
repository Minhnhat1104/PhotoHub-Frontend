import { atom } from 'recoil';
import { type User } from '~/types';

export const userState = atom<User | null>({
  key: 'userAtom',
  default: null,
});

export const loginPathState = atom<string>({
  key: 'loginPathAtom',
  default: '/explore',
});
