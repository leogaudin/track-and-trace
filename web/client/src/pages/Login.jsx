import { useFormik } from 'formik';
import * as Yup from 'yup';
import {
  Box,
  Button,
  Card,
  Link,
  Stack,
  Typography
} from '@mui/material';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import Globe from '../components/Globe';
import { login } from '../service';
import { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';
import { FormTextField } from '../components/FormTextField';

function Login() {
  const navigate = useNavigate();
  const [isAuth, setIsAuth] = useState(false);

  useEffect(() => {
    const user = localStorage.getItem('user');
    if (user) setIsAuth(true);
    if (isAuth) navigate('/');
  }, [isAuth, navigate]);

  const formik = useFormik({
    initialValues: {
      email: null,
      password: null,
      submit: null
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .email('Must be a valid email')
        .max(255)
        .required('Email is required'),
      password: Yup.string().max(255).required('Password is required')
    }),
    onSubmit: () => {
      const user = {
        email: formik.values.email,
        password: formik.values.password
      };
      login(user)
        .then((response) => {
          localStorage.setItem('user', JSON.stringify(response['user']));
          setIsAuth(true);
          window.location.reload();
        })
        .catch((error) => {
          setIsAuth(false);
          formik.setErrors({
            submit: 'Invalid email or password'
          });
        });
    }
  });

  return (
    <>
      <Helmet>
        <title>Login - Track-and-Trace</title>
        <meta
          name="description"
          content="Track and trace packages with ease using our advanced web application. Stay updated on the status and location of your shipments in real-time. Effortlessly monitor delivery progress and gain peace of mind knowing where your packages are at all times."
        />
      </Helmet>
      <Box
        sx={{
          backgroundColor: 'black',
          height: '100vh',
          flex: '1 1 auto',
          alignItems: 'center',
          display: 'flex',
          justifyContent: 'space-between'
        }}
      >
        <Card
          sx={{
            width: 550,
            px: 5,
            py: '100px',
            mx: 'auto'
          }}
        >
          <div>
            <Stack spacing={1} sx={{ mb: 3 }}>
              <Typography variant="h2">Login</Typography>
              <Typography color="text.secondary" variant="body2">
                Don&apos;t have an account?&nbsp;
                <Link
                  component={RouterLink}
                  to="/register"
                  underline="hover"
                  variant="subtitle2"
                >
                  Register
                </Link>
              </Typography>
            </Stack>
            <form noValidate onSubmit={formik.handleSubmit}>
              <Stack spacing={3}>
                <FormTextField
                  field="email"
                  formik={formik}
                  label="Email Address"
                  type="email"
                />
                <FormTextField
                  field="password"
                  formik={formik}
                  label="Password"
                  type="password"
                />
              </Stack>
              {formik.errors.submit && (
                <Typography
                  color="error"
                  sx={{ mt: 3 }}
                  variant="body2"
                  fontWeight={700}
                >
                  {formik.errors.submit}
                </Typography>
              )}
              <Button
                fullWidth
                size="large"
                sx={{ mt: 3 }}
                type="submit"
                variant="contained"
              >
                Continue
              </Button>
            </form>
          </div>
        </Card>
        <Globe />
      </Box>
    </>
  );
}

export default Login;
