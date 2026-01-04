import { useRecoilState } from "recoil";
// types
import {
  DefaultConfigProps,
  PresetColor,
  ThemeDirection,
  ThemeMode,
} from "~/themes/types/config";
import { configAtom } from "~/atoms/config";
import _ from "lodash";
// import { useAppSetting } from './user-setting/useAppSetting';

// ==============================|| CONFIG - HOOKS  ||============================== //

export interface UseConfigProps {
  onChange: (nConfig: DefaultConfigProps) => void;
}

const useConfig = () => {
  const [config, setConfig] = useRecoilState<DefaultConfigProps>(configAtom);

  // save app config
  const handleAppSetting = (nConfig: DefaultConfigProps) => {
    setConfig(nConfig);
  };

  return {
    ...config,
    onChangeContainer: () => {},
    onChangeMode: (mode: ThemeMode) => {
      const nConfig = { ...config, mode: mode };
      handleAppSetting(nConfig);
    },
    onChangePresetColor: (theme: PresetColor) => {
      const nConfig = { ...config, presetColor: theme };
      handleAppSetting(nConfig);
    },
    onChangeDirection: (direction: ThemeDirection) => {},
    // onChangeMiniDrawer: (miniDrawer: boolean) => {},
    onChangeFontFamily: (fontFamily: string) => {},
    initAppSetting: (nConfig: DefaultConfigProps) => {
      // console.log('initAppSetting', nConfig, config);
      if (!_.eq(nConfig, config)) {
        setConfig(nConfig);
      }
    },
  };
};

export default useConfig;
