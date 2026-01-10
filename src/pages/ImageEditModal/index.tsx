import { useRef, useState } from 'react';
import React from 'react';
import { Box, Button, InputLabel, Stack, TextField, Typography, useTheme } from '@mui/material';
import MiModal from '~/components/MiModal';
import { useQueryClient } from '@tanstack/react-query';
import { queryKeys } from '~/config/queryKeys';
import { useImageMutation } from '~/hooks/Image/useImageMutation';
import KonvaEditor, { KonvaEditorHandle } from '~/components/KonvaEditor';
import { getImageSrc } from '~/tools/image';
import { useSnackbar } from '~/hooks/useSnackbar';
import dayjs, { Dayjs } from 'dayjs';

interface ImageEditModalProps {
  isOpen: boolean;
  onClose: () => void;
  imageId: number;
}

interface UploadFormData {
  name: string;
  description: string;
  photo: File;
}

function ImageEditModal(props: ImageEditModalProps) {
  const { isOpen, onClose, imageId } = props;
  const theme = useTheme();
  const queryClient = useQueryClient();
  const editorRef = useRef<KonvaEditorHandle>(null);
  const { enqueueError } = useSnackbar();

  const [time, setTime] = useState<Dayjs | null>(null);
  const { mEditImage } = useImageMutation();

  const onSubmit = async () => {
    const formData = new FormData();
    const file = await editorRef?.current?.getEditedImage();
    if (!file) {
      enqueueError('Error!');
      return;
    }

    formData.append('photo', file);
    formData.append('imageId', `${imageId}`);

    mEditImage.mutate(formData, {
      onSuccess(data, variables, context) {
        queryClient.invalidateQueries({
          queryKey: [queryKeys.imageList],
        });
        onClose();
      },
    });
  };

  return (
    <MiModal title={'Edit image'} isOpen={isOpen} size="xs" onClose={onClose} allowFullScreen>
      <Stack spacing={2} width={'100%'} alignItems="flex-start" p={2}>
        <KonvaEditor ref={editorRef} imageUrl={getImageSrc(imageId, { v: time?.unix(), origin: !!time })} />

        <Stack direction="row" justifyContent="center" width={1} spacing={1.5}>
          <Button
            type="submit"
            loading={mEditImage.isPending}
            variant="contained"
            onClick={() => {
              setTime(dayjs());
              editorRef?.current?.resetFitler();
            }}
          >
            Reset
          </Button>
          <Button type="submit" loading={mEditImage.isPending} variant="contained" onClick={onSubmit}>
            Save
          </Button>
        </Stack>
      </Stack>
    </MiModal>
  );
}

export default ImageEditModal;
