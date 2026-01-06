import axios from '~/tools/axios';
import { useMutation } from '@tanstack/react-query';
import { useSnackbar } from '~/hooks/useSnackbar';
import { queryKeys } from '~/config/queryKeys';

export const useAlbumMutation = () => {
  const { enqueueSuccess, enqueueError } = useSnackbar();
  const mCreate = useMutation({
    mutationKey: [queryKeys.albumCreate],
    mutationFn: async (params: any) => {
      await axios.post('/v1/album/create', params, {
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
    mutationKey: [queryKeys.albumDelete],
    mutationFn: async (params: any) => {
      const res = await axios.post('/v1/album/delete', params);

      return res;
    },
    onSuccess(data: any, variables, context) {
      enqueueSuccess('Delete album successfully!');
    },
    onError(data, variables, context) {
      enqueueError('Delete album failed!');
    },
  });

  return { mCreate, mDelete };
};
