import axios from '~/tools/axios';
import { useMutation } from '@tanstack/react-query';
import { queryKeys } from '~/config/queryKeys';

export const useImageMutation = () => {
  const mUpload = useMutation({
    mutationKey: [queryKeys.imageUpload],
    mutationFn: async (params: any) => {
      const res = await axios.post('/v1/image/upload', params, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      return res;
    },
  });

  const mDelete = useMutation({
    mutationKey: [queryKeys.imageDelete],
    mutationFn: async (params: any) => {
      const res = await axios.delete('/v1/image/delete', params);

      return res;
    },
  });

  const mSetFavorite = useMutation({
    mutationKey: [queryKeys.imageFavorite],
    mutationFn: async (params: any) => {
      const res = await axios.post('/v1/image/favorite', params);

      return res;
    },
  });

  const mEditImage = useMutation({
    mutationKey: [queryKeys.imageEdit],
    mutationFn: async (params: any) => {
      const res = await axios.post('/v1/image/edit', params);

      return res;
    },
  });

  const mResetEditImage = useMutation({
    mutationKey: [queryKeys.imageReset],
    mutationFn: async (params: any) => {
      const res = await axios.post('/v1/image/reset', params);

      return res;
    },
  });

  return { mUpload, mDelete, mSetFavorite, mEditImage, mResetEditImage };
};
