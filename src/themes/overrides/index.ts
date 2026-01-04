import { type Theme } from "@mui/material/styles";
import { merge } from "lodash";

// project import
import Button from "./Button";

// ==============================|| OVERRIDES - MAIN ||============================== //

export default function ComponentsOverrides(theme: Theme) {
  return merge(Button(theme));
}
