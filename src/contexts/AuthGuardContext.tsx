import React, { useEffect } from 'react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { loginPathState, userState } from '~/atoms';

const AuthGuardContext = () => {
  const user = useRecoilValue(userState);
  const setLoginPath = useSetRecoilState(loginPathState);
  const { pathname } = useLocation();

  useEffect(() => {
    if (!user) {
      setLoginPath(pathname);
    }
  }, [user]);

  if (!user) {
    return <Navigate to={'/login'} />;
  }

  return (
    <>
      <Outlet />
    </>
  );
};

export default AuthGuardContext;
