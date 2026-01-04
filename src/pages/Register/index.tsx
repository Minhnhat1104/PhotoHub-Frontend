import React from "react";
import { useNavigate } from "react-router-dom";
import { Button, Stack, TextField, Typography, useTheme } from "@mui/material";
import { useAuthMutation } from "~/hooks/useAuthMutation";
import { type SubmitHandler, useForm } from "react-hook-form";
import PasswordInput from "~/components/PasswordInput";

type RegisterFormData = {
  email: string;
  username: string;
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
        username: data?.username,
        password: data?.password,
      },
      {
        onSuccess: () => {
          navigate("/login");
        },
      }
    );
  };

  return (
    <section>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Stack
          sx={{
            background: theme.palette.common.white,
            p: 3,
            borderRadius: 3,
            width: 600,
          }}
          spacing={3}
        >
          <Typography variant="h1" fontWeight={500} textAlign="center">
            Register
          </Typography>
          <TextField
            size="medium"
            label="Email"
            helperText={errors.email?.message}
            error={!!errors.email}
            type="email"
            // placeholder="Enter your email"
            {...register("email", {
              required: true,
              pattern: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g,
            })}
          />
          <TextField
            size="medium"
            label="Username"
            helperText={errors.username?.message}
            error={!!errors.username}
            // placeholder="Enter your username"
            {...register("username", { required: true, maxLength: 50 })}
          />
          <PasswordInput
            label="Password"
            helperText={errors.password?.message}
            error={!!errors.password}
            {...register("password", { required: true, maxLength: 50 })}
          />
          <Button type="submit" variant="contained">
            Create account
          </Button>
        </Stack>
      </form>
    </section>
  );
}

export default Register;
