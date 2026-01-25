import React, { useCallback, useEffect, useRef, useState } from 'react';
import MiModal from '~/components/MiModal';
import Cropper, { Area } from 'react-easy-crop';
import { Box, Button, Grid, Slider, Stack, Typography } from '@mui/material';
import Output from './Output';
import ImageButton from '~/components/ImageButton';
import { useUserMutation } from '~/hooks/useUserMutation';
import { getCroppedImgFile, getCroppedImgURL, ImageInfo } from './helper';
import _ from 'lodash';

interface AvatarCropProps {
  isOpen: boolean;
  onClose: () => void;
  file: File;
}

export const CROP_AREA_ASPECT = 1 / 1;

const AvatarCrop = ({ isOpen, onClose, file }: AvatarCropProps) => {
  const cropRef = useRef<Cropper>(null);
  const { mSetAvatar } = useUserMutation();

  const [url, setUrl] = useState(() => URL.createObjectURL(file));
  const [previewURL, setPreviewURL] = useState('');

  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [rotation, setRotation] = useState(0);
  const [zoom, setZoom] = useState(1);
  const [cropArea, setCropArea] = useState<{
    croppedArea: Area;
    croppedAreaPixels: Area;
  } | null>(null);

  const previewDebounce = useCallback(
    _.debounce(async (opts: ImageInfo) => {
      const nUrl = await getCroppedImgURL(opts);

      await setPreviewURL(nUrl || '');
    }, 300),
    []
  );

  useEffect(() => {
    if (cropArea?.croppedAreaPixels) {
      previewDebounce({
        imageSrc: url,
        pixelCrop: cropArea?.croppedAreaPixels,
        rotation,
      });
    }
  }, [cropArea, zoom, rotation, crop]);

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
                const editFile = await getCroppedImgFile({
                  imageSrc: url,
                  pixelCrop: cropArea?.croppedAreaPixels,
                  rotation,
                });

                const formData = new FormData();

                formData.append('photo', editFile || file);
                mSetAvatar.mutateAsync(formData, {
                  onSuccess(data, variables, context) {
                    onClose && onClose();
                    setTimeout(() => {
                      window.location.reload();
                    }, 500);
                  },
                });
              }
            }}
            loading={mSetAvatar.isPending}
          >
            Save
          </Button>
        </Stack>
      }
    >
      <Stack sx={{ p: 2 }}>
        <ImageButton label="Choose image" onDrop={(file) => setUrl(URL.createObjectURL(file))} />

        <Grid container spacing={3} mt={2}>
          <Grid size={{ xs: 12, sm: 8 }}>
            <Typography sx={{ mb: 1, fontWeight: 500 }}>Original image</Typography>

            <Stack sx={{ position: 'relative' }} width={1} height={300}>
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
              />
            </Stack>
          </Grid>
          <Grid size={{ xs: 12, sm: 4 }}>
            <Typography sx={{ mb: 1, fontWeight: 500 }}>After crop</Typography>
            {cropArea?.croppedArea && (
              <Output croppedArea={cropArea?.croppedArea} image={previewURL} rotation={rotation} />
            )}
          </Grid>
        </Grid>

        <Grid container spacing={2} mt={2}>
          <Grid size={{ xs: 12, sm: 6 }}>
            <Stack direction="row" alignItems="center" spacing={2}>
              <Typography sx={{ fontWeight: 500 }}>Zoom</Typography>
              <Slider
                value={zoom}
                min={1}
                max={3}
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
              <Typography sx={{ fontWeight: 500 }}>Rotate</Typography>
              <Slider
                value={rotation}
                min={0}
                max={360}
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
