import React, { ReactNode } from 'react';

import { Stack, useTheme } from '@mui/material';
import { Bounce, ToastContainer } from 'react-toastify';

interface ToastContextProps {
  children: ReactNode;
}

export enum ToastColorEnum {
  INFO = '--toastify-color-info',
  SUCCESS = '--toastify-color-success',
  WARNING = '--toastify-color-warning',
  ERROR = '--toastify-color-error',
  PRIMARY = '--toastify-color-primary',
}

const ToastContext = (props: ToastContextProps) => {
  const { children } = props;
  const theme = useTheme();

  return (
    <Stack
      sx={{
        display: 'flex',
        width: '100%',
        height: '100%',
        '&': {
          [ToastColorEnum.INFO]: theme.palette.info.main,
          [ToastColorEnum.SUCCESS]: theme.palette.success.main,
          [ToastColorEnum.WARNING]: theme.palette.warning.main,
          [ToastColorEnum.ERROR]: theme.palette.error.main,
          [ToastColorEnum.PRIMARY]: theme.palette.primary.main,
          // '--toastify-color-progress-light': '#757575',
          '--toastify-toast-bd-radius': '4px',
        },
        '& .Toastify__toast-container': {
          '& .Toastify__toast': { padding: 0, minHeight: 0 },
          '& .Toastify__toast-body': {
            padding: 0,
          },
        },
      }}
    >
      {children}

      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        // transition={Bounce}
        closeButton={false}
        icon={false}
      />
    </Stack>
  );
};

export default ToastContext;
