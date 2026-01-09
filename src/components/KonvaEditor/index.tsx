import { Stage, Layer, Image as KonvaImage } from 'react-konva';
import React, { forwardRef, useEffect, useImperativeHandle, useMemo, useRef, useState } from 'react';
import useImage from 'use-image';
import Konva from 'konva';
import { filterConfigs, FilterType } from './config';
import { Slider, Stack, Tab, Tabs, useTheme } from '@mui/material';
import { GridOverlay } from './GridOverlay';
import { useSnackbar } from '~/hooks/useSnackbar';
import LoadingCircular from '../LoadingCircular';

interface KonvaEditorProps {
  imageUrl: string;
}
const STAGE_SIZE = 400;

export interface KonvaEditorHandle {
  getEditedImage: () => Promise<File | null>;
}

const KonvaEditor: React.ForwardRefRenderFunction<KonvaEditorHandle, KonvaEditorProps> = ({ imageUrl }, ref) => {
  const theme = useTheme();
  const { enqueueError } = useSnackbar();
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

  useImperativeHandle(ref, () => ({
    getEditedImage: async () => {
      const blob = (await stageRef.current?.toBlob()) as Blob | null;
      if (!blob) {
        enqueueError('There is an error!');
        return null;
      }

      const file = new File([blob], 'edited_image.png', {
        type: 'image/png',
        lastModified: Date.now(),
      });

      return file;
    },
  }));

  // when image is loaded we need to cache the shape
  useEffect(() => {
    if (image) {
      // you many need to reapply cache on some props changes like shadow, stroke, etc.
      imageRef.current?.cache();
    }
  }, [image]);

  const coverScale = useMemo(() => {
    if (!image) return 1;
    return Math.min(STAGE_SIZE / image.width, STAGE_SIZE / image.height);
  }, [image]);

  const handleOnChange = (nVal: number, type: FilterType) => {
    setFilter((prev) => ({ ...prev, [type]: nVal }));
  };

  const filterConfig = filterConfigs?.find((_option) => _option?.type === filterType);

  return (
    <Stack width={400} sx={{ border: theme.border.main, borderRadius: 1 }}>
      {!image ? (
        <LoadingCircular fullHeight />
      ) : (
        <>
          <Stage width={400} height={400} ref={stageRef}>
            <Layer>
              <KonvaImage
                ref={imageRef}
                image={image}
                x={STAGE_SIZE / 2}
                y={STAGE_SIZE / 2}
                offsetX={image?.width! / 2}
                offsetY={image?.height! / 2}
                scaleX={coverScale * filter?.scale}
                scaleY={coverScale * filter?.scale}
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
        </>
      )}
    </Stack>
  );
};

export default forwardRef(KonvaEditor);
