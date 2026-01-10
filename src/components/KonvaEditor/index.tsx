import { Stage, Layer, Image as KonvaImage } from 'react-konva';
import React, { forwardRef, useEffect, useImperativeHandle, useMemo, useRef, useState } from 'react';
import useImage from 'use-image';
import Konva from 'konva';
import { filterConfigs, FilterType } from './config';
import { Slider, Stack, Tab, Tabs, useTheme } from '@mui/material';
import { useSnackbar } from '~/hooks/useSnackbar';
import LoadingCircular from '../LoadingCircular';

interface KonvaEditorProps {
  imageUrl: string;
}
const CONTAINER_MAX_SIZE = 400;

export interface KonvaEditorHandle {
  getEditedImage: () => Promise<File | null>;
}

const KonvaEditor: React.ForwardRefRenderFunction<KonvaEditorHandle, KonvaEditorProps> = ({ imageUrl }, ref) => {
  const theme = useTheme();
  const { enqueueError } = useSnackbar();
  const stageRef = useRef<Konva.Stage | null>(null);
  const imageRef = useRef<Konva.Image | null>(null);
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
      let pixelRatio = 1;
      if (Math.max(image?.naturalWidth, image?.naturalHeight) > 4000) {
        pixelRatio = 0.25;
      } else if (Math.max(image?.naturalWidth, image?.naturalHeight) > 2000) {
        pixelRatio = 0.5;
      }

      // reduce resolution to improve performance
      imageRef?.current?.cache({
        pixelRatio: pixelRatio,
      });
    }
  }, [!!image]);

  const imageWidth = Number(image?.width);
  const imageHeight = Number(image?.height);

  const coverScale = useMemo<number>(() => {
    if (!image) return 1;
    return Math.max(imageWidth, imageHeight) / CONTAINER_MAX_SIZE;
  }, [image]);

  const handleOnChange = (nVal: number, type: FilterType) => {
    setFilter((prev) => ({ ...prev, [type]: nVal }));
  };

  const filterConfig = filterConfigs?.find((_option) => _option?.type === filterType);

  return (
    <Stack width={CONTAINER_MAX_SIZE + 3} sx={{ border: theme.border.main, borderRadius: 1 }}>
      {!image && <LoadingCircular sx={{ height: CONTAINER_MAX_SIZE + 3 }} />}

      <Stack
        sx={{
          display: !image ? 'none' : 'flex',
          width: CONTAINER_MAX_SIZE + 3,
          height: CONTAINER_MAX_SIZE + 3,
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Stage
          width={imageWidth / coverScale}
          height={imageHeight / coverScale}
          ref={stageRef}
          style={{
            borderTop: theme.border.main,
            borderBottom: theme.border.main,
          }}
        >
          <Layer>
            <KonvaImage
              ref={imageRef}
              image={image}
              x={imageWidth / coverScale / 2}
              y={imageHeight / coverScale / 2}
              offsetX={imageWidth / 2}
              offsetY={imageHeight / 2}
              scaleX={filter?.scale / coverScale}
              scaleY={filter?.scale / coverScale}
              rotation={filter?.rotation}
              draggable
              filters={[Konva.Filters.Brightness, Konva.Filters.Contrast]}
              brightness={filter?.brightness}
              contrast={filter?.contrast}
            />
          </Layer>
        </Stage>
      </Stack>

      <Slider
        size="small"
        min={filterConfig?.min}
        max={filterConfig?.max}
        step={filterConfig?.step}
        value={filter[filterType]}
        onChange={(e, nVal) => handleOnChange(nVal, filterType)}
        aria-label="Small"
        valueLabelDisplay="auto"
      />

      <Tabs value={filterType} onChange={(e, nVal) => setFilterType(nVal)} variant="fullWidth">
        {filterConfigs?.map((_item) => {
          const Icon = _item?.icon;
          return <Tab key={_item?.type} icon={<Icon />} label={_item?.label} value={_item?.type} />;
        })}
      </Tabs>
    </Stack>
  );
};

export default forwardRef(KonvaEditor);
