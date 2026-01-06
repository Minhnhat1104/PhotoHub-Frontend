import { Stage, Layer, Image as KonvaImage } from 'react-konva';
import { useEffect, useRef, useState } from 'react';
import useImage from 'use-image';
import Konva from 'konva';
import { filterConfigs, FilterType } from './config';
import { Slider, Stack, Tab, Tabs, useTheme } from '@mui/material';
import { GridOverlay } from './GridOverlay';

export default function KonvaEditor({ imageUrl }: { imageUrl: string }) {
  const theme = useTheme();
  const imageRef = useRef<Konva.Image | null>(null);
  const stageRef = useRef<Konva.Stage | null>(null);
  const [image] = useImage(imageUrl, 'anonymous');
  const [filter, setFilter] = useState<Record<FilterType, number>>({
    scale: 1,
    rotation: 0,
    brightness: 1,
    contrast: 0,
  });
  const [filterType, setFilterType] = useState<FilterType>(FilterType.scale);

  // when image is loaded we need to cache the shape
  useEffect(() => {
    if (image) {
      // you many need to reapply cache on some props changes like shadow, stroke, etc.
      imageRef.current?.cache();
    }
  }, [image]);

  const handleOnChange = (nVal: number, type: FilterType) => {
    setFilter((prev) => ({ ...prev, [type]: nVal }));
  };

  const filterConfig = filterConfigs?.find((_option) => _option?.type === filterType);

  return (
    <Stack width={400} sx={{ border: theme.border.main, borderRadius: 1 }}>
      <Stage width={400} height={400} ref={stageRef}>
        <Layer>
          <KonvaImage
            ref={imageRef}
            image={image}
            x={200}
            y={200}
            offsetX={image?.width! / 2}
            offsetY={image?.height! / 2}
            scaleX={filter?.scale}
            scaleY={filter?.scale}
            rotation={filter?.rotation}
            draggable
            filters={[Konva.Filters.Brightness, Konva.Filters.Contrast]}
            brightness={filter?.brightness}
            contrast={filter?.contrast}
          />
        </Layer>

        <GridOverlay width={400} height={400} visible />
      </Stage>

      <Slider
        size="small"
        min={filterConfig?.min}
        max={filterConfig?.max}
        step={filterConfig?.step}
        value={filter[filterType]}
        onChange={(e, nVal) => handleOnChange(nVal, filterType)}
        aria-label="Small"
        valueLabelDisplay="on"
      />

      <Tabs value={filterType} onChange={(e, nVal) => setFilterType(nVal)} variant="fullWidth">
        {filterConfigs?.map((_item) => {
          const Icon = _item?.icon;
          return <Tab key={_item?.type} icon={<Icon />} label={_item?.label} value={_item?.type} />;
        })}
      </Tabs>
    </Stack>
  );
}
