import {
  BrightnessMediumOutlined,
  ContrastOutlined,
  CropRotateOutlined,
  SvgIconComponent,
  ZoomInOutlined,
} from '@mui/icons-material';

export enum FilterType {
  scale = 'scale',
  rotation = 'rotation',
  brightness = 'brightness',
  contrast = 'contrast',
}

interface FilterConfig {
  type: FilterType;
  label: string;
  min: number;
  max: number;
  step: number;
  icon: SvgIconComponent;
}

export const filterConfigs: FilterConfig[] = [
  {
    type: FilterType.scale,
    label: 'Scale',
    min: 0.5,
    max: 1.5,
    step: 0.1,
    icon: ZoomInOutlined,
  },
  {
    type: FilterType.rotation,
    label: 'Rotation',
    min: -180,
    max: 180,
    step: 1,
    icon: CropRotateOutlined,
  },
  {
    type: FilterType.brightness,
    label: 'Brightness',
    min: 0,
    max: 2,
    step: 0.1,
    icon: BrightnessMediumOutlined,
  },
  {
    type: FilterType.contrast,
    label: 'Contrast',
    min: -100,
    max: 100,
    step: 1,
    icon: ContrastOutlined,
  },
];
