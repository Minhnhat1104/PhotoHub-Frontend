import React, { useRef, useState } from 'react';
import MiModal from '~/components/MiModal';
import Cropper, { Area } from 'react-easy-crop';
import { Box, Button, Grid, Slider, Stack, Typography } from '@mui/material';
import Output from './Output';
import getCroppedImg from './helper';

interface AvatarCropProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (opts: { file: File; editFile: File | null }) => void;
  file: File;
}

export const CROP_AREA_ASPECT = 1 / 1;

const AvatarCrop = ({ isOpen, onClose, file, onSave }: AvatarCropProps) => {
  const cropRef = useRef<Cropper>(null);
  const url = useRef(URL.createObjectURL(file))?.current;

  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [rotation, setRotation] = useState(0);
  const [zoom, setZoom] = useState(1);
  const [cropArea, setCropArea] = useState<{
    croppedArea: Area;
    croppedAreaPixels: Area;
  } | null>(null);

  return (
    <MiModal
      title={'Edit image'}
      size="md"
      isOpen={isOpen}
      onClose={onClose}
      footer={
        <Stack direction="row" justifyContent="center" width={1}>
          <Button
            type="submit"
            //   loading={mCreate.isPending}
            variant="contained"
            sx={{ width: 'fit-content', margin: 'auto' }}
            onClick={async () => {
              if (cropArea?.croppedAreaPixels) {
                const editFile = await getCroppedImg(url, cropArea?.croppedAreaPixels, rotation);
                onSave({
                  file,
                  editFile,
                });
              }
            }}
          >
            Save
          </Button>
        </Stack>
      }
    >
      <Stack sx={{ p: 2 }}>
        <Stack sx={{ width: 1 }}>
          <Grid container spacing={3}>
            <Grid size={{ xs: 12, sm: 8 }} sx={{ position: 'relative' }}>
              <Cropper
                ref={cropRef}
                image={url}
                crop={crop}
                zoom={zoom}
                aspect={CROP_AREA_ASPECT}
                rotation={rotation}
                onCropChange={setCrop}
                onRotationChange={setRotation}
                onCropAreaChange={(croppedArea, croppedAreaPixels) => setCropArea({ croppedArea, croppedAreaPixels })}
                onZoomChange={setZoom}
                showGrid={false}
              />
            </Grid>
            <Grid size={{ xs: 12, sm: 4 }}>
              {cropArea?.croppedArea && <Output croppedArea={cropArea?.croppedArea} image={url} />}
            </Grid>
          </Grid>
        </Stack>

        <Grid container spacing={2} mt={2}>
          <Grid size={{ xs: 12, sm: 6 }}>
            <Stack direction="row" alignItems="center" spacing={2}>
              <Typography>Zoom</Typography>
              <Slider
                value={zoom}
                min={0.5}
                max={1.5}
                step={0.1}
                aria-labelledby="Zoom"
                onChange={(e, nVal) => {
                  setZoom(nVal);
                }}
                valueLabelDisplay="auto"
              />
            </Stack>
          </Grid>
          <Grid size={{ xs: 12, sm: 6 }}>
            <Stack direction="row" alignItems="center" spacing={2}>
              <Typography>Rotate</Typography>
              <Slider
                value={rotation}
                min={-180}
                max={180}
                step={1}
                aria-labelledby="rotation"
                onChange={(e, nVal) => {
                  setRotation(nVal);
                }}
                valueLabelDisplay="auto"
              />
            </Stack>
          </Grid>
        </Grid>
      </Stack>
    </MiModal>
  );
};

export default AvatarCrop;
