import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button, Grid, Stack, TextField, Typography, useTheme } from '@mui/material';
import { useAuthMutation } from '~/hooks/useAuthMutation';
import { type SubmitHandler, useForm } from 'react-hook-form';
import PasswordInput from '~/components/PasswordInput';
import { ArrowBack } from '@mui/icons-material';

type RegisterFormData = {
  email: string;
  firstName: string;
  lastName: string;
  password: string;
};

function Register() {
  const theme = useTheme();
  const navigate = useNavigate();
  const { mRegisterUser } = useAuthMutation();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<RegisterFormData>();

  const onSubmit: SubmitHandler<RegisterFormData> = async (data) => {
    const res = await mRegisterUser.mutateAsync(
      {
        email: data?.email,
        firstName: data?.firstName,
        lastName: data?.lastName,
        password: data?.password,
      },
      {
        onSuccess: () => {
          navigate('/login');
        },
      }
    );
  };

  return (
    <section>
      <form onSubmit={handleSubmit(onSubmit)}>
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
            Register
          </Typography>
          <Grid container spacing={3}>
            <Grid size={6}>
              <TextField
                fullWidth
                size="medium"
                label="First name"
                helperText={errors.firstName?.message}
                error={!!errors.firstName}
                {...register('firstName', { required: true, maxLength: 50 })}
              />
            </Grid>
            <Grid size={6}>
              <TextField
                fullWidth
                size="medium"
                label="Last name"
                helperText={errors.lastName?.message}
                error={!!errors.lastName}
                {...register('lastName', { required: true, maxLength: 50 })}
              />
            </Grid>
          </Grid>
          <TextField
            fullWidth
            size="medium"
            label="Email"
            helperText={errors.email?.message}
            error={!!errors.email}
            type="email"
            // placeholder="Enter your email"
            {...register('email', {
              required: true,
              pattern: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g,
            })}
          />
          <PasswordInput
            label="Password"
            helperText={errors.password?.message}
            error={!!errors.password}
            {...register('password', { required: true, maxLength: 50 })}
          />
          <Button type="submit" variant="contained" loading={mRegisterUser.isPending}>
            Create account
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
    </section>
  );
}

export default Register;
