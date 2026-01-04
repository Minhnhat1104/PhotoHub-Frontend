import { type PalettesProps } from "@ant-design/colors";

import { type PresetColor, type ThemeMode } from "~/themes/types/config";
import { type PaletteThemeProps } from "~/themes/types/theme";

import Default from "./default";

const Theme = (
  colors: PalettesProps,
  presetColor: PresetColor,
  mode: ThemeMode
): PaletteThemeProps => {
  return Default(colors);
};

export default Theme;
