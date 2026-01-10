import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Box, Button, Stack, TextField, Typography, useTheme } from '@mui/material';
import { useAuthMutation } from '~/hooks/useAuthMutation';
import { type SubmitHandler, useForm } from 'react-hook-form';
import PasswordInput from '~/components/PasswordInput';
import { useSetRecoilState } from 'recoil';
import { userState } from '~/atoms';
import { useSnackbar } from '~/hooks/useSnackbar';
import { ArrowBack } from '@mui/icons-material';

type ForgetPasswordFormData = {
  email: string;
};

function ForgetPassword() {
  const theme = useTheme();
  const navigate = useNavigate();
  const { mUserForgetPassword } = useAuthMutation();
  const { enqueueError } = useSnackbar();
  const setUser = useSetRecoilState(userState);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<ForgetPasswordFormData>();

  const onSubmit: SubmitHandler<ForgetPasswordFormData> = async (data) => {
    const res = await mUserForgetPassword.mutateAsync(
      {
        email: data?.email,
      },
      {
        onSuccess: (res) => {
          setUser(res?.data?.rows);
        },
      }
    );
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
          Forgot password?
        </Typography>
        <Typography color="text.secondary" textAlign="center">
          No worries, we 'll send you reset instruction.
        </Typography>
        <TextField
          label="Email"
          helperText={errors.email?.message}
          error={!!errors.email}
          type="email"
          {...register('email', { required: true, maxLength: 50 })}
        />
        <Button type="submit" variant="contained">
          Reset password
        </Button>
        <Stack
          direction="row"
          alignItems="center"
          component={Link}
          to={'/login'}
          justifyContent="center"
          color="primary.main"
        >
          <ArrowBack fontSize="small" sx={{ mr: 1 }} />
          <Typography>Back to login</Typography>
        </Stack>
      </Stack>
    </form>
  );
}

export default ForgetPassword;
