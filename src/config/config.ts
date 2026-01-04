import { DefaultConfigProps } from "~/themes/types/config";

export const defaultLayoutWidth = "1300px";
export const BASE_URL = "http://localhost:8000";

const config: DefaultConfigProps = {
  defaultPath: "/",
  // fontFamily: `'Inter',sans-serif`,
  // fontFamily: `'Noto Sans KR',sans-serif`,
  fontFamily: "Roboto,sans-serif",
  // i18n: currentLang,
  container: false,
  mode: "light",
  presetColor: "default",
  themeDirection: "ltr",
  enableTrans: false,
};

export default config;
