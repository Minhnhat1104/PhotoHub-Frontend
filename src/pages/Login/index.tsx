import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Box, Button, Checkbox, FormControlLabel, Stack, TextField, Typography, useTheme } from '@mui/material';
import { useAuthMutation } from '~/hooks/useAuthMutation';
import { type SubmitHandler, useForm } from 'react-hook-form';
import PasswordInput from '~/components/PasswordInput';
import { useSetRecoilState } from 'recoil';
import { userState } from '~/atoms';
import { useSnackbar } from '~/hooks/useSnackbar';

type LoginFormData = {
  email: string;
  password: string;
};

function Login() {
  const theme = useTheme();
  const navigate = useNavigate();
  const { mUserLogin } = useAuthMutation();
  const { enqueueError } = useSnackbar();
  const setUser = useSetRecoilState(userState);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<LoginFormData>();

  const onSubmit: SubmitHandler<LoginFormData> = async (data) => {
    const res = await mUserLogin.mutateAsync(
      {
        email: data?.email,
        password: data?.password,
      },
      {
        onSuccess: (res) => {
          if (!res?.data?.rows?.id) {
            enqueueError('Invalid login response data!');
          }
          setUser(res?.data?.rows);
          navigate('/explore');
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
      >
        <Typography variant="h1" fontWeight={500} textAlign="center" mb={3}>
          Welcome back
        </Typography>
        <TextField
          label="Email"
          helperText={errors.email?.message}
          error={!!errors.email}
          type="email"
          {...register('email', { required: true, maxLength: 50 })}
        />

        <Stack width={1} mt={3}>
          <PasswordInput
            label="Password"
            helperText={errors.password?.message}
            error={!!errors.password}
            {...register('password', { required: true, maxLength: 50 })}
          />

          <Stack direction="row" width={1} alignItems="center" justifyContent="space-between" mt={1}>
            <FormControlLabel control={<Checkbox defaultChecked size="small" />} label="Remember me" />

            <Typography
              color={theme.palette.primary.main}
              component={Link}
              to="/forgot-password"
              sx={{ textAlign: 'right' }}
            >
              Forgot password
            </Typography>
          </Stack>
        </Stack>

        <Button type="submit" variant="contained" sx={{ mt: 2 }}>
          Log in
        </Button>
        <Stack direction="row" spacing={1} alignItems="center" justifyContent="center" mt={3}>
          <Typography>Don't have an account yet?</Typography>

          <Typography color={theme.palette.primary.main} component={Link} to="/register">
            Register one for free
          </Typography>
        </Stack>
      </Stack>
    </form>
  );
}

export default Login;
