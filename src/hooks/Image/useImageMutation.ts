import axios from '~/tools/axios';
import { useMutation } from '@tanstack/react-query';
import { useSnackbar } from '~/hooks/useSnackbar';
import { queryKeys } from '~/config/queryKeys';

export const useImageMutation = () => {
  const { enqueueSuccess, enqueueError } = useSnackbar();
  const mUpload = useMutation({
    mutationKey: [queryKeys.imageUpload],
    mutationFn: async (params: any) => {
      await axios.post('/v1/image/upload', params, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
    },
    onSuccess(data: any, variables, context) {
      enqueueSuccess('Update Images successfully!');
    },
    onError(data: any, variables, context) {
      enqueueError('Update Images fail!');
    },
  });

  const mDelete = useMutation({
    mutationKey: [queryKeys.imageDelete],
    mutationFn: async (params: any) => {
      const res = await axios.delete('/v1/image/delete', params);

      return res;
    },
    onSuccess(data: any, variables, context) {
      enqueueSuccess('Delete image successfully!');
    },
    onError(data, variables, context) {
      enqueueError('Delete image failed!');
    },
  });

  const mSetFavorite = useMutation({
    mutationKey: [queryKeys.imageFavorite],
    mutationFn: async (params: any) => {
      const res = await axios.delete('/v1/image/favorite', params);

      return res;
    },
    onSuccess(data: any, variables, context) {
      enqueueSuccess('Like image successfully!');
    },
    onError(data, variables, context) {
      enqueueError('Like image failed!');
    },
  });

  return { mUpload, mDelete, mSetFavorite };
};
