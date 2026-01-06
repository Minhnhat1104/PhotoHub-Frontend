import { useQuery } from '@tanstack/react-query';
import { queryKeys } from '~/config/queryKeys';
import axios from '~/tools/axios';

const useAlbums = (params: { page: number; size: number }) => {
  const res = useQuery({
    queryFn: async () => {
      const res = await axios.get(`/v1/album/list`, { params });

      return res;
    },

    queryKey: [queryKeys.albumList, params?.page, params?.size],
    keepPreviousData: true,
  });

  return res;
};

export const useAlbum = (params: { id: string }) => {
  const res = useQuery({
    queryFn: async () => {
      const res = await axios.get(`/v1/album/${params.id}`, {});
      return res;
    },

    queryKey: [queryKeys.albumView, params.id],
    keepPreviousData: true,
  });

  return res;
};

export default useAlbums;
