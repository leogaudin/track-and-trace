import { useFormik } from 'formik';
import * as Yup from 'yup';
import {
  Box,
  Button,
  Link,
  Stack,
  TextField,
  Typography
} from '@mui/material';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import Globe from 'react-globe.gl';
import { login } from '../service';
import { useEffect, useState } from 'react';

function Login() {
    const navigate = useNavigate();
	const [isAuth, setIsAuth] = useState(false);

	useEffect(() => {
		const user = localStorage.getItem('user');
		if (user)
			setIsAuth(true);
		if (isAuth)
			navigate('/');
	}, [isAuth]);
  const formik = useFormik({
    initialValues: {
      email: null,
      password: null,
      submit: null
    },
    validationSchema: Yup.object({
      email: Yup
        .string()
        .email('Must be a valid email')
        .max(255)
        .required('Email is required'),
      password: Yup
        .string()
        .max(255)
        .required('Password is required')
    }),
    onSubmit: () => {
      const user = {
		email: formik.values.email,
		password: formik.values.password
	  };
	  login(user).then((response) => {
      localStorage.setItem('user', JSON.stringify(response['user']));
      setIsAuth(true);
      window.location.reload();
	  }).catch((error) => {
			setIsAuth(false);
			formik.setErrors({
			submit: 'Invalid email or password'
			});
		});
    }
  });

  return (
    <>
      <Box
        sx={{
          backgroundColor: 'background.paper',
          flex: '1 1 auto',
          alignItems: 'center',
          display: 'flex',
          justifyContent: 'space-between'
        }}
      >
        <Box
          sx={{
            width: 550,
            px: 5,
            py: '100px'
          }}
        >
          <div>
            <Stack
              spacing={1}
              sx={{ mb: 3 }}
            >
              <Typography variant="h2">
                Login
              </Typography>
              <Typography
                color="text.secondary"
                variant="body2"
              >
                Don&apos;t have an account?
                &nbsp;
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
              <form
                noValidate
                onSubmit={formik.handleSubmit}
              >
                <Stack spacing={3}>
                  <TextField
                    error={!!(formik.touched.email && formik.errors.email)}
                    fullWidth
                    helperText={formik.touched.email && formik.errors.email}
                    label="Email Address"
                    name="email"
                    onBlur={formik.handleBlur}
                    onChange={formik.handleChange}
                    type="email"
                    value={formik.values.email}
					variant='standard'
                  />
                  <TextField
                    error={!!(formik.touched.password && formik.errors.password)}
                    fullWidth
                    helperText={formik.touched.password && formik.errors.password}
                    label="Password"
                    name="password"
                    onBlur={formik.handleBlur}
                    onChange={formik.handleChange}
                    type="password"
                    value={formik.values.password}
					variant='standard'
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
        </Box>
		<Globe
		globeImageUrl={'https://cdn.jsdelivr.net/npm/three-globe/example/img/earth-night.jpg'}
		backgroundImageUrl={'https://cdn.jsdelivr.net/npm/three-globe/example/img/night-sky.png'}
		width={750}
		/>
      </Box>
    </>
  );
};

export default Login;
