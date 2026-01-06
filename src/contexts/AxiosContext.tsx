import React, { ReactNode, useState } from 'react';
import { useEffect } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import { userState } from '~/atoms';
import axios from '~/tools/axios';
import { default as originAxios } from 'axios';
import jwt_decode from 'jwt-decode';
import { useSnackbar } from '~/hooks/useSnackbar';
import { Outlet, useNavigate } from 'react-router-dom';
import LoadingCircular from '~/components/LoadingCircular';
import { COOKIE_KEY, cookieService } from '~/tools/storages';
import { BASE_URL } from '~/config/config';

interface AxiosContextProps {}

const refreshAxios = originAxios.create({
  baseURL: BASE_URL,
  withCredentials: true,
});

const AxiosContext = ({}: AxiosContextProps) => {
  const [user, setUser] = useRecoilState(userState);
  const { enqueueError } = useSnackbar();
  const navigate = useNavigate();

  const refreshToken = cookieService.get(COOKIE_KEY.REFRESH_TOKEN);
  const [isLoading, setIsLoading] = useState<boolean>(refreshToken ? true : false);

  useEffect(() => {
    const id = axios.interceptors.response.use(
      (res) => {
        return res;
      },
      (err) => {
        if (err?.response?.status === 401) {
          navigate('/login');
          setUser(null);
        }
        if (err?.response?.data) err.data = err?.response?.data;
        return Promise.reject(err);
      }
    );

    (async () => {
      if (refreshToken) {
        try {
          const res = await axios.post('/v1/auth/refresh');
          setUser(res?.data?.rows);
        } catch (e) {
          console.log('Get infor error:', e);
        } finally {
          setIsLoading(false);
        }
      }
    })();
  }, []);

  useEffect(() => {
    if (user) {
      const id = axios.interceptors.request.use(
        async (config: any) => {
          const date = new Date();
          const decodedToken: any = jwt_decode(user?.accessToken);
          if (decodedToken?.exp < date.getTime() / 1000) {
            const res = await refreshAxios.post('/v1/auth/refresh', {
              // yeu cau co cookie thi gan vao
              withCredentials: true,
            });

            const newUser = {
              ...user,
              accessToken: res?.data?.accessToken || '',
            };

            setUser(newUser);
            config.headers['token'] = `Bearer ${res?.data?.rows?.accessToken}`;
          } else {
            config.headers['token'] = `Bearer ${user?.accessToken}`;
          }

          return config;
        },
        (err) => {
          return Promise.reject(err);
        }
      );

      return () => {
        axios.interceptors.request.eject(id);
      };
    }
  }, [user?.id]);

  return <>{isLoading ? <LoadingCircular fullHeight /> : <Outlet />}</>;
};

export default AxiosContext;
