import { useQuery } from '@tanstack/react-query';
import { queryKeys } from '~/config/queryKeys';
import axios from '~/tools/axios';

const useImages = (params: { page: number; size: number }) => {
  const res = useQuery({
    queryFn: async () => {
      const res = await axios.get(`/v1/image`, { params });

      return res?.data;
    },

    queryKey: [queryKeys.imageList, params?.page, params?.size],
    keepPreviousData: true,
  });

  return res;
};

export const useImage = (params: { id: string }) => {
  const res = useQuery({
    queryFn: async () => {
      const res = await axios.get(`/v1/image/${params.id}`, {});
      return res.data;
    },

    queryKey: [queryKeys.imageView, params.id],
    keepPreviousData: true,
  });

  return res;
};

export default useImages;
