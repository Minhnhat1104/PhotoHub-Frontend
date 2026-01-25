import axios from '~/tools/axios';
import { useMutation } from '@tanstack/react-query';
import { queryKeys } from '~/config/queryKeys';

export const useUserMutation = () => {
  const mSetAvatar = useMutation({
    mutationKey: [queryKeys.userSetAvatar],
    mutationFn: async (params: any) => {
      const res = await axios.post('/v1/user/avatar', params, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      return res;
    },
  });

  const mDeleteAvatar = useMutation({
    mutationKey: [queryKeys.userDeleteAvatar],
    mutationFn: async (params: any) => {
      const res = await axios.delete('/v1/user/avatar', params);

      return res;
    },
  });

  const mProfileUpdate = useMutation({
    mutationKey: [queryKeys.userUpdateProfile],
    mutationFn: async (params: any) => {
      const res = await axios.post('/v1/user/profile', params);

      return res;
    },
  });

  const mChangePassword = useMutation({
    mutationKey: [queryKeys.userChangePassword],
    mutationFn: async (params: any) => {
      const res = await axios.post('/v1/user/change-password', params);

      return res;
    },
  });

  return { mSetAvatar, mProfileUpdate, mChangePassword, mDeleteAvatar };
};
