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
import { useUserMutation } from '~/hooks/useUserMutation';

type ChangePasswordFormData = {
  oldPassword: string;
  newPassword1: string;
  newPassword2: string;
};

function ChangePassword() {
  const theme = useTheme();
  const navigate = useNavigate();

  const { mChangePassword } = useUserMutation();
  const { enqueueError } = useSnackbar();
  const setUser = useSetRecoilState(userState);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    setError,
  } = useForm<ChangePasswordFormData>();

  const onSubmit: SubmitHandler<ChangePasswordFormData> = async (data) => {
    if (data?.newPassword1 !== data?.newPassword2) {
      setError('newPassword2', {
        message: 'Passwords are different!',
      });
      return;
    }
    const res = await mChangePassword.mutateAsync({
      oldPassword: data?.oldPassword,
      newPassword: data?.newPassword1,
    });
  };

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
          Change password
        </Typography>

        <PasswordInput
          label="Current password"
          helperText={errors.oldPassword?.message}
          error={!!errors.oldPassword}
          {...register('oldPassword', { required: true, maxLength: 50 })}
        />

        <PasswordInput
          label="New Password"
          helperText={errors.newPassword1?.message}
          error={!!errors.newPassword1}
          {...register('newPassword1', { required: true, maxLength: 50 })}
        />

        <PasswordInput
          label="Confirm password"
          helperText={errors.newPassword2?.message}
          error={!!errors.newPassword2}
          {...register('newPassword2', { required: true, maxLength: 50 })}
        />

        <Button type="submit" variant="contained" loading={mChangePassword.isPending}>
          Reset password
        </Button>
      </Stack>
    </form>
  );
}

export default ChangePassword;
