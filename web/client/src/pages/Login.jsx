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
import { useEffect, useState, useContext } from 'react';
import { Helmet } from 'react-helmet-async';
import { FormTextField } from '../components/FormTextField';
import { useMediaQuery } from '@mui/material';
import { useTranslation } from 'react-i18next';
import {sha512} from 'js-sha512';
import AppContext from '../context/AppContext';

function Login() {
  const navigate = useNavigate();
  const [isAuth, setIsAuth] = useState(false);
  const {isMobile} = useContext(AppContext);
  const { t } = useTranslation();

  useEffect(() => {
    const user = localStorage.getItem('user');
    if (user) setIsAuth(true);
    if (isAuth) navigate('/');
  }, [isAuth, navigate]);

  const formik = useFormik({
    initialValues: {
      username: '',
      password: '',
      submit: ''
    },
    validationSchema: Yup.object({
      username: Yup.string()
        .max(255)
        .required(t('usernameRequired')),
      password: Yup.string().max(255).required(t('passwordRequired'))
    }),
    onSubmit: () => {
      const user = {
        username: formik.values.username,
        password: sha512(formik.values.password)
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
            submit: t('invalidCredentials')
          });
        });
    }
  });

  return (
    <>
      <Helmet>
        <title>{t('login')} - Track-and-Trace</title>
        <meta
          name="description"
          content={t('description')}
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
            width: isMobile ? 225 : 550,
            px: 5,
            py: '100px',
            mx: 'auto'
          }}
        >
          <div>
            <Stack spacing={1} sx={{ mb: 3 }}>
              <Typography variant="h2">{t('login')}</Typography>
              {/* <Typography color="text.secondary" variant="body2">
                {t('noAccountYet')}{' '}
                <Link
                  component={RouterLink}
                  to="/register"
                  underline="hover"
                  variant="subtitle2"
                >
                  {t('register')}
                </Link>
              </Typography> */}
            </Stack>
            <form noValidate onSubmit={formik.handleSubmit}>
              <Stack spacing={3}>
                <FormTextField
                  field="username"
                  formik={formik}
                  label={t('username')}
                />
                <FormTextField
                  field="password"
                  formik={formik}
                  label={t('password')}
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
                {t('continue')}
              </Button>
            </form>
          </div>
        </Card>
        { isMobile ? null : <Globe />}
      </Box>
    </>
  );
}

export default Login;
