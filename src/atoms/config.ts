import { atom } from "recoil";

import config from "~/config/config";
import { type DefaultConfigProps } from "~/themes/types/config";

export const configAtom = atom<DefaultConfigProps>({
  key: "configAtom",
  default: config,
});
