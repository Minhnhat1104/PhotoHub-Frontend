import { useState } from 'react';
import React from 'react';
import { Box, Button, InputLabel, Stack, TextField, Typography, useTheme } from '@mui/material';
import MiModal from '~/components/MiModal';
import { useQueryClient } from '@tanstack/react-query';
import { queryKeys } from '~/config/queryKeys';
import { SET_TIMEOUT } from '~/config/constants';
import { useRecoilValue } from 'recoil';
import { userState } from '~/atoms';
import { Controller, useForm, type SubmitHandler } from 'react-hook-form';
import ImageDropZone from '~/components/ImageDropZone';
import { useAlbumMutation } from '~/hooks/Album/useAlbumMutation';

interface UploadModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface UploadFormData {
  name: string;
  description: string;
  photos: File[];
}

function UploadModal(props: UploadModalProps) {
  const { isOpen, onClose } = props;
  const theme = useTheme();
  const queryClient = useQueryClient();
  const user = useRecoilValue(userState);

  const { mCreate } = useAlbumMutation();

  const {
    register,
    handleSubmit,
    watch,
    control,
    formState: { errors },
  } = useForm<UploadFormData>();

  const onSubmit: SubmitHandler<UploadFormData> = async (data) => {
    const formData = new FormData();
    data?.photos.forEach((file) => {
      formData.append('photos', file);
    });
    formData.append('name', data?.name);
    formData.append('description', data?.description);
    formData.append('creator_id', user?.id?.toString() || '');

    mCreate.mutate(formData, {
      onSuccess(data, variables, context) {
        setTimeout(() => {
          queryClient.invalidateQueries({
            queryKey: [queryKeys.imageList],
          });
        }, SET_TIMEOUT);
        onClose();
      },
    });
  };

  return (
    <MiModal title={'Create album'} isOpen={isOpen} size="sm" onClose={onClose} allowFullScreen>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Stack spacing={2} width={'100%'} alignItems="flex-start" p={2}>
          <TextField
            label="Name"
            helperText={errors.name?.message}
            error={!!errors.name}
            {...register('name', { required: true, maxLength: 50 })}
            fullWidth
          />

          <TextField
            label="Description"
            helperText={errors.description?.message}
            error={!!errors.description}
            {...register('description', { required: true, maxLength: 50 })}
            multiline
            minRows={2}
            fullWidth
          />

          <Controller
            name="photos"
            control={control}
            render={({ field }) => <ImageDropZone value={field?.value} onChange={field?.onChange} />}
          />

          <Stack direction="row" justifyContent="center" width={1}>
            <Button
              type="submit"
              loading={mCreate.isPending}
              variant="contained"
              sx={{ width: 'fit-content', margin: 'auto' }}
            >
              Upload
            </Button>
          </Stack>
        </Stack>
      </form>
    </MiModal>
  );
}

export default UploadModal;
