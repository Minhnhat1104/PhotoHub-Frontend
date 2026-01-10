import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Button, Stack, TextField, Typography, useTheme } from '@mui/material';
import { useAuthMutation } from '~/hooks/useAuthMutation';
import { type SubmitHandler, useForm } from 'react-hook-form';
import PasswordInput from '~/components/PasswordInput';
import { useSetRecoilState } from 'recoil';
import { userState } from '~/atoms';
import { useSnackbar } from '~/hooks/useSnackbar';
import { useSearchParams } from 'react-router-dom';

type ResetPasswordFormData = {
  password1: string;
  password2: string;
};

function ResetPassword() {
  const theme = useTheme();
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();

  const resetToken = searchParams.get('token');
  const { mUserResetPassword } = useAuthMutation();
  const { enqueueError } = useSnackbar();
  const setUser = useSetRecoilState(userState);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    setError,
  } = useForm<ResetPasswordFormData>();

  const onSubmit: SubmitHandler<ResetPasswordFormData> = async (data) => {
    if (data?.password1 !== data?.password2) {
      setError('password2', {
        message: 'Passwords are different!',
      });
      return;
    }
    const res = await mUserResetPassword.mutateAsync(
      {
        password: data?.password1,
      },
      {
        onSuccess: (res) => {
          setUser(res?.data?.rows);
        },
      }
    );
  };

  if (!resetToken) {
    throw new Error('Invalid URL');
    return;
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} style={{ width: 'fit-content' }}>
      <Stack
        sx={{
          background: theme.palette.background.paper,
          p: 3,
          borderRadius: 3,
          width: 600,
        }}
        spacing={3}
      >
        <Typography variant="h1" fontWeight={500} textAlign="center">
          Set new password
        </Typography>

        <PasswordInput
          label="Password"
          helperText={errors.password1?.message}
          error={!!errors.password1}
          {...register('password1', { required: true, maxLength: 50 })}
        />

        <PasswordInput
          label="Confirm password"
          helperText={errors.password2?.message}
          error={!!errors.password2}
          {...register('password2', { required: true, maxLength: 50 })}
        />

        <Button type="submit" variant="contained">
          Reset password
        </Button>
        <Button
          variant="text"
          onClick={() => {
            navigate('/login');
          }}
        >
          Back to login
        </Button>
      </Stack>
    </form>
  );
}

export default ResetPassword;
