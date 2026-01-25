import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  Box,
  Button,
  Checkbox,
  Divider,
  FormControlLabel,
  Stack,
  TextField,
  Typography,
  useTheme,
} from '@mui/material';
import { useAuthMutation } from '~/hooks/useAuthMutation';
import { type SubmitHandler, useForm } from 'react-hook-form';
import PasswordInput from '~/components/PasswordInput';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { loginPathState, userState } from '~/atoms';
import { useSnackbar } from '~/hooks/useSnackbar';
// import { t } from 'i18next';
import { LangKey } from '~/lang/langKey';
import { useTranslation } from 'react-i18next';
import i18next, { t } from 'i18next';
import { BASE_URL } from '~/config/constants';
import { Google } from '@mui/icons-material';

type LoginFormData = {
  email: string;
  password: string;
};

function Login() {
  const theme = useTheme();
  const navigate = useNavigate();
  const { mUserLogin } = useAuthMutation();
  const { enqueueError } = useSnackbar();
  const loginPath = useRecoilValue(loginPathState);
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
            return;
          }
          setUser(res?.data?.rows);
          navigate(loginPath);
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
          {t(LangKey.welcomeBack)}
        </Typography>
        <TextField
          label={t(LangKey.email)}
          helperText={errors.email?.message}
          error={!!errors.email}
          type="email"
          {...register('email', { required: true, maxLength: 50 })}
        />

        <Stack width={1} mt={3}>
          <PasswordInput
            label={t(LangKey.password)}
            helperText={errors.password?.message}
            error={!!errors.password}
            {...register('password', { required: true, maxLength: 50 })}
          />

          <Stack direction="row" width={1} alignItems="center" justifyContent="space-between" mt={1}>
            <FormControlLabel control={<Checkbox defaultChecked size="small" />} label={t(LangKey.rememberMe)} />

            <Typography
              color={theme.palette.primary.main}
              component={Link}
              to="/forgot-password"
              sx={{ textAlign: 'right' }}
            >
              {t(LangKey.forgotPassword)}
            </Typography>
          </Stack>
        </Stack>

        <Button type="submit" variant="contained" sx={{ mt: 2 }} loading={mUserLogin.isPending}>
          {t(LangKey.logIn)}
        </Button>

        <Divider sx={{ my: 2 }}>{t(LangKey.or)}</Divider>

        <Button
          variant="outlined"
          onClick={() => {
            window.location.href = `${BASE_URL}/v1/auth/google`;
          }}
          startIcon={<Google fontSize="small" />}
        >
          {t(LangKey.signInWithGoogle)}
        </Button>
        <Stack direction="row" spacing={1} alignItems="center" justifyContent="center" mt={3}>
          <Typography>{t(LangKey.DontHaveAccounYet)}</Typography>

          <Typography color={theme.palette.primary.main} component={Link} to="/register">
            {t(LangKey.RegisterOneForFree)}
          </Typography>
        </Stack>
      </Stack>
    </form>
  );
}

export default Login;
