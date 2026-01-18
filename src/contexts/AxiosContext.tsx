import React, { ReactNode, useRef, useState } from 'react';
import { useEffect } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import { userState } from '~/atoms';
import axios from '~/tools/axios';
import { default as originAxios } from 'axios';
import jwt_decode from 'jwt-decode';
import { useSnackbar } from '~/hooks/useSnackbar';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import LoadingCircular from '~/components/LoadingCircular';
import { COOKIE_KEY, cookieService } from '~/tools/storages';
import { lowerCase } from 'lodash';
import { BASE_URL } from '~/config/constants';
import i18n from '~/lang';

interface AxiosContextProps {}

const refreshAxios = originAxios.create({
  baseURL: BASE_URL,
  withCredentials: true,
});

const AxiosContext = ({}: AxiosContextProps) => {
  const [user, setUser] = useRecoilState(userState);
  const { enqueueError, enqueueSuccess } = useSnackbar();
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const [isLoading, setIsLoading] = useState<boolean>(true);
  const initPath = useRef<string>(pathname);

  useEffect(() => {
    const id = axios.interceptors.response.use(
      (res) => {
        if (res?.status && res?.data?.msg && lowerCase(res?.config?.method) !== 'get') {
          enqueueSuccess(res?.data?.msg);
        }

        return res;
      },
      (err) => {
        if (err?.response?.status === 401) {
          console.error('Login expired:', err);
          navigate('/login');
          setUser(null);
        }
        if (err?.response?.data?.msg) {
          enqueueError(err?.response?.data?.msg);
        }
        if (err?.response?.data) err.data = err?.response?.data;
        return Promise.reject(err);
      }
    );

    (async () => {
      try {
        const res = await axios.post('/v1/auth/refresh');
        setUser(res?.data?.rows);
      } catch (e) {
        console.log('Get infor error:', e);
      } finally {
        setIsLoading(false);
      }
    })();

    return () => {
      axios.interceptors.response.eject(id);
    };
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
          config.headers['Accept-Language'] = i18n.language;

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
  }, [user]);

  return <>{isLoading ? <LoadingCircular fullHeight /> : <Outlet />}</>;
};

export default AxiosContext;
